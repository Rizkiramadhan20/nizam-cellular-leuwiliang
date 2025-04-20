import { Metadata } from "next";

import { db } from "@/utils/firebase/firebase";

import { collection, getDocs, query, where } from "firebase/firestore";

export interface Blog {
    title: string;
    description: string;
    thumbnail: string[];
    slug: string;
}

async function getBlog(slug: string): Promise<Blog | null> {
    try {
        const blogRef = collection(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_BLOG as string
        );
        const q = query(blogRef, where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return null;
        }

        const blogData = querySnapshot.docs[0].data() as Blog;
        return blogData;
    } catch (error) {
        console.error("Error fetching Blog:", error);
        return null;
    }
}

export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const blog = await getBlog(params.slug);

    return {
        title: blog ? `${blog.title}` : "Blog Not Found",
        description: blog?.description || "Blog description not available",
        openGraph: {
            title: blog ? `${blog.title}` : "Blog Not Found",
            description: blog?.description || "Blog description not available",
            images: blog?.thumbnail ? [blog.thumbnail[0]] : [],
        },
    };
}