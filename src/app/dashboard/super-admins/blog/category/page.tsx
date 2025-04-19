import React from 'react'

import BlogCategoryLayout from '@/hooks/dashboard/super-admins/blog/category/BlogCategoryLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Kategori | Nizam Cellular Leuwiliang",
    description: "Halaman kategori blog super admins",
}

export default function page() {
    return (
        <BlogCategoryLayout />
    )
}