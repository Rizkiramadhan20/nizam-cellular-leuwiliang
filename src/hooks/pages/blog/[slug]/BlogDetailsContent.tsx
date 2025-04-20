"use client"

import React, { useState, useEffect } from 'react'

import BlogDetailsSkelaton from "@/hooks/pages/blog/[slug]/BlogDetailsSkelaton"

import BlogNotFound from "@/hooks/pages/blog/[slug]/BlogNotFound"

import ShareButtons from "@/hooks/pages/blog/[slug]/ShareButtons"

import { FetchBlogDetails } from '@/hooks/pages/blog/[slug]/lib/FetchBlog'

import { FetchRelatedBlog } from "@/hooks/pages/blog/[slug]/lib/FetchBlog"

import { BlogType } from "@/components/ui/blog/types/Blog";

import BlogHero from "@/hooks/pages/blog/[slug]/components/BlogHero"

import BlogFeaturedImage from "@/hooks/pages/blog/[slug]/components/BlogFeaturedImage"

import BlogBreadcrumbs from "@/hooks/pages/blog/[slug]/components/BlogBreadcrumbs"

import RelatedArticles from "@/hooks/pages/blog/[slug]/components/RelatedArticles"

export default function ArticleDetailsContent({ slug }: { slug: string }) {
    const [blog, setBlog] = React.useState<BlogType[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [relatedArticles, setRelatedArticles] = useState<BlogType[]>([])

    useEffect(() => {
        const unsubscribe = FetchBlogDetails(slug, (article: BlogType[]) => {
            setBlog(article)
            setLoading(false)
        })

        FetchRelatedBlog(slug, (articles: BlogType[]) => {
            setRelatedArticles(articles)
        })

        return () => {
            unsubscribe()
        }
    }, [slug])

    if (loading) return <BlogDetailsSkelaton />;

    const currentBlog = blog[0];

    if (!currentBlog) return <BlogNotFound />;

    const shareUrl = `${process.env.NEXT_PUBLIC_URL}/blog/${currentBlog.slug}`;

    const filteredBlog = blog.find(item => item.slug === slug)

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
            <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
                <BlogHero blog={currentBlog} />

                <BlogFeaturedImage blog={currentBlog} />

                <BlogBreadcrumbs blog={currentBlog} />

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12">
                    {/* Sidebar */}
                    <aside className="lg:w-64 flex-shrink-0 order-2 lg:order-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white rounded-xl p-4 sm:p-6 border border-[var(--border-color)]">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Share Article</h3>
                                <ShareButtons shareUrl={shareUrl} shareTitle={filteredBlog?.title || ''} />
                            </div>
                        </div>
                    </aside>

                    {/* Article Content */}
                    <article className="flex-1 order-1 lg:order-2">
                        <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                                prose-headings:text-gray-900 
                                prose-p:text-gray-700 
                                prose-strong:text-gray-900 
                                prose-a:text-blue-600 hover:prose-a:text-blue-800
                                
                                [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-3 sm:[&_h3]:mb-4 [&_h3]:mt-6 sm:[&_h3]:mt-8
                                
                                [&_p]:mb-3 sm:[&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-base sm:[&_p]:text-lg
                                [&_p:empty]:hidden
                                
                                [&_ol]:pl-0 [&_ol]:list-none [&_ol]:space-y-2 sm:[&_ol]:space-y-3 [&_ol]:my-3 sm:[&_ol]:my-4
                                [&_ul]:pl-0 [&_ul]:list-none [&_ul]:space-y-2 sm:[&_ul]:space-y-3 [&_ul]:my-3 sm:[&_ul]:my-4
                                
                                [&_li]:relative [&_li]:pl-5 sm:[&_li]:pl-6 [&_li]:text-gray-700
                                
                                [&_li[data-list=bullet]]:before:content-["•"]
                                [&_li[data-list=bullet]]:before:absolute
                                [&_li[data-list=bullet]]:before:left-0
                                [&_li[data-list=bullet]]:before:text-gray-500
                                [&_li[data-list=bullet]]:before:font-bold
                                [&_li[data-list=bullet]]:before:text-lg sm:[&_li[data-list=bullet]]:before:text-xl
                                
                                [&_li[data-list=ordered]]:before:absolute
                                [&_li[data-list=ordered]]:before:left-0
                                [&_li[data-list=ordered]]:before:text-gray-700
                                [&_li[data-list=ordered]]:before:font-semibold
                                [&_li[data-list=ordered]]:before:counter-reset
                                [&_li[data-list=ordered]]:before:content-[counter(list-item)"."]
                                
                                [&_strong]:text-gray-900 [&_strong]:font-semibold
                                
                                [&_.ql-ui]:hidden
                                
                                [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                                
                                [&_img]:my-4 sm:[&_img]:my-6 [&_img]:rounded-lg sm:[&_img]:rounded-xl [&_img]:shadow-md sm:[&_img]:shadow-lg'>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: currentBlog?.content || ''
                                }}
                            />
                        </div>
                    </article>
                </div>

                <RelatedArticles relatedArticles={relatedArticles} currentSlug={slug} />
            </div>
        </section>
    )
}