import React from 'react'

import { Metadata } from 'next'

import BlogLayout from "@/hooks/pages/blog/BlogLayout"

export const metadata: Metadata = {
    title: 'Blog | Nizam Cellular Leuwiliang',
    description: 'Blog page',
}

export default function page() {
    return (
        <BlogLayout />
    )
}
