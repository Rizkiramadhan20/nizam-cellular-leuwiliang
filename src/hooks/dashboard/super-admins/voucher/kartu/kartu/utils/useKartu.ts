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

import { Kartu } from "@/hooks/dashboard/super-admins/voucher/kartu/kartu/types/Kartu";

export const useKartu = () => {
  const [kartu, setKartu] = useState<Kartu[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all handphones
  const fetchKartu = async () => {
    setLoading(true);
    try {
      const kartuQuery = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PERDANA as string),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(kartuQuery);
      const kartuList = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          } as Kartu)
      );

      setKartu(kartuList);
    } catch (err) {
      console.error("Error fetching kartu:", err);
      setError("Failed to load kartu");
    } finally {
      setLoading(false);
    }
  };

  // Add a new kartu
  const addKartu = async (
    kartuData: Omit<Kartu, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PERDANA as string),
        {
          ...kartuData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );
      fetchKartu();
      return true;
    } catch (err) {
      console.error("Error adding kartu:", err);
      setError("Failed to add kartu");
      return false;
    }
  };

  // Update an existing handphone
  const updateKartu = async (
    id: string,
    kartuData: Partial<Omit<Kartu, "id" | "createdAt" | "updatedAt">>
  ) => {
    try {
      const kartuRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_PERDANA as string,
        id
      );
      await updateDoc(kartuRef, {
        ...kartuData,
        updatedAt: serverTimestamp(),
      });
      fetchKartu();
      return true;
    } catch (err) {
      console.error("Error updating kartu:", err);
      setError("Failed to update kartu");
      return false;
    }
  };

  // Delete a kartu
  const deleteKartu = async (id: string) => {
    try {
      await deleteDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PERDANA as string, id)
      );
      fetchKartu();
      return true;
    } catch (err) {
      console.error("Error deleting kartu:", err);
      setError("Failed to delete kartu");
      throw err;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchKartu();
  }, []);

  return {
    kartu,
    loading,
    error,
    fetchKartu,
    addKartu,
    updateKartu,
    deleteKartu,
  };
};
