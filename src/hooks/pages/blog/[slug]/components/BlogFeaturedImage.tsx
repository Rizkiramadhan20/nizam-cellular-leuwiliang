import React from 'react'

import Image from 'next/image'

import { BlogFeaturedImageProps } from "@/components/ui/blog/types/Blog"

export default function BlogFeaturedImage({ blog }: BlogFeaturedImageProps) {
    return (
        <div className="relative mb-8 sm:mb-12 md:mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl sm:rounded-3xl" />
            <figure className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl">
                <Image
                    src={blog?.thumbnail || '/images/placeholder.jpg'}
                    alt={blog?.title || 'Blog post image'}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover"
                    priority
                />
            </figure>
        </div>
    )
} 