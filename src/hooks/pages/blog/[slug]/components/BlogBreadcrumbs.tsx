import React from 'react'

import Link from 'next/link'

import { BlogBreadcrumbsProps } from "@/components/ui/blog/types/Blog"

export default function BlogBreadcrumbs({ blog }: BlogBreadcrumbsProps) {
    return (
        <div className="mb-8 sm:mb-12 md:mb-16">
            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 sm:space-x-2 md:space-x-4">
                    <li className="inline-flex items-center">
                        <Link href="/" className="inline-flex items-center text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li className="inline-flex items-center">
                        <div className="flex items-center">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                            <Link href="/blog" className="pl-2 sm:pl-4 inline-flex items-center text-xs sm:text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                                <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                </svg>
                                Blog
                            </Link>
                        </div>
                    </li>
                    <li className="inline-flex items-center" aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                            </svg>
                            <span className="ml-2 text-xs sm:text-sm font-medium text-gray-500 line-clamp-1">{blog?.title}</span>
                        </div>
                    </li>
                </ol>
            </nav>
        </div>
    )
} 