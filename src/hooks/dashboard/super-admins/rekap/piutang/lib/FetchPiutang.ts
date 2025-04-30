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

import { PiutangContent, PiutangFormData } from "../types/Piutang";

export const usePiutangData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allContents, setAllContents] = useState<PiutangContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const itemsPerPage = 10;

  // Fetch contents with onSnapshot
  useEffect(() => {
    setIsLoading(true);
    const piutangRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_PIUTANG as string
    );
    const q = query(piutangRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const contents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PiutangContent[];

        setAllContents(contents);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error in snapshot:", error);
        toast.error("Gagal mengambil data piutang");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Memoized filtered contents
  const filteredContents = useMemo(() => {
    let filtered = [...allContents];

    if (searchQuery) {
      // Check if the search query is a date (YYYY-MM-DD format)
      const isDate = /^\d{4}-\d{2}-\d{2}$/.test(searchQuery);

      if (isDate) {
        filtered = filtered.filter((content) => {
          return content.date === searchQuery;
        });
      } else {
        // If not a date, treat it as a name search
        filtered = filtered.filter((content) => {
          return content.nama.toLowerCase().includes(searchQuery.toLowerCase());
        });
      }
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((content) => {
        return content.status === statusFilter;
      });
    }

    return filtered;
  }, [allContents, searchQuery, statusFilter]);

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

  const createContent = async (formData: PiutangFormData) => {
    try {
      setIsSubmitting(true);

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PIUTANG as string),
        {
          ...formData,
          createdAt: new Date(),
        }
      );
      toast.success("Data piutang berhasil ditambahkan!");
      return true;
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("Gagal menambahkan data piutang. Silakan coba lagi.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateContent = async (id: string, formData: PiutangFormData) => {
    try {
      setIsSubmitting(true);

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PIUTANG as string,
        id
      );
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date(),
      });
      toast.success("Data piutang berhasil diperbarui!");
      return true;
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Gagal memperbarui data piutang. Silakan coba lagi.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PIUTANG as string,
        id
      );
      await deleteDoc(docRef);
      toast.success("Data piutang berhasil dihapus!");
      return true;
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Gagal menghapus data piutang. Silakan coba lagi.");
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
    statusFilter,
    setStatusFilter,
    handlePageChange,
  };
};
