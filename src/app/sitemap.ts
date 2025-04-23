import { MetadataRoute } from 'next'

import { db } from "@/utils/firebase/firebase"

import { collection, getDocs } from "firebase/firestore"

const BASE_URL = process.env.NEXT_PUBLIC_URL as string;

async function getBlogSlugs() {
    try {
        const blogRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG as string)
        const querySnapshot = await getDocs(blogRef)
        return querySnapshot.docs.map(doc => doc.data().slug)
    } catch (error) {
        console.error("Error fetching blog slugs:", error)
        return []
    }
}

async function getProductTypeCategories() {
    try {
        const productRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string)
        const querySnapshot = await getDocs(productRef)
        const typeCategories = new Set<string>()

        querySnapshot.docs.forEach(doc => {
            const data = doc.data()
            if (data.typeCategory) {
                typeCategories.add(data.typeCategory)
            }
        })

        return Array.from(typeCategories)
    } catch (error) {
        console.error("Error fetching product type categories:", error)
        return []
    }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogSlugs = await getBlogSlugs()
    const typeCategories = await getProductTypeCategories()

    const blogUrls = blogSlugs.map(slug => ({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    const typeCategoryUrls = typeCategories.map(typeCategory => ({
        url: `${BASE_URL}/product/${typeCategory}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/product`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...blogUrls,
        ...typeCategoryUrls
    ]
} 