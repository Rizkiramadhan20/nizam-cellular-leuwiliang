"use client"

import React, { useState, useEffect } from 'react'

import { FetchBlog } from "@/components/ui/blog/lib/FetchBlog"

import { BlogType } from "@/components/ui/blog/types/Blog"

import BlogSkelaton from "@/components/ui/blog/BlogSkelaton"

import dynamic from 'next/dynamic'

const BlogGrid = dynamic(() => import('@/components/ui/blog/components/BlogGrid'), { ssr: false })

const CategoryFilter = dynamic(() => import('@/components/ui/blog/components/CategoryFilter'), { ssr: false })

const BlogHeader = dynamic(() => import('@/components/ui/blog/components/BlogHeader'), { ssr: false })

const TopBlog = dynamic(() => import('@/components/ui/blog/components/TopBlog'), { ssr: false })

export default function Blog() {
    const [blog, setBlog] = useState<BlogType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    useEffect(() => {
        const unsubscribe = FetchBlog((newBlog) => {
            const sortedBlog = newBlog.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setBlog(sortedBlog);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <BlogSkelaton />;
    }

    const categories = ["All", ...Array.from(new Set(blog.map(item => item.category)))];
    const filteredBlog = selectedCategory === "All"
        ? blog
        : blog.filter(item => item.category === selectedCategory);

    const topBlog = blog.length > 0 ? blog[0] : null;
    const otherBlog = filteredBlog.filter(item => item !== topBlog);

    return (
        <section className='min-h-full py-16 bg-[#0A0A0A] text-white relative overflow-hidden'>
            <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
                <BlogHeader />

                {topBlog && (
                    <div className="mb-10">
                        <TopBlog blog={topBlog} />
                    </div>
                )}

                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategorySelect={setSelectedCategory}
                />

                <BlogGrid blogs={otherBlog} />
            </div>

            {/* Add subtle gradient effect */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-500/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-500/10 blur-[120px] rounded-full"></div>
        </section>
    )
}
