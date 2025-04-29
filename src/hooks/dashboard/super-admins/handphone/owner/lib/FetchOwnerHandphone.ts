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

import {
  OwnerHandphoneContent,
  OwnerHandphoneContentFormData,
} from "@/hooks/dashboard/super-admins/handphone/owner/types/Owner";

export const useOwnerHandphoneData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allContents, setAllContents] = useState<OwnerHandphoneContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 10;

  // Fetch contents with onSnapshot
  useEffect(() => {
    setIsLoading(true);
    const ownerHandphoneRef = collection(
      db,
      process.env.NEXT_PUBLIC_COLLECTIONS_OWNER_HANDPHONE as string
    );
    const q = query(ownerHandphoneRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const contents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as OwnerHandphoneContent[];

        setAllContents(contents);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error in snapshot:", error);
        toast.error("Gagal mengambil konten");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Memoized filtered contents
  const filteredContents = useMemo(() => {
    let filtered = [...allContents];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((content) =>
        content.title.toLowerCase().includes(query)
      );
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

  const createContent = async (formData: OwnerHandphoneContentFormData) => {
    try {
      setIsSubmitting(true);

      // Check if title already exists
      const isTitleExists = allContents.some(
        (content) =>
          content.title.toLowerCase() === formData.title.toLowerCase()
      );

      if (isTitleExists) {
        toast.error("Data dengan judul yang sama sudah ada!");
        return false;
      }

      await addDoc(
        collection(
          db,
          process.env.NEXT_PUBLIC_COLLECTIONS_OWNER_HANDPHONE as string
        ),
        {
          ...formData,
          createdAt: new Date(),
        }
      );
      toast.success("Konten berhasil dibuat!");
      return true;
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("Gagal membuat konten. Silakan coba lagi.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateContent = async (
    id: string,
    formData: OwnerHandphoneContentFormData
  ) => {
    try {
      setIsSubmitting(true);

      // Check if title already exists (excluding current item)
      const isTitleExists = allContents.some(
        (content) =>
          content.id !== id &&
          content.title.toLowerCase() === formData.title.toLowerCase()
      );

      if (isTitleExists) {
        toast.error("Data dengan judul yang sama sudah ada!");
        return false;
      }

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_OWNER_HANDPHONE as string,
        id
      );
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date(),
      });
      toast.success("Konten berhasil diperbarui!");
      return true;
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Gagal memperbarui konten. Silakan coba lagi.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_OWNER_HANDPHONE as string,
        id
      );
      await deleteDoc(docRef);
      toast.success("Konten berhasil dihapus!");
      return true;
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Gagal menghapus konten. Silakan coba lagi.");
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
