import { collection, query, where, onSnapshot } from "firebase/firestore";

import { db } from "@/utils/firebase/firebase";

import { ProductType } from "@/hooks/pages/product/product/types/Product";

export function FetchGenreTitle(
    typeCategory: string,
    genreTitle: string,
    callback: (product: ProductType[]) => void
) {
    const normalizedCategory = typeCategory && typeof typeCategory === 'string'
        ? typeCategory.replace(/-/g, " ")
            .toLowerCase()
            .trim()
        : undefined;

    const normalizedGenreTitle = genreTitle && typeof genreTitle === 'string'
        ? genreTitle.replace(/-/g, " ")
            .toLowerCase()
            .trim()
        : undefined;

    if (!normalizedCategory || !normalizedGenreTitle) {
        console.error('Invalid typeCategory or genreTitle');
        return () => { };
    }

    const q = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string),
        where("typeCategory", "==", normalizedCategory),
        where("genreTitle", "==", normalizedGenreTitle)
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