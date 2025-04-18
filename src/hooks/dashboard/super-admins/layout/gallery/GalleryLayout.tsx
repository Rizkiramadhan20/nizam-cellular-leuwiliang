"use client"

import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';

import { useGalleryData } from '@/hooks/dashboard/super-admins/layout/gallery/lib/FetchGallery';

import { ContentModal } from '@/hooks/dashboard/super-admins/layout/gallery/modal/ContentModal';

import { DeleteModal } from '@/hooks/dashboard/super-admins/layout/gallery/modal/DeleteModal';

import FeaturedSkelaton from '@/hooks/dashboard/super-admins/layout/gallery/GallerySkelaton';

import { GalleryFormData, initialFormData } from '@/hooks/dashboard/super-admins/layout/gallery/types/Gallery';

import Image from 'next/image';

import { containerVariants, itemVariants, headerAnimations } from '@/hooks/dashboard/super-admins/layout/gallery/animation/animation';

import { Pagination } from '@/base/helper/Pagination';

export default function ServiceLayout() {
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
    } = useGalleryData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [formData, setFormData] = useState<GalleryFormData>(initialFormData);
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

    useEffect(() => {
        return () => {
            if (selectedImage) {
                URL.revokeObjectURL(URL.createObjectURL(selectedImage));
            }
        };
    }, [selectedImage]);

    const handleSubmit = async () => {
        const success = isEditing && editingId
            ? await updateContent(editingId, formData, selectedImage)
            : await createContent(formData, selectedImage);

        if (success) {
            resetForm();
        }
    };

    const resetForm = () => {
        setIsEditing(false);
        setEditingId(null);
        setFormData(initialFormData);
        setSelectedImage(null);
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
                            Gallery
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className='text-gray-500'
                        >
                            Manage and organize your gallery
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
                        Add Gallery
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Featured Content Display */}
            {isLoading ? (
                <FeaturedSkelaton />
            ) : (
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    {contents.map((content, index) => (
                        <motion.div
                            key={content.id}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.03,
                                y: -5,
                                transition: {
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 10
                                }
                            }}
                            className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                        >
                            <motion.div
                                className="relative aspect-[4/3] w-full overflow-hidden"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src={content.imageUrl}
                                    alt={content.title}
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 * index, duration: 0.5 }}
                                className="p-3 sm:p-5 space-y-2 sm:space-y-3"
                            >
                                <motion.h2
                                    className="text-lg sm:text-xl font-semibold text-gray-800 line-clamp-1"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 * index, duration: 0.5 }}
                                >
                                    {content.title}
                                </motion.h2>
                            </motion.div>
                        </motion.div>
                    ))}
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
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
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