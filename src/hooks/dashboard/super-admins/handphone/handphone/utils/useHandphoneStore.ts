import { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { Handphone } from "@/hooks/dashboard/super-admins/handphone/handphone/types/handphone";

export const useHandphoneStore = () => {
  const [handphones, setHandphones] = useState<Handphone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHandphones = async () => {
    setLoading(true);
    try {
      const handphoneQuery = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_HANDPHONE as string),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(handphoneQuery);
      const handphoneList = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          } as Handphone)
      );

      setHandphones(handphoneList);
    } catch (err) {
      console.error("Error fetching handphones:", err);
      setError("Failed to load handphones");
    } finally {
      setLoading(false);
    }
  };

  const addHandphone = async (
    handphoneData: Omit<Handphone, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      // Process the data to handle empty description
      const processedData = {
        ...handphoneData,
        description: handphoneData.description?.trim() || null,
      };

      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_HANDPHONE as string),
        {
          ...processedData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );
      fetchHandphones();
      return true;
    } catch (err) {
      console.error("Error adding handphone:", err);
      setError("Failed to add handphone");
      return false;
    }
  };

  // Update an existing handphone
  const updateHandphone = async (
    id: string,
    handphoneData: Partial<Omit<Handphone, "id" | "createdAt" | "updatedAt">>
  ) => {
    try {
      // Process the data to handle empty description
      const processedData = {
        ...handphoneData,
        description:
          handphoneData.description !== undefined
            ? handphoneData.description?.trim() || null
            : undefined,
      };

      const handphoneRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_HANDPHONE as string,
        id
      );
      await updateDoc(handphoneRef, {
        ...processedData,
        updatedAt: serverTimestamp(),
      });
      fetchHandphones();
      return true;
    } catch (err) {
      console.error("Error updating handphone:", err);
      setError("Failed to update handphone");
      return false;
    }
  };

  // Delete a handphone
  const deleteHandphone = async (id: string) => {
    try {
      await deleteDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_HANDPHONE as string, id)
      );
      fetchHandphones();
      return true;
    } catch (err) {
      console.error("Error deleting handphone:", err);
      setError("Failed to delete handphone");
      throw err;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchHandphones();
  }, []);

  return {
    handphones,
    loading,
    error,
    fetchHandphones,
    addHandphone,
    updateHandphone,
    deleteHandphone,
  };
};
