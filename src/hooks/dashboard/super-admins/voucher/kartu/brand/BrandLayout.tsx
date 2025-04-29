"use client"

import React, { useState, useEffect } from 'react';

import { Timestamp } from 'firebase/firestore';

import { format } from 'date-fns';

import { useBrandPerdanaData } from '@/hooks/dashboard/super-admins/voucher/kartu/brand/lib/FetchBrandPerdana';

import FeaturedSkelaton from '@/hooks/dashboard/super-admins/voucher/kartu/brand/BrandKartuSkelaton';

import { BrandPerdanaContentFormData, initialFormData } from '@/hooks/dashboard/super-admins/voucher/kartu/brand/types/BrandPerdana';

import { Pagination } from '@/base/helper/Pagination';

import dynamic from 'next/dynamic';

const ContentModal = dynamic(
    () => import('@/hooks/dashboard/super-admins/voucher/kartu/brand/modal/ContentModal').then(mod => mod.ContentModal),
    { ssr: false, loading: () => <div className="p-4">Loading modal...</div> }
);

const DeleteModal = dynamic(
    () => import('@/hooks/dashboard/super-admins/voucher/kartu/brand/modal/DeleteModal').then(mod => mod.DeleteModal),
    { ssr: false, loading: () => <div className="p-4">Loading modal...</div> }
);

export default function BrendPerdanaLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        createContent,
        updateContent,
        deleteContent,
        currentPage,
        totalItems,
        itemsPerPage,
        handlePageChange,
    } = useBrandPerdanaData();

    const [formData, setFormData] = useState<BrandPerdanaContentFormData>(initialFormData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);

    // Set initial loading to false when data is loaded
    useEffect(() => {
        if (!isLoading) {
            setIsInitialLoading(false);
        }
    }, [isLoading]);

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
            try {
                setIsDeleting(true);
                await deleteContent(deleteId);
                setDeleteId(null);
                const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                deleteModal?.close();
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const openModal = () => {
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null;
        modal?.showModal();
    };

    const handlePageChangeWrapper = (selectedItem: { selected: number }) => {
        handlePageChange(selectedItem.selected);
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
        <section className='min-h-screen'>
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Merk Perdana
                        </h1>
                        <p className='text-gray-500'>
                            Kelola dan atur Merk Perdana Anda
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            resetForm()
                            openModal()
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
                        Tambahkan Merk Perdana
                    </button>
                </div>
            </div>

            {/* Content Display */}
            {isLoading ? (
                <FeaturedSkelaton />
            ) : (
                <div className="bg-background rounded-xl border border-[var(--border-color)] overflow-hidden">
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
                                        Dibuat Pada
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {contents.map((content, index) => (
                                    <tr
                                        key={content.id}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {(currentPage * itemsPerPage) + index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900 capitalize">{content.title}</div>
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
                                                        setFormData({ title: content.title });
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
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {!isLoading && totalItems > 0 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChangeWrapper}
                    />
                </div>
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
                isDeleting={isDeleting}
            />
        </section>
    );
}