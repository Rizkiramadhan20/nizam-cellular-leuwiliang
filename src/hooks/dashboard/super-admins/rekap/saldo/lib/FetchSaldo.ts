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

import { SaldoContent, SaldoFormData } from "@/hooks/dashboard/super-admins/rekap/saldo/types/Saldo";

export const useSaldoData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allContents, setAllContents] = useState<SaldoContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 10;

  // Fetch contents with onSnapshot
  useEffect(() => {
    setIsLoading(true);
    const saldoRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_SALDO as string
    );
    const q = query(saldoRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const contents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as SaldoContent[];

        setAllContents(contents);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error in snapshot:", error);
        toast.error("Gagal mengambil data saldo");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Memoized filtered contents
  const filteredContents = useMemo(() => {
    let filtered = [...allContents];

    if (searchQuery) {
      filtered = filtered.filter((content) => {
        // Convert both dates to YYYY-MM-DD format for comparison
        const contentDate = new Date(content.date).toISOString().split("T")[0];
        return contentDate === searchQuery;
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

  const createContent = async (formData: SaldoFormData) => {
    try {
      setIsSubmitting(true);

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_SALDO as string),
        {
          ...formData,
          createdAt: new Date(),
        }
      );
      toast.success("Data saldo berhasil ditambahkan!");
      return true;
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("Gagal menambahkan data saldo. Silakan coba lagi.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateContent = async (id: string, formData: SaldoFormData) => {
    try {
      setIsSubmitting(true);

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_SALDO as string,
        id
      );
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date(),
      });
      toast.success("Data saldo berhasil diperbarui!");
      return true;
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Gagal memperbarui data saldo. Silakan coba lagi.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_SALDO as string,
        id
      );
      await deleteDoc(docRef);
      toast.success("Data saldo berhasil dihapus!");
      return true;
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Gagal menghapus data saldo. Silakan coba lagi.");
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
