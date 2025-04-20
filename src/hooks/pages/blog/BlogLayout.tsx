"use client"

import React, { Fragment } from 'react';

import { Pagination } from '@/base/helper/Pagination';

import BlogSkelaton from '@/hooks/pages/blog/BlogSkelaton';

import { motion, AnimatePresence } from 'framer-motion';

import { SearchModal } from '@/hooks/pages/blog/components/SearchModal';

import { TopBlog } from '@/hooks/pages/blog/components/TopBlog';

import { CategoryFilter } from '@/hooks/pages/blog/components/CategoryFilter';

import { useManagementBlog } from '@/hooks/pages/blog/lib/useManagementBlog';

import { BlogCard } from '@/hooks/pages/blog/components/BlogCard';

export default function ArticleLayout() {

    const {
        blog,
        loading,
        selectedCategory,
        searchQuery,
        searchResults,
        currentPage,
        topBlog,
        paginatedBlog,
        totalPages,
        setSelectedCategory,
        handleSearch,
        handleSearchResultClick,
        handlePageChange,
        handleModalOpen,
        handleModalClose,
    } = useManagementBlog();

    if (loading) {
        return <BlogSkelaton />;
    }
    return (
        <Fragment>
            {/* Hero Section */}
            <section className='min-h-[40vh] md:min-h-[60vh] relative py-16 md:py-28 overflow-hidden bg-[#0A0A0A] text-white'>
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-400/20 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400/20 blur-[120px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-purple-400/20 blur-[120px] rounded-full"></div>

                {/* Content */}
                <div className="container px-4 sm:px-6 lg:px-10 relative z-10">
                    <div className="max-w-4xl mx-auto text-center mt-24">
                        <div className="mb-4 md:mb-6">
                            <span className='px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-white/10 backdrop-blur-sm text-base md:text-lg font-semibold shadow-sm hover:shadow-md transition-all duration-300 border border-white/20'>Blog</span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white mb-4 md:mb-6 leading-tight">
                            Temukan Wawasan Dan{' '}
                            <span className="italic text-blue-400">Pengatahuan</span>
                        </h1>
                    </div>
                </div>
            </section>

            {/* Articles Grid Section */}
            <section className='bg-gray-50 py-6 md:py-10 min-h-screen'>
                <div className="container px-4 sm:px-6 lg:px-10">
                    <AnimatePresence>
                        <SearchModal
                            searchQuery={searchQuery}
                            searchResults={searchResults}
                            handleSearch={handleSearch}
                            handleSearchResultClick={handleSearchResultClick}
                            handleModalClose={handleModalClose}
                        />
                    </AnimatePresence>

                    {topBlog && (
                        <div className="mb-8 md:mb-12">
                            <TopBlog blog={topBlog} />
                        </div>
                    )}

                    <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6 mb-8 md:mb-12'>
                        <CategoryFilter
                            blog={blog}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />

                        <button
                            onClick={handleModalOpen}
                            className="w-full md:w-80 pl-4 md:pl-6 pr-4 py-2.5 md:py-3 border border-gray-200 rounded-full 
                                 flex items-center gap-3 hover:border-blue-500 hover:shadow-md transition-all duration-300
                                 bg-white text-gray-500 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            <svg className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 24 24" fill="none">
                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span className="text-sm md:text-base">Cari artikel...</span>
                        </button>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            {paginatedBlog.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    <div className='mt-10 md:mt-14'>
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </section>
        </Fragment>
    );
}