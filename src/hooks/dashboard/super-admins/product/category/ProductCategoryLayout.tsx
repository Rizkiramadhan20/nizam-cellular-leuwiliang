"use client"

import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { Timestamp } from 'firebase/firestore';

import { format } from 'date-fns';

import { useProductCategoryData } from '@/hooks/dashboard/super-admins/product/category/lib/FetchProductCategory';

import { ContentModal } from '@/hooks/dashboard/super-admins/product/category/modal/ContentModal';

import { DeleteModal } from '@/hooks/dashboard/super-admins/product/category/modal/DeleteModal';

import FeaturedSkelaton from '@/hooks/dashboard/super-admins/product/category/ProductCategorySkelaton';

import { ProductCategoryFormData, initialFormData } from '@/hooks/dashboard/super-admins/product/category/types/ProductCategory';

import { containerVariants, itemVariants, headerAnimations } from '@/hooks/dashboard/super-admins/product/category/animation/animation';

import { Pagination } from '@/base/helper/Pagination';

export default function ProductCategoryLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        createContent,
        updateContent,
        deleteContent,
        fetchContents,
        currentPage,
        totalItems,
        itemsPerPage,
    } = useProductCategoryData();

    const [formData, setFormData] = useState<ProductCategoryFormData>(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Fetch data on mount
    useEffect(() => {
        const loadInitialData = async () => {
            setIsInitialLoading(true);
            await fetchContents(0);
            setIsInitialLoading(false);
        };

        loadInitialData();
    }, [fetchContents]);

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

    const handlePageChange = (selectedItem: { selected: number }) => {
        fetchContents(selectedItem.selected);
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const formatDate = (dateOrTimestamp: Date | Timestamp | undefined) => {
        if (!dateOrTimestamp) return 'N/A';
        const date = dateOrTimestamp instanceof Timestamp ? dateOrTimestamp.toDate() : dateOrTimestamp;
        return format(date, 'MMM d, yyyy');
    };

    if (isInitialLoading) {
        return <FeaturedSkelaton />;
    }

    return (
        <motion.section
            {...headerAnimations.section}
            className='min-h-screen'
        >
            {/* Header Section */}
            <motion.div
                {...headerAnimations.header}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-8"
            >
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="space-y-1"
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                        >
                            Product Categories
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className='text-gray-500'
                        >
                            Manage and organize your product categories
                        </motion.p>
                    </motion.div>

                    <motion.button
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                            resetForm()
                            openModal()
                        }}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg"
                    >
                        <motion.svg
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.3 }}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </motion.svg>
                        Add Category
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Content Display */}
            {isLoading ? (
                <FeaturedSkelaton />
            ) : (
                <motion.div
                    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr className='bg-gray-50 text-gray-600'>
                                    <th className="px-4 py-3 text-left">No</th>
                                    <th className="px-4 py-3 text-left">Title</th>
                                    <th className="px-4 py-3 text-left">Created At</th>
                                    <th className="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contents.map((content, index) => (
                                    <motion.tr
                                        key={content.id}
                                        variants={itemVariants}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                        whileHover={{
                                            backgroundColor: "#f8fafc",
                                            transition: { duration: 0.2 }
                                        }}
                                    >
                                        <td className="px-4 py-3 text-gray-600">{index + 1}</td>
                                        <td className="px-4 py-3 text-gray-700 font-medium capitalize">
                                            {content.title}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {formatDate(content.createdAt)}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    onClick={() => {
                                                        setIsEditing(true);
                                                        setEditingId(content.id || null);
                                                        setFormData({ title: content.title });
                                                        openModal();
                                                    }}
                                                    className="p-1.5 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors"
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
                                                    className="p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-full transition-colors"
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
            )}

            {/* Pagination */}
            {!isLoading && totalItems > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="mt-8"
                >
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </motion.div>
            )}

            {/* Content Modal */}
            <ContentModal
                isEditing={isEditing}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onClose={resetForm}
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