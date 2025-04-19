import React from 'react'

import BlogLayout from '@/hooks/dashboard/super-admins/blog/blog/BlogLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Blog | Nizam Cellular Leuwiliang",
    description: "Halaman blog super admins",
}

export default function page() {
    return (
        <BlogLayout />
    )
}