import { useState, useEffect, useMemo, useCallback } from "react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase/firebase";

import { UangLaciContent, UangLaciFormData } from "../types/UangLaci";

export const useUangLaciData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allContents, setAllContents] = useState<UangLaciContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 10;

  // Fetch contents with onSnapshot
  useEffect(() => {
    setIsLoading(true);
    const uangLaciRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_UANG_LACI as string
    );
    const q = query(uangLaciRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const contents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UangLaciContent[];

        setAllContents(contents);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error in snapshot:", error);
        toast.error("Gagal mengambil data uang laci");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Memoized filtered contents
  const filteredContents = useMemo(() => {
    let filtered = [...allContents];

    if (searchQuery) {
      const [startDate, endDate] = searchQuery.split(",");
      filtered = filtered.filter((content) => {
        const contentDate = new Date(content.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return contentDate >= start && contentDate <= end;
      });
    }

    return filtered;
  }, [allContents, searchQuery]);

  // Memoized paginated contents
  const contents = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredContents.slice(startIndex, endIndex);
  }, [filteredContents, currentPage, itemsPerPage]);

  // Update total items when filtered contents change
  useEffect(() => {
    setTotalItems(filteredContents.length);
  }, [filteredContents]);

  const createContent = async (formData: UangLaciFormData) => {
    try {
      setIsSubmitting(true);

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_UANG_LACI as string),
        {
          ...formData,
          createdAt: new Date(),
        }
      );
      toast.success("Data uang laci berhasil ditambahkan!");
      return true;
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("Gagal menambahkan data uang laci. Silakan coba lagi.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateContent = async (id: string, formData: UangLaciFormData) => {
    try {
      setIsSubmitting(true);

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_UANG_LACI as string,
        id
      );
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date(),
      });
      toast.success("Data uang laci berhasil diperbarui!");
      return true;
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Gagal memperbarui data uang laci. Silakan coba lagi.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_UANG_LACI as string,
        id
      );
      await deleteDoc(docRef);
      toast.success("Data uang laci berhasil dihapus!");
      return true;
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Gagal menghapus data uang laci. Silakan coba lagi.");
      return false;
    }
  };

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return {
    isLoading,
    contents,
    isSubmitting,
    createContent,
    updateContent,
    deleteContent,
    currentPage,
    totalItems,
    itemsPerPage,
    searchQuery,
    setSearchQuery,
    handlePageChange,
  };
};
