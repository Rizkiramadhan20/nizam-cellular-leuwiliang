import React from 'react'

import { BlogGridProps } from '@/components/ui/blog/types/Blog'

import BlogCard from '@/components/ui/blog/components/BlogCard'

export default function BlogGrid({ blogs }: BlogGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((item, index) => (
                <div key={index}>
                    <BlogCard blog={item} />
                </div>
            ))}
        </div>
    )
} 