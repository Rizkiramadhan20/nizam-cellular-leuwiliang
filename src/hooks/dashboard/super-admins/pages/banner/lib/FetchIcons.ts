import { useState, useCallback, useEffect } from "react";

import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    query,
    orderBy,
} from "firebase/firestore";

import { toast } from "react-hot-toast";

import { db } from "@/utils/firebase/firebase";

import imagekitInstance from "@/utils/imagekit/imagekit";

import { compressImage } from "@/base/helper/ImageCompression";

import { BannerContent } from "@/hooks/dashboard/super-admins/pages/banner/types/banner";

const CACHE_DURATION = 5 * 60 * 1000; // 5 menit

interface CacheItem {
    data: BannerContent[];
    timestamp: number;
}

let cache: CacheItem | null = null;

export const useBannerData = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [contents, setContents] = useState<BannerContent[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchContents = useCallback(async () => {
        try {
            setIsLoading(true);
            const now = Date.now();

            if (cache && now - cache.timestamp < CACHE_DURATION) {
                setContents(cache.data);
                return;
            }

            const q = query(
                collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BANNER as string),
                orderBy("createdAt", "desc")
            );
            const querySnapshot = await getDocs(q);
            const data = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as BannerContent[];

            cache = { data, timestamp: now };
            setContents(data);
        } catch (error) {
            console.error("Error fetching contents:", error);
            setContents([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Fetch contents when component mounts
    useEffect(() => {
        fetchContents();
    }, [fetchContents]);

    const handleImageUpload = useCallback(async (file: File): Promise<string> => {
        try {
            const compressedFile = await compressImage(file);
            const reader = new FileReader();

            const base64 = await new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(compressedFile);
            });

            const result = await imagekitInstance.upload({
                file: base64,
                fileName: `banner-content-${Date.now()}`,
                folder: "/banner-content",
            });

            return result.url;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error("Failed to upload image");
        }
    }, []);

    const createContent = useCallback(async (formData: BannerContent, imageUrl: string) => {
        try {
            const docRef = await addDoc(
                collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BANNER as string),
                {
                    ...formData,
                    imageUrl,
                    createdAt: new Date(),
                }
            );

            const newContent = {
                ...formData,
                id: docRef.id,
                imageUrl,
                createdAt: new Date(),
            };

            setContents((prev) => [newContent, ...prev]);
            cache = { data: [newContent, ...(cache?.data || [])], timestamp: Date.now() };
        } catch (error) {
            console.error("Error creating content:", error);
            throw error;
        }
    }, []);

    const handleUpdate = useCallback(async (id: string, formData: BannerContent) => {
        try {
            const docRef = doc(
                db,
                process.env.NEXT_PUBLIC_COLLECTIONS_BANNER as string,
                id
            );
            await updateDoc(docRef, {
                ...formData,
                updatedAt: new Date(),
            });

            setContents((prev) =>
                prev.map((content) =>
                    content.id === id
                        ? { ...content, ...formData, updatedAt: new Date() }
                        : content
                )
            );

            cache = {
                data: contents.map((content) =>
                    content.id === id
                        ? { ...content, ...formData, updatedAt: new Date() }
                        : content
                ),
                timestamp: Date.now(),
            };
        } catch (error) {
            console.error("Error updating content:", error);
            throw error;
        }
    }, [contents]);

    const handleDelete = useCallback(async (id: string) => {
        try {
            const docRef = doc(
                db,
                process.env.NEXT_PUBLIC_COLLECTIONS_BANNER as string,
                id
            );
            await deleteDoc(docRef);

            setContents((prev) => prev.filter((content) => content.id !== id));
            cache = {
                data: contents.filter((content) => content.id !== id),
                timestamp: Date.now(),
            };

            toast.success("Content deleted successfully!");
        } catch (error) {
            console.error("Error deleting content:", error);
            throw error;
        }
    }, [contents]);

    return {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
        fetchContents,
    };
};
