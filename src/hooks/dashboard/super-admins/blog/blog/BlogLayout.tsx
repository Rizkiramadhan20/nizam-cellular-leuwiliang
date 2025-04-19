"use client"

import React, { useEffect, useState, useMemo } from 'react'

import { motion } from 'framer-motion'

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import { Article, Category, BlogFilters } from '@/hooks/dashboard/super-admins/blog/blog/types/Blog'

import ArticleSkeleton from '@/hooks/dashboard/super-admins/blog/blog/BlogSkelaton'

import { Pagination } from '@/base/helper/Pagination'

import { SearchAndFilter } from '@/hooks/dashboard/super-admins/blog/blog/components/SearchAndFilter'

import { DeleteModal } from '@/hooks/dashboard/super-admins/blog/blog/components/DeleteModal'

import { ViewModal } from '@/hooks/dashboard/super-admins/blog/blog/components/ViewModal'

import { ArticleCard } from '@/hooks/dashboard/super-admins/blog/blog/components/ArticleCard'

import dynamic from 'next/dynamic'

const ArticleModal = dynamic(() => import('@/hooks/dashboard/super-admins/blog/blog/modal/ContentModal'), { ssr: false })

export default function ArticleLayout() {
    const [articles, setArticles] = useState<Article[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null)
    const [viewArticle, setViewArticle] = useState<Article | null>(null)
    const [filters, setFilters] = useState<BlogFilters>({
        searchQuery: '',
        selectedCategory: '',
        selectedStatus: ''
    })
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 6

    useEffect(() => {
        fetchArticles()
        fetchCategories()
    }, [])

    const fetchArticles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG!))
            const articlesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Article))
            const sortedArticles = articlesData.sort((a, b) =>
                b.createdAt.seconds - a.createdAt.seconds
            )
            setArticles(sortedArticles)
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG_CATEGORY!))
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Category))
            setCategories(categoriesData)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_BLOG!, id))
            setArticles(articles.filter(article => article.id !== id))
            setDeleteArticleId(null)
        } catch (error) {
            console.error('Error deleting article:', error)
        }
    }

    const handleEdit = (article: Article) => {
        setSelectedArticle(article)
        const modal = document.getElementById('article_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const handleView = (article: Article) => {
        setViewArticle(article)
        const viewModal = document.getElementById('view_modal') as HTMLDialogElement | null
        viewModal?.showModal()
    }

    const refreshArticles = () => {
        fetchArticles()
    }

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
            article.author?.name.toLowerCase().includes(filters.searchQuery.toLowerCase())

        const matchesCategory = filters.selectedCategory ? article.category === filters.selectedCategory : true
        const matchesStatus = filters.selectedStatus ? article.status === filters.selectedStatus : true

        return matchesSearch && matchesCategory && matchesStatus
    })

    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage)
    const currentArticles = filteredArticles.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected)
    }

    const uniqueCategories = useMemo(() => {
        const categoryMap = new Map()
        categories.forEach(category => {
            if (!categoryMap.has(category.title)) {
                categoryMap.set(category.title, category)
            }
        })
        return Array.from(categoryMap.values())
    }, [categories])

    if (loading) {
        return <ArticleSkeleton />
    }

    return (
        <section className='min-h-full'>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-[var(--border-color)] p-6 mb-8"
            >
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1"
                >
                    <motion.h1
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                    >
                        Blog
                    </motion.h1>
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className='text-gray-500'
                    >
                        Manage and showcase your blog
                    </motion.p>
                </motion.div>

                <motion.button
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => {
                        setSelectedArticle(null)
                        const modal = document.getElementById('article_modal') as HTMLDialogElement | null
                        modal?.showModal()
                    }}
                >
                    <motion.svg
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </motion.svg>
                    Add Blog
                </motion.button>
            </motion.div>

            <SearchAndFilter
                filters={filters}
                categories={uniqueCategories}
                onFilterChange={setFilters}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentArticles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDelete={() => {
                            setDeleteArticleId(article.id)
                            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
                            deleteModal?.showModal()
                        }}
                    />
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <p className="text-gray-500">No blogs found matching your criteria</p>
                </motion.div>
            )}

            {filteredArticles.length > 0 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            <DeleteModal
                isOpen={!!deleteArticleId}
                onClose={() => setDeleteArticleId(null)}
                onConfirm={() => {
                    if (deleteArticleId) {
                        handleDelete(deleteArticleId)
                    }
                }}
            />

            <ViewModal
                article={viewArticle}
                onClose={() => setViewArticle(null)}
            />

            <ArticleModal
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
                onSuccess={refreshArticles}
            />
        </section>
    )
}