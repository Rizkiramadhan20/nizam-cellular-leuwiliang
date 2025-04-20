"use client"

import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { Timestamp } from 'firebase/firestore';

import { format } from 'date-fns';

import { useProductGenreData } from '@/hooks/dashboard/super-admins/product/genre/lib/FetchProductGenre';

import { ContentModal } from '@/hooks/dashboard/super-admins/product/genre/modal/ContentModal';

import { DeleteModal } from '@/hooks/dashboard/super-admins/product/genre/modal/DeleteModal';

import FeaturedSkelaton from '@/hooks/dashboard/super-admins/product/genre/ProductGenreSkelaton';

import { ProductGenreFormData, initialFormData } from '@/hooks/dashboard/super-admins/product/genre/types/ProductGenre';

import { containerVariants, itemVariants } from '@/hooks/dashboard/super-admins/product/genre/animation/animation';

import { Pagination } from '@/base/helper/Pagination';

export default function ProductGenreLayout() {
    const {
        isLoading,
        contents,
        categories,
        isSubmitting,
        createContent,
        updateContent,
        deleteContent,
        currentPage,
        totalItems,
        itemsPerPage,
        selectedCategoryTitle,
        setSelectedCategoryTitle,
        searchQuery,
        setSearchQuery,
        handlePageChange,
    } = useProductGenreData();

    const [formData, setFormData] = useState<ProductGenreFormData>(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleSubmit = async () => {
        const success = isEditing && editingId
            ? await updateContent(editingId, formData)
            : await createContent(formData);

        if (success) {
            resetForm();
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData(initialFormData);
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
        modal?.close();
    };

    const handleDelete = async () => {
        if (deleteId) {
            await deleteContent(deleteId);
            setDeleteId(null);
            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
            deleteModal?.close();
        }
    };

    const openModal = () => {
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
        modal?.showModal();
    };

    const formatDate = (dateOrTimestamp: Date | Timestamp | undefined) => {
        if (!dateOrTimestamp) return 'N/A';
        const date = dateOrTimestamp instanceof Timestamp ? dateOrTimestamp.toDate() : dateOrTimestamp;
        return format(date, 'MMM d, yyyy');
    };

    if (isLoading) {
        return <FeaturedSkelaton />
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen'
        >
            {/* Header Section */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-background rounded-2xl border border-[var(--border-color)] p-4 sm:p-6 mb-5"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Product Genre
                        </h1>
                        <p className='text-gray-500'>
                            Manage and organize your product genre
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Genre
                    </motion.button>
                </div>
            </motion.div>

            {/* Category Filter and Search */}
            <div className="bg-background rounded-xl border border-[var(--border-color)] p-6 mb-5">
                <div className="flex flex-col sm:flex-row gap-6 w-full">
                    <div className="flex-1">
                        <div className="relative">
                            <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Category
                            </label>
                            <div className="relative">
                                <select
                                    id="categoryFilter"
                                    value={selectedCategoryTitle}
                                    onChange={(e) => setSelectedCategoryTitle(e.target.value)}
                                    className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.title}>
                                            {category.title}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1">
                        <div className="relative">
                            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search by title or category..."
                                    className="block w-full pl-10 pr-10 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery("")}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Display */}
            <motion.div
                className="bg-background rounded-xl border border-[var(--border-color)] overflow-hidden"
                variants={containerVariants}
                initial="hidden"
                animate="show"
            >
                <div className="overflow-x-auto relative">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {contents.map((content, index) => (
                                <motion.tr
                                    key={content.id}
                                    variants={itemVariants}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                    whileHover={{ backgroundColor: "#f8fafc" }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {(currentPage * itemsPerPage) + index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 capitalize">{content.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                                            {content.categoryTitle}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                        {formatDate(content.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => {
                                                    setIsEditing(true);
                                                    setEditingId(content.id || null);
                                                    setFormData({
                                                        title: content.title,
                                                        categoryTitle: content.categoryTitle
                                                    });
                                                    openModal();
                                                }}
                                                className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-all duration-200"
                                                title="Edit"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setDeleteId(content.id || null);
                                                    const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                                                    deleteModal?.showModal();
                                                }}
                                                className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-all duration-200"
                                                title="Delete"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(totalItems / itemsPerPage)}
                onPageChange={(selectedItem) => handlePageChange(selectedItem.selected)}
            />

            {/* Content Modal */}
            <ContentModal
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onClose={resetForm}
                categories={categories}
            />

            {/* Delete Modal */}
            <DeleteModal
                onConfirm={handleDelete}
                onClose={() => {
                    setDeleteId(null);
                    const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                    deleteModal?.close();
                }}
            />
        </motion.section>
    );
}