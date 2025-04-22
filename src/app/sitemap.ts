import { MetadataRoute } from 'next'

import { db } from "@/utils/firebase/firebase"

import { collection, getDocs } from "firebase/firestore"

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://nizamcellularleuwiliang.my.id'
    const blogSlugs = await getBlogSlugs()

    const blogUrls = blogSlugs.map(slug => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/product`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        ...blogUrls
    ]
} 