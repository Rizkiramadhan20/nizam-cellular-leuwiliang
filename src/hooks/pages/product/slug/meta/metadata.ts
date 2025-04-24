import { Metadata } from "next";

import { db } from "@/utils/firebase/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

import { Timestamp } from "firebase/firestore";

export interface Product {
    title: string;
    description: string;
    thumbnail: string[];
    slug: string;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

const DEFAULT_METADATA = {
    title: "Product | Nizam Cellular Leuwiliang",
    description: "Baca artikel terbaru seputar teknologi dan service handphone dari Nizam Cellular Leuwiliang",
    image: "/og-image.jpg"
};

async function getProduct(slug: string): Promise<Product | null> {
    if (!slug) return null;

    try {
        const productRef = collection(db, "product");
        const q = query(productRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.warn(`Product with slug "${slug}" not found`);
            return null;
        }

        const productData = querySnapshot.docs[0].data() as Product;
        return productData;
    } catch (error) {
        console.error("Error fetching Product:", error);
        if (error instanceof Error) {
            console.error("Error details:", {
                message: error.message,
                name: error.name,
                stack: error.stack
            });
        }
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'https://nizamcellularleuwiliang.my.id';
    const productUrl = `${baseUrl}/product/${params.slug}`;

    let product: Product | null = null;
    try {
        product = await getProduct(params.slug);
    } catch (error) {
        console.error("Error generating metadata:", error);
    }

    return {
        title: product?.title ? `${product.title} | Nizam Cellular Leuwiliang` : DEFAULT_METADATA.title,
        description: product?.description || DEFAULT_METADATA.description,
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: productUrl,
        },
        openGraph: {
            type: 'article',
            title: product?.title ? `${product.title} | Nizam Cellular Leuwiliang` : DEFAULT_METADATA.title,
            description: product?.description || DEFAULT_METADATA.description,
            url: productUrl,
            siteName: 'Nizam Cellular Leuwiliang',
            locale: 'id_ID',
            images: product?.thumbnail?.length ? [{
                url: product.thumbnail[0],
                width: 1200,
                height: 630,
                alt: product.title,
            }] : [{
                url: DEFAULT_METADATA.image,
                width: 1200,
                height: 630,
                alt: DEFAULT_METADATA.title,
            }],
            publishedTime: product?.createdAt ? product.createdAt.toDate().toISOString() : undefined,
            modifiedTime: product?.updatedAt ? product.updatedAt.toDate().toISOString() : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: product?.title ? `${product.title} | Nizam Cellular Leuwiliang` : DEFAULT_METADATA.title,
            description: product?.description || DEFAULT_METADATA.description,
            images: product?.thumbnail?.length ? [product.thumbnail[0]] : [DEFAULT_METADATA.image],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}