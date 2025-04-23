import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { ProductType } from "@/hooks/pages/product/product/types/Product";

export function FetchTypeCategory(
    typeCategory: string,
    callback: (product: ProductType[]) => void
) {
    const normalizedCategory = typeCategory
        .replace(/-/g, " ")
        .toLowerCase()
        .trim();

    const q = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string),
        where("typeCategory", "==", normalizedCategory)
    );

    return onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.().toISOString(),
        })) as ProductType[];

        callback(products);
    });
}