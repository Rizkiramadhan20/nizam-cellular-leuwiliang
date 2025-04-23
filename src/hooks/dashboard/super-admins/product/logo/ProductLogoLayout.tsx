"use client"

import React, { useState, useCallback } from 'react'

import { motion } from 'framer-motion'

import { toast } from 'react-hot-toast'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import { LogoContent } from '@/hooks/dashboard/super-admins/product/logo/types/Logo'

import { useLogoData } from '@/hooks/dashboard/super-admins/product/logo/lib/FetchLogo'

const ContentModal = dynamic(() => import('@/hooks/dashboard/super-admins/product/logo/modal/ContentModal').then(mod => mod.ContentModal), {
    ssr: false
})

const DeleteModal = dynamic(() => import('@/hooks/dashboard/super-admins/product/logo/modal/DeleteModal').then(mod => mod.DeleteModal), {
    ssr: false
})

const ProductLogoSkelaton = dynamic(() => import('@/hooks/dashboard/super-admins/product/logo/ProductLogoSkelaton').then(mod => mod.default), {
    ssr: false
})

const initialFormData: LogoContent = {
    imageUrl: ''
};

export default function HomeLayout() {
    const {
        isLoading,
        contents,
        isSubmitting,
        setIsSubmitting,
        handleImageUpload,
        createContent,
        handleUpdate,
        handleDelete,
    } = useLogoData();

    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [formData, setFormData] = useState<LogoContent>(initialFormData)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)

    const resetForm = useCallback(() => {
        setIsEditing(false)
        setEditingId(null)
        setFormData(initialFormData)
        setSelectedImage(null)
    }, [])

    const closeModal = useCallback((modalId: string) => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null
        modal?.close()
    }, [])

    const handleSubmit = useCallback(async () => {
        try {
            setIsSubmitting(true)
            const imageUrl = selectedImage ? await handleImageUpload(selectedImage) : formData.imageUrl

            if (isEditing && editingId) {
                await handleUpdate(editingId, { ...formData, imageUrl })
                toast.success('Content updated successfully!')
            } else {
                await createContent(formData, imageUrl)
                toast.success('Content created successfully!')
            }

            resetForm()
            closeModal('content_modal')
        } catch (error) {
            console.error('Error submitting content:', error)
            toast.error('Failed to save content. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }, [formData, selectedImage, isEditing, editingId, handleImageUpload, handleUpdate, createContent, resetForm, closeModal, setIsSubmitting])

    const handleDeleteConfirm = useCallback(async () => {
        if (deleteId) {
            try {
                setIsSubmitting(true)
                await handleDelete(deleteId)
                toast.success('Content deleted successfully!')
                closeModal('delete_modal')
            } catch (error) {
                console.error('Error deleting content:', error)
                toast.error('Failed to delete content. Please try again.')
            } finally {
                setIsSubmitting(false)
            }
        }
    }, [deleteId, handleDelete, closeModal, setIsSubmitting])

    if (isLoading) {
        return <ProductLogoSkelaton />
    }

    const openContentModal = () => {
        resetForm()
        const modal = document.getElementById('content_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen'
        >
            <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-white border border-gray-200 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
            >
                <div className="space-y-2">
                    <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent'>
                        Product Logo
                    </h1>
                    <p className='text-gray-600 text-sm sm:text-base'>Manage your Logo page</p>
                </div>

                <button
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg hover:shadow-indigo-100"
                    onClick={openContentModal}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Create Content
                </button>
            </motion.div>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4'>
                {contents.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className='w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group'
                    >
                        <div className="relative h-[150px] sm:h-[180px] w-full bg-gray-50 overflow-hidden">
                            <div className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-500">
                                <Image
                                    src={item.imageUrl}
                                    alt="icons"
                                    width={1200}
                                    height={1200}
                                    priority
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Action Buttons */}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => {
                                        setFormData(item)
                                        setIsEditing(true)
                                        if (item.id) setEditingId(item.id)
                                        const modal = document.getElementById('content_modal') as HTMLDialogElement | null
                                        modal?.showModal()
                                    }}
                                    className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => {
                                        if (item.id) setDeleteId(item.id)
                                        const modal = document.getElementById('delete_modal') as HTMLDialogElement | null
                                        modal?.showModal()
                                    }}
                                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <ContentModal
                formData={formData}
                setFormData={setFormData}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                isEditing={isEditing}
            />

            <DeleteModal
                onDelete={handleDeleteConfirm}
                isSubmitting={isSubmitting}
                onClose={() => closeModal('delete_modal')}
            />
        </motion.section>
    );
}