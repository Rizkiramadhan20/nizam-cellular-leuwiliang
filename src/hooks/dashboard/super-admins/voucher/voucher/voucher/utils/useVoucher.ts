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

import { voucher } from "@/hooks/dashboard/super-admins/voucher/voucher/voucher/types/voucher";

export const useVoucher = () => {
  const [voucher, setVoucher] = useState<voucher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get all handphones
  const fetchVoucher = async () => {
    setLoading(true);
    try {
      const voucherQuery = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_VOUCHER as string),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(voucherQuery);
      const voucherList = snapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          } as voucher)
      );

      setVoucher(voucherList);
    } catch (err) {
      console.error("Error fetching voucher:", err);
      setError("Failed to load voucher");
    } finally {
      setLoading(false);
    }
  };

  // Add a new voucher
  const addVoucher = async (
    voucherData: Omit<voucher, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      await addDoc(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_VOUCHER as string),
        {
          ...voucherData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
      );
      fetchVoucher();
      return true;
    } catch (err) {
      console.error("Error adding voucher:", err);
      setError("Failed to add voucher");
      return false;
    }
  };

  // Update an existing handphone
  const updateVoucher = async (
    id: string,
    voucherData: Partial<Omit<voucher, "id" | "createdAt" | "updatedAt">>
  ) => {
    try {
      const voucherRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_VOUCHER as string,
        id
      );
      await updateDoc(voucherRef, {
        ...voucherData,
        updatedAt: serverTimestamp(),
      });
      fetchVoucher();
      return true;
    } catch (err) {
      console.error("Error updating voucher:", err);
      setError("Failed to update voucher");
      return false;
    }
  };

  // Delete a voucher
  const deleteVoucher = async (id: string) => {
    try {
      await deleteDoc(
        doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_VOUCHER as string, id)
      );
      fetchVoucher();
      return true;
    } catch (err) {
      console.error("Error deleting voucher:", err);
      setError("Failed to delete voucher");
      throw err;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchVoucher();
  }, []);

  return {
    voucher,
    loading,
    error,
    fetchVoucher,
    addVoucher,
    updateVoucher,
    deleteVoucher,
  };
};
