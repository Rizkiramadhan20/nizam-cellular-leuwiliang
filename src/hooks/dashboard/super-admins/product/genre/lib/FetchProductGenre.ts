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
  ProductGenreContent,
  ProductGenreFormData,
} from "@/hooks/dashboard/super-admins/product/genre/types/ProductGenre";

export interface ProductCategory {
  id: string;
  title: string;
  createdAt: Date;
}

export const useProductGenreData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allContents, setAllContents] = useState<ProductGenreContent[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 10;

  // Fetch product categories with onSnapshot
  useEffect(() => {
    const categoryRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_CATEGORY as string);
    const q = query(categoryRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categoryData = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        createdAt: doc.data().createdAt?.toDate(),
      })) as ProductCategory[];

      setCategories(categoryData);
    }, (error) => {
      console.error("Error setting up categories listener:", error);
      toast.error("Failed to fetch categories");
    });

    return () => unsubscribe();
  }, []);

  // Fetch contents with onSnapshot
  useEffect(() => {
    setIsLoading(true);
    const productGenreRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_GENRE as string);
    const q = query(productGenreRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductGenreContent[];

      setAllContents(contents);
      setIsLoading(false);
    }, (error) => {
      console.error("Error in snapshot:", error);
      toast.error("Failed to fetch contents");
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Memoized filtered contents
  const filteredContents = useMemo(() => {
    let filtered = [...allContents];

    if (selectedCategoryTitle) {
      filtered = filtered.filter(content => content.categoryTitle === selectedCategoryTitle);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(query) ||
        content.categoryTitle.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allContents, selectedCategoryTitle, searchQuery]);

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

  const createContent = async (formData: ProductGenreFormData) => {
    try {
      setIsSubmitting(true);

      // Check for duplicate title within the same category
      const isDuplicate = allContents.some(
        content =>
          content.categoryTitle.toLowerCase() === formData.categoryTitle.toLowerCase() &&
          content.title.toLowerCase() === formData.title.toLowerCase()
      );

      if (isDuplicate) {
        toast.error("Data dengan judul dan kategori yang sama sudah ada!");
        return false;
      }

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_GENRE as string),
        {
          ...formData,
          createdAt: new Date(),
        }
      );
      toast.success("Content created successfully!");
      return true;
    } catch (error) {
      console.error("Error creating content:", error);
      toast.error("Failed to create content. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateContent = async (id: string, formData: ProductGenreFormData) => {
    try {
      setIsSubmitting(true);

      // Check for duplicate title within the same category excluding the current item
      const isDuplicate = allContents.some(
        content =>
          content.id !== id &&
          content.categoryTitle.toLowerCase() === formData.categoryTitle.toLowerCase() &&
          content.title.toLowerCase() === formData.title.toLowerCase()
      );

      if (isDuplicate) {
        toast.error("Data dengan judul dan kategori yang sama sudah ada!");
        return false;
      }

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_GENRE as string,
        id
      );
      await updateDoc(docRef, {
        ...formData,
        updatedAt: new Date(),
      });
      toast.success("Content updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating content:", error);
      toast.error("Failed to update content. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_GENRE as string,
        id
      );
      await deleteDoc(docRef);
      toast.success("Content deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content. Please try again.");
      return false;
    }
  };

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return {
    isLoading,
    contents,
    categories,
    isSubmitting,
    createContent,
    updateContent,
    deleteContent,
    currentPage,
    totalItems,
    itemsPerPage,
    selectedCategoryTitle,
    setSelectedCategoryTitle,
    searchQuery,
    setSearchQuery,
    handlePageChange,
  };
};
