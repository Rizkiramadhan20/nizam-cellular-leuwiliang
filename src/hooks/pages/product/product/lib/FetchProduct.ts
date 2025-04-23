import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { ProductType } from "@/hooks/pages/product/product/types/Product";

export function FetchProduct(callback: (product: ProductType[]) => void) {
  const q = query(
    collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string),
    where("status", "==", "publish")
  );

  return onSnapshot(q, (snapshot) => {
    callback(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.().toISOString() || "",
        updatedAt: doc.data().updatedAt?.toDate?.().toISOString() || "",
      })) as ProductType[]
    );
  });
}