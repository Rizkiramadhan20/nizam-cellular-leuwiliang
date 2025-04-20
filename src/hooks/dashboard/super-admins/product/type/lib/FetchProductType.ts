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
  ProductTypeContent,
  ProductTypeFormData,
} from "@/hooks/dashboard/super-admins/product/type/types/ProductType";

export interface ProductType {
  id: string;
  title: string;
  genreTitle: string;
  categoryTitle: string;
  createdAt: Date;
}

export const useProductTypeData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [allContents, setAllContents] = useState<ProductTypeContent[]>([]);
  const [types, setTypes] = useState<ProductType[]>([]);
  const [genres, setGenres] = useState<ProductType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedTypeTitle, setSelectedTypeTitle] = useState<string>("");
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState<string>("");
  const [selectedGenreTitle, setSelectedGenreTitle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const itemsPerPage = 10;

  // Fetch product Type for filter with onSnapshot
  useEffect(() => {
    const typeRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_TYPE as string);
    const q = query(typeRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const typeData = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        genreTitle: doc.data().genreTitle,
        categoryTitle: doc.data().categoryTitle || "",
        createdAt: doc.data().createdAt?.toDate(),
      })) as ProductType[];

      setTypes(typeData);
    }, (error) => {
      console.error("Error setting up types listener:", error);
      toast.error("Failed to fetch types");
    });

    return () => unsubscribe();
  }, []);

  // Fetch product Genre for form with onSnapshot
  useEffect(() => {
    const genreRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_GENRE as string);
    const q = query(genreRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const genreData = snapshot.docs.map(doc => ({
        id: doc.id,
        title: doc.data().title,
        genreTitle: doc.data().title,
        categoryTitle: doc.data().categoryTitle,
        createdAt: doc.data().createdAt?.toDate(),
      })) as ProductType[];

      setGenres(genreData);
    }, (error) => {
      console.error("Error setting up genres listener:", error);
      toast.error("Failed to fetch genres");
    });

    return () => unsubscribe();
  }, []);

  // Fetch contents with onSnapshot
  useEffect(() => {
    setIsLoading(true);
    const productTypeRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_TYPE as string);
    const q = query(productTypeRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contents = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductTypeContent[];

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
      // Update available types and genres based on selected category
      const availableTypes = [...new Set(filtered.map(content => content.title))];
      const availableGenres = [...new Set(filtered.map(content => content.genreTitle))];
      if (!availableTypes.includes(selectedTypeTitle)) {
        setSelectedTypeTitle("");
      }
      if (!availableGenres.includes(selectedGenreTitle)) {
        setSelectedGenreTitle("");
      }
    }

    if (selectedTypeTitle) {
      filtered = filtered.filter(content => content.title === selectedTypeTitle);
      // Update selected category and genre based on selected type
      const typeContent = allContents.find(content => content.title === selectedTypeTitle);
      if (typeContent) {
        if (typeContent.categoryTitle !== selectedCategoryTitle) {
          setSelectedCategoryTitle(typeContent.categoryTitle);
        }
        if (typeContent.genreTitle !== selectedGenreTitle) {
          setSelectedGenreTitle(typeContent.genreTitle);
        }
      }
    }

    if (selectedGenreTitle) {
      filtered = filtered.filter(content => content.genreTitle === selectedGenreTitle);
      // Update available categories and types based on selected genre
      const availableCategories = [...new Set(filtered.map(content => content.categoryTitle))];
      const availableTypes = [...new Set(filtered.map(content => content.title))];
      if (!availableCategories.includes(selectedCategoryTitle)) {
        setSelectedCategoryTitle("");
      }
      if (!availableTypes.includes(selectedTypeTitle)) {
        setSelectedTypeTitle("");
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [allContents, selectedTypeTitle, selectedCategoryTitle, selectedGenreTitle, searchQuery]);

  // Memoized available types based on selected category and genre
  const availableTypes = useMemo(() => {
    let filtered = types;
    if (selectedCategoryTitle) {
      filtered = filtered.filter(type => type.categoryTitle === selectedCategoryTitle);
    }
    if (selectedGenreTitle) {
      filtered = filtered.filter(type => type.genreTitle === selectedGenreTitle);
    }
    return filtered;
  }, [types, selectedCategoryTitle, selectedGenreTitle]);

  // Memoized available categories based on selected type and genre
  const availableCategories = useMemo(() => {
    let filtered = [...new Set(types.map(type => type.categoryTitle))].filter(Boolean);
    if (selectedTypeTitle) {
      const typeContent = types.find(type => type.title === selectedTypeTitle);
      return typeContent ? [typeContent.categoryTitle] : [];
    }
    if (selectedGenreTitle) {
      filtered = [...new Set(types
        .filter(type => type.genreTitle === selectedGenreTitle)
        .map(type => type.categoryTitle)
      )].filter(Boolean);
    }
    return filtered;
  }, [types, selectedTypeTitle, selectedGenreTitle]);

  // Memoized available genres based on selected category and type
  const availableGenres = useMemo(() => {
    let filtered = [...new Set(types.map(type => type.genreTitle))].filter(Boolean);
    if (selectedCategoryTitle) {
      filtered = [...new Set(types
        .filter(type => type.categoryTitle === selectedCategoryTitle)
        .map(type => type.genreTitle)
      )].filter(Boolean);
    }
    if (selectedTypeTitle) {
      const typeContent = types.find(type => type.title === selectedTypeTitle);
      return typeContent ? [typeContent.genreTitle] : [];
    }
    return filtered;
  }, [types, selectedCategoryTitle, selectedTypeTitle]);

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

  const createContent = async (formData: ProductTypeFormData) => {
    try {
      setIsSubmitting(true);

      // Check if title already exists
      const isTitleExists = allContents.some(
        content => content.title.toLowerCase() === formData.title.toLowerCase()
      );

      if (isTitleExists) {
        toast.error("Title already exists. Please use a different title.");
        return false;
      }

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_TYPE as string),
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

  const updateContent = async (id: string, formData: ProductTypeFormData) => {
    try {
      setIsSubmitting(true);

      // Check if title already exists (excluding current item)
      const isTitleExists = allContents.some(
        content =>
          content.id !== id &&
          content.title.toLowerCase() === formData.title.toLowerCase()
      );

      if (isTitleExists) {
        toast.error("Title already exists. Please use a different title.");
        return false;
      }

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_TYPE as string,
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
      setIsDeleting(true);
      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_TYPE as string,
        id
      );
      await deleteDoc(docRef);
      toast.success("Content deleted successfully!");
      return true;
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content. Please try again.");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
  }, []);

  return {
    isLoading,
    contents,
    types: availableTypes,
    genres,
    isSubmitting,
    isDeleting,
    createContent,
    updateContent,
    deleteContent,
    currentPage,
    totalItems,
    itemsPerPage,
    selectedTypeTitle,
    setSelectedTypeTitle,
    selectedCategoryTitle,
    setSelectedCategoryTitle,
    selectedGenreTitle,
    setSelectedGenreTitle,
    searchQuery,
    setSearchQuery,
    handlePageChange,
    availableCategories,
    availableGenres,
  };
};
