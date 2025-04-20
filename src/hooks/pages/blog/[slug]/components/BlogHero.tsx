import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import { format } from 'date-fns'

import { BlogHeroProps } from "@/components/ui/blog/types/Blog"

import { getBlogViews, incrementBlogViews } from '@/hooks/pages/blog/[slug]/lib/blogViews'

export default function BlogHero({ blog }: BlogHeroProps) {
    const [views, setViews] = useState<number>(0);

    useEffect(() => {
        const fetchViews = async () => {
            const viewCount = await getBlogViews(blog.slug);
            setViews(viewCount);
            await incrementBlogViews(blog.slug);
        };

        fetchViews();
    }, [blog.slug]);

    return (
        <div className="relative pt-6 pb-8 sm:pt-8 sm:pb-10 md:pt-12 md:pb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl sm:rounded-3xl" />
            <div className="relative max-w-4xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10">
                <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white shadow-sm">
                    <span className="text-xs sm:text-sm font-medium text-blue-600">{blog?.category}</span>
                </div>

                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
                        {blog?.title}
                    </h1>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-600">
                    <div className="flex items-center">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                            <Image
                                src={blog?.author?.photoURL || '/images/placeholder-avatar.jpg'}
                                alt={blog?.author?.name || 'Author'}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="ml-3 text-left">
                            <p className="text-xs sm:text-sm font-medium text-gray-900">{blog?.author?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-500">{blog?.author?.role || 'Content Writer'}</p>
                        </div>
                    </div>
                    <div className="hidden sm:block h-6 w-px bg-gray-200" />
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time className="text-xs sm:text-sm">
                            {blog?.createdAt ? format(new Date(blog.createdAt), 'dd MMMM yyyy') : ''}
                        </time>
                    </div>
                    <div className="hidden sm:block h-6 w-px bg-gray-200" />
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="text-xs sm:text-sm">{views} views</span>
                    </div>
                </div>
            </div>
        </div>
    )
} 