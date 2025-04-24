import { Metadata } from "next";

import { db } from "@/utils/firebase/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import { ProductType } from "@/hooks/pages/product/product/types/Product";

function capitalizeWords(str: string): string {
    return str
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
}

async function getProduct(typeCategory: string, genreTitle: string): Promise<ProductType[] | null> {
    if (!typeCategory || !genreTitle || typeof typeCategory !== "string" || typeof genreTitle !== "string") {
        console.warn("Invalid typeCategory or genreTitle:", { typeCategory, genreTitle });
        return null;
    }

    try {
        const normalizedTypeCategory = typeCategory
            .replace(/-/g, " ")
            .toLowerCase()
            .trim();
        const normalizedGenreTitle = genreTitle
            .replace(/-/g, " ")
            .toLowerCase()
            .trim();

        const productRef = collection(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string
        );
        const q = query(
            productRef,
            where("typeCategory", "==", normalizedTypeCategory),
            where("genreTitle", "==", normalizedGenreTitle)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const productData = querySnapshot.docs.map((doc) => ({
            ...(doc.data() as ProductType),
            createdAt: doc.data().createdAt?.toDate?.().toISOString(),
        })) as ProductType[];
        return productData;
    } catch (error) {
        console.error("Error fetching Product:", error);
        return null;
    }
}

export async function getProductMetadata({
    params,
}: {
    params: { typeCategory: string; genreTitle: string };
}): Promise<Metadata> {
    const products = await getProduct(params.typeCategory, params.genreTitle);
    const categoryDisplay = products && products.length > 0 ? capitalizeWords(products[0].genreTitle) : "";
    const typeDisplay = products && products.length > 0 ? capitalizeWords(products[0].typeCategory) : "";
    const title = products && products.length > 0
        ? `Products - ${typeDisplay} - ${categoryDisplay} | Nizam Cellular Leuwiliang`
        : "Products Not Found";
    const description = products && products.length > 0
        ? `Explore our collection of ${categoryDisplay} products in ${typeDisplay} category. Find templates, tools, and resources for your next project.`
        : "Discover our diverse collection of products and resources";

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: products && products.length > 0 && products[0].imageUrl
                ? [
                    {
                        url: products[0].imageUrl,
                        width: 1200,
                        height: 630,
                        alt: `${typeDisplay} - ${categoryDisplay} Products`,
                    },
                ]
                : [],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: products && products.length > 0 && products[0].imageUrl ? [products[0].imageUrl] : [],
        },
        robots: {
            index: true,
            follow: true,
        },
        alternates: {
            canonical: `/product/${params.typeCategory}/${params.genreTitle}`,
        },
    };
}