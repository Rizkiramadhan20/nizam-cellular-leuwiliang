import { useState, useCallback, useEffect } from "react";

import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase/firebase";

import {
  GalleryContent,
  GalleryFormData,
} from "@/hooks/dashboard/super-admins/layout/gallery/types/Gallery";

import { handleImageUpload } from "@/hooks/dashboard/super-admins/layout/gallery/lib/imageUtils";

export const useGalleryData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [contents, setContents] = useState<GalleryContent[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;

  // Real-time listener implementation
  const fetchContents = useCallback(async (page = 0) => {
    try {
      setIsLoading(true);

      const galleryRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_GALLERY as string);

      // Get total count first
      const totalSnapshot = await getDocs(galleryRef);
      const totalCount = totalSnapshot.size;
      setTotalItems(totalCount);

      // Set up real-time listener with pagination
      const q = query(
        galleryRef,
        orderBy('createdAt', 'desc'),
        limit(itemsPerPage)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const contentArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as GalleryContent[];

        setContents(contentArray);
        setCurrentPage(page);
        setIsLoading(false);
      }, (error) => {
        console.error("Error in real-time listener:", error);
        toast.error("Failed to fetch contents");
        setIsLoading(false);
      });

      // Cleanup listener when component unmounts or page changes
      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up real-time listener:", error);
      toast.error("Failed to fetch contents");
      setIsLoading(false);
    }
  }, [itemsPerPage]);

  const createContent = async (
    formData: GalleryFormData,
    selectedImage: File | null
  ) => {
    try {
      setIsSubmitting(true);
      let imageUrl = formData.imageUrl;

      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage);
      }

      const updatedFormData = {
        ...formData,
        imageUrl: selectedImage ? imageUrl : formData.imageUrl,
      };

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_GALLERY as string),
        {
          ...updatedFormData,
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

  const updateContent = async (
    id: string,
    formData: GalleryFormData,
    selectedImage: File | null
  ) => {
    try {
      setIsSubmitting(true);
      let imageUrl = formData.imageUrl;

      if (selectedImage) {
        imageUrl = await handleImageUpload(selectedImage);
      }

      const updatedFormData = {
        ...formData,
        imageUrl: selectedImage ? imageUrl : formData.imageUrl,
      };

      const docRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_GALLERY as string,
        id
      );
      await updateDoc(docRef, {
        ...updatedFormData,
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
        process.env.NEXT_PUBLIC_COLLECTIONS_GALLERY as string,
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

  // Set up initial real-time listener when component mounts
  useEffect(() => {
    fetchContents(currentPage);
  }, [currentPage, fetchContents]);

  return {
    isLoading,
    contents,
    isSubmitting,
    createContent,
    updateContent,
    deleteContent,
    fetchContents,
    currentPage,
    totalItems,
    itemsPerPage,
  };
};
