"use client"

import React, { useState, useEffect, useCallback } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import { toast } from 'react-hot-toast'

import dynamic from 'next/dynamic'

import Image from 'next/image'

import { AboutContent } from '@/hooks/dashboard/super-admins/pages/about/types/About'

const ContentModal = dynamic(() => import('@/hooks/dashboard/super-admins/pages/about/modal/ContentModal').then(mod => mod.ContentModal), {
  ssr: false
})

const DeleteModal = dynamic(() => import('@/hooks/dashboard/super-admins/pages/about/modal/DeleteModal').then(mod => mod.DeleteModal), {
  ssr: false
})

const HomeSkelaton = dynamic(() => import('@/hooks/dashboard/super-admins/pages/about/AboutSkelaton').then(mod => mod.default), {
  ssr: false
})

import { useHomeData } from '@/hooks/dashboard/super-admins/pages/about/lib/FetchAbout'

const initialFormData: AboutContent = {
  title: '',
  description: [],
  imageUrl: [],
  count: []
};

export default function HomeLayout() {
  const {
    isLoading,
    contents,
    isSubmitting,
    setIsSubmitting,
    createContent,
    handleUpdate,
    handleDelete,
  } = useHomeData();

  const [formData, setFormData] = useState<AboutContent>(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [deleteId, setDeleteId] = useState('');

  const resetForm = useCallback(() => {
    setIsEditing(false);
    setEditingId('');
    setFormData(initialFormData);
  }, []);

  const closeContentModal = useCallback(() => {
    const modal = document.getElementById('content_modal');
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  }, []);

  const closeDeleteModal = useCallback(() => {
    const modal = document.getElementById('delete_modal');
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);

      if (isEditing && editingId) {
        await handleUpdate(editingId, formData);
        toast.success('Content updated successfully!');
      } else {
        await createContent(formData, formData.imageUrl);
        toast.success('Content created successfully!');
      }

      // Clean up blob URLs after successful submission
      formData.imageUrl.forEach(img => {
        if (img.images.startsWith('blob:')) {
          URL.revokeObjectURL(img.images);
        }
      });

      // Reset form and close modal
      resetForm();
      closeContentModal();
    } catch (error) {
      toast.error(`Failed to save content: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, isEditing, editingId, handleUpdate, createContent, resetForm, closeContentModal, setIsSubmitting]);

  const handleDeleteConfirm = useCallback(async () => {
    if (deleteId) {
      await handleDelete(deleteId);
      closeDeleteModal();
    }
  }, [deleteId, handleDelete, closeDeleteModal]);

  // Clean up blob URLs when component unmounts
  useEffect(() => {
    return () => {
      formData.imageUrl.forEach(img => {
        if (img.images.startsWith('blob:')) {
          URL.revokeObjectURL(img.images);
        }
      });
    };
  }, [formData.imageUrl]);

  if (isLoading) {
    return <HomeSkelaton />;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 bg-background border border-[var(--border-color)] p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className='space-y-2'>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">About Content</h1>
          <p className='text-gray-600 text-sm sm:text-base'>Manage your about page content</p>
        </div>

        {contents.length === 0 && (
          <button
            onClick={() => {
              const modal = document.getElementById('content_modal');
              if (modal instanceof HTMLDialogElement) {
                modal.showModal();
              }
            }}
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-sm hover:shadow-md active:scale-95"
          >
            Add New Content
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {contents.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1],
              delay: index * 0.1
            }}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col h-full">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="relative w-full h-[300px] overflow-hidden"
              >
                <div className="flex gap-2 overflow-x-auto h-full">
                  {item.imageUrl.map((img, imgIndex) => (
                    <div key={imgIndex} className="relative min-w-[300px] h-full">
                      <Image
                        src={img.images}
                        alt={`About image ${imgIndex + 1}`}
                        width={1200}
                        height={800}
                        priority
                        className="w-full h-full object-cover rounded-t-2xl"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="p-6 flex-grow space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <div className="space-y-3">
                  {item.description.map((desc, idx) => (
                    <p key={idx} className="text-gray-600 text-sm sm:text-base leading-relaxed">{desc.description}</p>
                  ))}
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8'>
                  {
                    item.count.map((item, index) => {
                      return (
                        <div key={index} className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-300">
                          <h3 className="text-indigo-600 text-sm font-medium mb-2">{item.title}</h3>
                          <span className="text-2xl font-bold text-gray-900">+{item.number}</span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              {/* Actions */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setDeleteId(item.id || '');
                    const modal = document.getElementById('delete_modal');
                    if (modal instanceof HTMLDialogElement) {
                      modal.showModal();
                    }
                  }}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
                <button
                  onClick={() => {
                    setFormData(item);
                    setIsEditing(true);
                    setEditingId(item.id || '');
                    const modal = document.getElementById('content_modal');
                    if (modal instanceof HTMLDialogElement) {
                      modal.showModal();
                    }
                  }}
                  className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <ContentModal
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isEditing={isEditing}
      />

      <DeleteModal
        onDelete={handleDeleteConfirm}
        isSubmitting={isSubmitting}
        onClose={closeDeleteModal}
      />
    </motion.section>
  );
}