import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    limit,
} from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { ProductType } from "@/hooks/pages/product/product/types/Product";

export function FetchSlug(
    slug: string,
    callback: (product: ProductType[]) => void
) {
    const q = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string),
        where("slug", "==", slug)
    );

    return onSnapshot(q, (snapshot) => {
        callback(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate?.().toISOString(),
            })) as ProductType[]
        );
    });
}

export function FetchRelatedProduct(
    slug: string,
    callback: (product: ProductType[]) => void
) {
    const q = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string),
        orderBy("createdAt", "desc"),
        limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate?.().toISOString(),
        })) as ProductType[];

        const filteredProducts = products
            .filter(product => product.slug !== slug)
            .slice(0, 9);

        callback(filteredProducts);
    });

    return unsubscribe;
}