"use client"

import React, { useState, useEffect, useRef } from 'react'

import { useForm, SubmitHandler } from 'react-hook-form'

import { collection, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import imagekitInstance from '@/utils/imagekit/imagekit'

import { compressImage } from '@/base/helper/ImageCompression'

import { toast } from 'react-hot-toast'

import Image from 'next/image'

import RichTextEditor from '@/base/helper/TextEditor'

import { Project, FormInputs, FormModalProps } from '@/hooks/dashboard/super-admins/product/product/types/Product'

export default function FormModal({
    isOpen,
    onClose,
    isEditing,
    editData,
    editingId,
    projectTypes,
    productIcons,
    user,
    onSuccess
}: FormModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null)

    // State management
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isThumbnailUploading, setIsThumbnailUploading] = useState(false)
    const [isSliderUploading, setIsSliderUploading] = useState(false)
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null)
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
    const [newProject, setNewProject] = useState<Project>({
        title: '',
        description: '',
        imageUrl: '',
        images: [],
        icon: '',
        slug: '',
        typeCategory: '',
        typeTitle: '',
        genreTitle: '',
        status: 'draft',
        content: '',
        stock: 0,
        price: 0,
        author: {
            name: '',
            role: '',
            uid: '',
            photoURL: ''
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
    })

    // Form handling
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        reset,
        getValues
    } = useForm<FormInputs>({
        defaultValues: {
            title: '',
            description: '',
            slug: '',
            typeCategory: '',
            typeTitle: '',
            genreTitle: '',
            status: 'draft',
            content: '',
            stock: 0,
            price: 0,
            icon: '',
        }
    })

    // Utility functions
    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
    }

    const formatNumber = (value: string | number) => {
        const numericValue = String(value).replace(/[^\d]/g, '')
        return new Intl.NumberFormat('id-ID').format(Number(numericValue))
    }

    // Image handling functions
    const uploadImage = async (file: File, type: 'thumbnail' | 'slider' | 'mobile') => {
        try {
            const compressedImage = await compressImage(file)
            const base64 = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(compressedImage)
            })

            const folderSlug = generateSlug(newProject.title)
                .split('-')
                .slice(0, 10)
                .join('-')

            const folderPath = `projects/${folderSlug}/${type === 'thumbnail' ? 'thumbnails' : type === 'slider' ? 'sliders' : 'mobile'}`

            const timestamp = new Date().getTime()
            const fileName = `${timestamp}_${file.name}`

            const uploadResponse = await imagekitInstance.upload({
                file: base64 as string,
                fileName: fileName,
                folder: folderPath,
            })

            return uploadResponse.url
        } catch (error) {
            console.error('Error uploading image:', error)
            throw error
        }
    }

    const handleThumbnailUpload = async (file: File) => {
        setIsThumbnailUploading(true)
        try {
            const imageUrl = await uploadImage(file, 'thumbnail')
            setNewProject(prev => ({ ...prev, imageUrl }))
            setSelectedThumbnail(file)
        } catch (error) {
            console.error('Error uploading thumbnail:', error)
            toast.error('Failed to upload thumbnail')
        } finally {
            setIsThumbnailUploading(false)
        }
    }

    const handleSliderUpload = async (files: FileList) => {
        setIsSliderUploading(true)
        try {
            const uploadPromises = Array.from(files).map(file => uploadImage(file, 'slider'))
            const uploadedUrls = await Promise.all(uploadPromises)

            setNewProject(prev => ({
                ...prev,
                images: [...prev.images, ...uploadedUrls]
            }))
            setSelectedImages(prev => [...prev, ...Array.from(files)])
        } catch (error) {
            console.error('Error uploading slider images:', error)
            toast.error('Failed to upload slider images')
        } finally {
            setIsSliderUploading(false)
        }
    }

    // Form submission
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setIsSubmitting(true)
            const projectData = {
                ...data,
                author: {
                    name: user?.displayName || '',
                    role: user?.role || '',
                    uid: user?.uid || '',
                    photoURL: user?.photoURL || ''
                },
                createdAt: isEditing ? editData?.createdAt : Timestamp.now(),
                updatedAt: Timestamp.now(),
                icon: newProject.icon || '',
            }

            let imageUrl = newProject.imageUrl
            let images = newProject.images

            if (selectedThumbnail) {
                imageUrl = await uploadImage(selectedThumbnail, 'thumbnail')
            }

            if (selectedImages.length > 0) {
                const uploadPromises = selectedImages.map(file => uploadImage(file, 'slider'))
                const uploadedUrls = await Promise.all(uploadPromises)
                images = [...newProject.images, ...uploadedUrls]
            }

            // Tambahkan imageUrl dan images ke projectData
            const finalProjectData = {
                ...projectData,
                imageUrl,
                images
            }

            if (isEditing && editingId) {
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string, editingId), finalProjectData)
                toast.success('Project updated successfully')
            } else {
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string), finalProjectData)
                toast.success('Project created successfully')
            }

            onClose()
            reset()
            setNewProject({
                title: '',
                description: '',
                imageUrl: '',
                images: [],
                icon: '',
                slug: '',
                typeCategory: '',
                typeTitle: '',
                genreTitle: '',
                status: 'draft',
                content: '',
                stock: 0,
                price: 0,
                author: {
                    name: '',
                    role: '',
                    uid: '',
                    photoURL: ''
                },
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            })
            setSelectedImages([])
            setSelectedThumbnail(null)
            await onSuccess()
        } catch (error) {
            console.error('Error submitting project:', error)
            toast.error('Failed to submit project')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Image reordering functions
    const moveImage = (fromIndex: number, toIndex: number) => {
        if (selectedImages.length > 0) {
            const newImages = [...selectedImages]
            const [movedItem] = newImages.splice(fromIndex, 1)
            newImages.splice(toIndex, 0, movedItem)
            setSelectedImages(newImages)
        } else {
            const newImages = [...newProject.images]
            const [movedItem] = newImages.splice(fromIndex, 1)
            newImages.splice(toIndex, 0, movedItem)
            setNewProject(prev => ({ ...prev, images: newImages }))
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            moveImage(index, index - 1)
        } else if (e.key === 'ArrowRight' && index < (selectedImages.length || newProject.images.length) - 1) {
            moveImage(index, index + 1)
        }
    }

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index)
        e.dataTransfer.effectAllowed = 'move'
    }

    const handleDragOver = (e: React.DragEvent, index?: number) => {
        e.preventDefault()
        e.stopPropagation()

        if (index !== undefined && draggedIndex !== null && draggedIndex !== index) {
            e.dataTransfer.dropEffect = 'move'
            moveImage(draggedIndex, index)
            setDraggedIndex(index)
        } else {
            const dropZone = e.currentTarget as HTMLDivElement
            dropZone.classList.add('border-green-500', 'bg-green-50')
        }
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const dropZone = e.currentTarget as HTMLDivElement
        dropZone.classList.remove('border-green-500', 'bg-green-50')
    }

    const handleDrop = async (e: React.DragEvent, type: 'thumbnail' | 'slider') => {
        e.preventDefault()
        e.stopPropagation()

        const dropZone = e.currentTarget as HTMLDivElement
        dropZone.classList.remove('border-green-500', 'bg-green-50')

        setDraggedIndex(null)

        const files = Array.from(e.dataTransfer.files)
        if (files.length === 0) return

        if (type === 'thumbnail') {
            await handleThumbnailUpload(files[0])
        } else {
            const imageFiles = files.filter(file => file.type.startsWith('image/'))
            const remainingSlots = 5 - (selectedImages.length || newProject.images.length)
            const filesToUpload = imageFiles.slice(0, remainingSlots)

            const dataTransfer = new DataTransfer()
            filesToUpload.forEach(file => {
                dataTransfer.items.add(file)
            })
            await handleSliderUpload(dataTransfer.files)
        }
    }

    // Form field handlers
    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'price' | 'stock') => {
        const value = e.target.value
        const numericValue = value.replace(/[^\d]/g, '')

        if (numericValue) {
            const numberValue = parseInt(numericValue, 10)
            if (!isNaN(numberValue)) {
                setValue(field, numberValue)
                e.target.value = formatNumber(numberValue)
            }
        } else {
            setValue(field, 0)
            e.target.value = ''
        }
    }

    // Effects
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title' && value.title) {
                const generatedSlug = generateSlug(value.title)
                setValue('slug', generatedSlug)
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, setValue])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'typeCategory' && value.typeCategory !== getValues('typeCategory')) {
                setValue('genreTitle', '')
                setValue('typeTitle', '')
            } else if (name === 'genreTitle' && value.genreTitle !== getValues('genreTitle')) {
                setValue('typeTitle', '')
            }
        })
        return () => subscription.unsubscribe()
    }, [watch, setValue, getValues])

    useEffect(() => {
        if (isEditing && editData) {
            reset()

            const setValues = async () => {
                try {
                    setValue('typeCategory', editData.typeCategory || '')
                    await new Promise(resolve => setTimeout(resolve, 200))
                    setValue('genreTitle', editData.genreTitle || '')
                    await new Promise(resolve => setTimeout(resolve, 200))
                    setValue('typeTitle', editData.typeTitle || '')

                    setValue('title', editData.title)
                    setValue('description', editData.description)
                    setValue('slug', editData.slug)
                    setValue('status', editData.status)
                    setValue('content', editData.content)
                    setValue('stock', editData.stock)
                    setValue('price', editData.price)
                    setValue('icon', editData.icon || '')

                    setNewProject(editData)
                } catch (error) {
                    console.error('Error setting form values:', error)
                    toast.error('Failed to initialize form')
                }
            }

            setValues()
        }
    }, [isEditing, editData, setValue, reset])

    useEffect(() => {
        if (isOpen && dialogRef.current) {
            if (!dialogRef.current.open) {
                dialogRef.current.showModal()
            }
        } else if (dialogRef.current?.open) {
            dialogRef.current.close()
        }
    }, [isOpen])

    // Modal handling functions
    const handleCloseModal = () => {
        onClose()
    }

    return (
        <dialog ref={dialogRef} id="project_modal" className="modal">
            <div className="modal-box bg-background w-full h-full md:max-w-6xl md:h-auto p-0 overflow-hidden">
                {/* Modal Header */}
                <div className="sticky top-0 bg-background border-b border-[var(--border-color)] px-4 md:px-6 py-4 flex justify-between items-center z-10">
                    <h3 className="font-bold text-xl text-gray-900">
                        {isEditing ? 'Edit Produk' : 'Tambah Produk'}
                    </h3>
                    <button
                        onClick={handleCloseModal}
                        className="btn btn-circle btn-ghost btn-sm hover:bg-gray-100 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-9rem)] sm:max-h-[calc(100vh-12rem)]">
                    <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        {/* Basic Information */}
                        <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Informasi Dasar</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Judul</label>
                                    <input
                                        type="text"
                                        {...register('title')}
                                        className="input input-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        placeholder="Masukkan judul produk"
                                    />
                                    {errors.title && (
                                        <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Slug</label>
                                    <input
                                        type="text"
                                        {...register('slug')}
                                        readOnly
                                        className="input input-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                        placeholder="auto-generated-from-title"
                                    />
                                    {errors.slug && (
                                        <span className="text-red-500 text-sm mt-1">{errors.slug.message}</span>
                                    )}
                                </div>

                                <div className="form-control md:col-span-2">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Deskripsi</label>
                                    <textarea
                                        {...register('description')}
                                        className="textarea textarea-bordered w-full h-24 bg-gray-50/50 border-[var(--border-color)] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                                        placeholder="Masukkan deskripsi produk"
                                    />
                                    {errors.description && (
                                        <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
                                    )}
                                </div>

                                {/* Status Project */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Status Produk</label>
                                    <select
                                        {...register('status')}
                                        className="select select-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all hover:border-purple-300"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="publish">Publish</option>
                                    </select>
                                    {errors.status && (
                                        <span className="text-red-500 text-sm mt-1">{errors.status.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Categories & Details */}
                        <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Kategori & Detail</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Kategori</label>
                                    <select
                                        {...register('typeCategory')}
                                        className="select select-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    >
                                        <option value="">Pilih kategori</option>
                                        {[...new Set(projectTypes.map(type => type.categoryTitle))].map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    {errors.typeCategory && (
                                        <span className="text-red-500 text-sm mt-1">{errors.typeCategory.message}</span>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Genre</label>
                                    <select
                                        {...register('genreTitle')}
                                        className="select select-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    >
                                        <option value="">Select genre</option>
                                        {projectTypes
                                            .filter(type => type.categoryTitle === watch('typeCategory'))
                                            .map(type => type.genreTitle)
                                            .filter((genre, index, self) => self.indexOf(genre) === index)
                                            .map(genre => (
                                                <option key={genre} value={genre}>{genre}</option>
                                            ))}
                                    </select>
                                    {errors.genreTitle && (
                                        <span className="text-red-500 text-sm mt-1">{errors.genreTitle.message}</span>
                                    )}
                                </div>

                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Type</label>
                                    <select
                                        {...register('typeTitle')}
                                        className="select select-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                    >
                                        <option value="">Select type</option>
                                        {projectTypes
                                            .filter(type =>
                                                type.categoryTitle === watch('typeCategory') &&
                                                type.genreTitle === watch('genreTitle')
                                            )
                                            .map(type => (
                                                <option key={type.id} value={type.title}>{type.title}</option>
                                            ))}
                                    </select>
                                    {errors.typeTitle && (
                                        <span className="text-red-500 text-sm mt-1">{errors.typeTitle.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Stock & Price */}
                        <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-blue-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Stok & Harga</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Stock Input */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Stok</label>
                                    <input
                                        type="text"
                                        {...register('stock', {
                                            valueAsNumber: true,
                                            onChange: (e) => handleNumberChange(e, 'stock')
                                        })}
                                        className="input input-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                        placeholder="Masukkan jumlah stok"
                                        defaultValue={watch('stock') ? formatNumber(watch('stock').toString()) : ''}
                                    />
                                    {errors.stock && (
                                        <span className="text-red-500 text-sm mt-1">{errors.stock.message}</span>
                                    )}
                                </div>

                                {/* Price Input */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Harga</label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rp</span>
                                        <input
                                            type="text"
                                            {...register('price', {
                                                setValueAs: (value) => {
                                                    if (!value) return 0;
                                                    const numericValue = String(value).replace(/[^\d]/g, '');
                                                    return parseInt(numericValue, 10) || 0;
                                                },
                                                onChange: (e) => handleNumberChange(e, 'price'),
                                                validate: (value) => {
                                                    const numericValue = String(value).replace(/[^\d]/g, '');
                                                    const numberValue = parseInt(numericValue, 10);
                                                    return (!isNaN(numberValue) && numberValue > 0) || 'Please enter a valid price';
                                                }
                                            })}
                                            className="input input-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all pl-10"
                                            placeholder="Masukkan harga"
                                            defaultValue={watch('price') ? formatNumber(watch('price')) : ''}
                                        />
                                    </div>
                                    {errors.price && (
                                        <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Images & Icon */}
                        <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-green-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Gambar & Ikon</h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Thumbnail Upload */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Thumbnail</label>
                                    <div className="relative">
                                        {selectedThumbnail || newProject.imageUrl ? (
                                            <div className="relative border rounded-xl overflow-hidden group">
                                                <Image
                                                    src={selectedThumbnail ? URL.createObjectURL(selectedThumbnail) : newProject.imageUrl}
                                                    alt="Thumbnail preview"
                                                    width={400}
                                                    height={300}
                                                    className="w-full h-[200px] object-cover"
                                                    style={{ width: 'auto', height: '200px' }}
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    <div
                                                        className="relative cursor-pointer"
                                                        onDragOver={handleDragOver}
                                                        onDragLeave={handleDragLeave}
                                                        onDrop={(e) => handleDrop(e, 'thumbnail')}
                                                    >
                                                        <input
                                                            id="thumbnail-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => e.target.files?.[0] && handleThumbnailUpload(e.target.files[0])}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        />
                                                        <button className="btn btn-sm btn-circle btn-ghost text-white">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setSelectedThumbnail(null);
                                                            setNewProject(prev => ({ ...prev, imageUrl: '' }));
                                                        }}
                                                        className="btn btn-sm btn-circle btn-ghost text-white"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-green-500 transition-all"
                                                onDragOver={handleDragOver}
                                                onDragLeave={handleDragLeave}
                                                onDrop={(e) => handleDrop(e, 'thumbnail')}
                                            >
                                                <input
                                                    id="thumbnail-upload"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => e.target.files?.[0] && handleThumbnailUpload(e.target.files[0])}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div className="flex flex-col items-center justify-center h-[200px] p-4">
                                                    {isThumbnailUploading ? (
                                                        <div className="flex flex-col items-center justify-center">
                                                            <span className="loading loading-spinner loading-md text-green-600"></span>
                                                            <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                            <p className="text-sm text-gray-500">Add Thumbnail</p>
                                                            <p className="text-xs text-gray-400 mt-1">Drag or click to upload</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Slider Images Upload */}
                                <div className="form-control">
                                    <label className="text-sm font-medium text-gray-700 mb-1.5">Gambar Slider</label>
                                    <div className="relative">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                {selectedImages.length > 0 ?
                                                    selectedImages.map((file, index) => (
                                                        <div
                                                            key={`new-${index}`}
                                                            className="relative border rounded-xl overflow-hidden group cursor-move"
                                                            draggable
                                                            onDragStart={(e) => handleDragStart(e, index)}
                                                            onDragOver={(e) => handleDragOver(e, index)}
                                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                                            tabIndex={0}
                                                            role="button"
                                                            aria-label={`Slider image ${index + 1}. Use arrow keys to reorder.`}
                                                        >
                                                            <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                                                                {index + 1}
                                                            </div>
                                                            <Image
                                                                src={URL.createObjectURL(file)}
                                                                alt={`Slider image ${index + 1}`}
                                                                width={200}
                                                                height={150}
                                                                className="w-full h-[150px] object-cover"
                                                                style={{ width: 'auto', height: '150px' }}
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    {index > 0 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => moveImage(index, index - 1)}
                                                                            className="btn btn-sm btn-circle btn-ghost text-white"
                                                                            title="Move left"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setSelectedImages(prev => prev.filter((_, i) => i !== index));
                                                                        }}
                                                                        className="btn btn-sm btn-circle btn-ghost text-white"
                                                                        title="Delete image"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </button>
                                                                    {index < selectedImages.length - 1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => moveImage(index, index + 1)}
                                                                            className="btn btn-sm btn-circle btn-ghost text-white"
                                                                            title="Move right"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                    :
                                                    newProject.images.map((url, index) => (
                                                        <div
                                                            key={`existing-${index}`}
                                                            className="relative border rounded-xl overflow-hidden group cursor-move"
                                                            draggable
                                                            onDragStart={(e) => handleDragStart(e, index)}
                                                            onDragOver={(e) => handleDragOver(e, index)}
                                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                                            tabIndex={0}
                                                            role="button"
                                                            aria-label={`Gambar slider ${index + 1}. Gunakan tombol panah untuk mengurutkan.`}
                                                        >
                                                            <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                                                                {index + 1}
                                                            </div>
                                                            <Image
                                                                src={url}
                                                                alt={`Gambar slider ${index + 1}`}
                                                                width={200}
                                                                height={150}
                                                                className="w-full h-[150px] object-cover"
                                                                style={{ width: 'auto', height: '150px' }}
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                                <div className="flex items-center gap-2">
                                                                    {index > 0 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => moveImage(index, index - 1)}
                                                                            className="btn btn-sm btn-circle btn-ghost text-white"
                                                                            title="Move left"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setNewProject(prev => ({
                                                                                ...prev,
                                                                                images: prev.images.filter((_, i) => i !== index)
                                                                            }));
                                                                        }}
                                                                        className="btn btn-sm btn-circle btn-ghost text-white"
                                                                        title="Delete image"
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                        </svg>
                                                                    </button>
                                                                    {index < newProject.images.length - 1 && (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => moveImage(index, index + 1)}
                                                                            className="btn btn-sm btn-circle btn-ghost text-white"
                                                                            title="Move right"
                                                                        >
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                                            </svg>
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }

                                                {/* Add Image Box */}
                                                {(selectedImages.length || newProject.images.length) < 5 && (
                                                    <div
                                                        className="border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-green-500 transition-all"
                                                        onDragOver={handleDragOver}
                                                        onDragLeave={handleDragLeave}
                                                        onDrop={(e) => handleDrop(e, 'slider')}
                                                    >
                                                        <input
                                                            id="slider-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={(e) => e.target.files && handleSliderUpload(e.target.files)}
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        />
                                                        <div className="flex flex-col items-center justify-center h-[150px] p-4">
                                                            {isSliderUploading ? (
                                                                <div className="flex flex-col items-center justify-center">
                                                                    <span className="loading loading-spinner loading-md text-green-600"></span>
                                                                    <p className="mt-2 text-sm text-gray-500">Memuat...</p>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                    <p className="text-sm text-gray-500">Tambah Gambar</p>
                                                                    <p className="text-xs text-gray-400 mt-1">Seret atau klik untuk mengunggah</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Icon Selection */}
                        <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow mt-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-purple-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Ikon Produk</h4>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {productIcons.map((icon) => (
                                    <div
                                        key={icon.id}
                                        className={`relative aspect-square rounded-xl overflow-hidden bg-gray-50/50 border-2 cursor-pointer transition-all ${newProject.icon === icon.imageUrl
                                            ? 'border-purple-500 ring-2 ring-purple-500'
                                            : 'border-[var(--border-color)] hover:border-purple-500'
                                            }`}
                                        onClick={() => {
                                            setNewProject(prev => ({ ...prev, icon: icon.imageUrl }));
                                            setValue('icon', icon.imageUrl);
                                        }}
                                    >
                                        <Image
                                            src={icon.imageUrl}
                                            alt="Icon"
                                            fill
                                            className="object-contain p-2"
                                        />
                                        {newProject.icon === icon.imageUrl && (
                                            <div className="absolute inset-0 bg-purple-500/10 flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Content & License */}
                        <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Konten</h4>
                            </div>

                            <div className="form-control">
                                <RichTextEditor
                                    value={watch('content')}
                                    onChange={(value) => setValue('content', value)}
                                    className="min-h-[200px] bg-gray-50/50 rounded-lg border border-gray-200 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all"
                                />
                                {errors.content && (
                                    <span className="text-red-500 text-sm mt-1">{errors.content.message}</span>
                                )}
                            </div>
                        </div>

                        {/* Author Information */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <h4 className="font-semibold text-lg text-gray-900">Informasi Penulis</h4>
                            </div>

                            <div className="grid md:grid-cols-[200px,1fr] gap-8 items-start">
                                {/* Author Image */}
                                <div className="flex flex-col items-center space-y-3">
                                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 shadow-inner">
                                        <Image
                                            src={user?.photoURL || '/placeholder-avatar.png'}
                                            alt={user?.displayName || 'Author'}
                                            fill
                                            className="object-cover transition-transform hover:scale-105 duration-300"
                                        />
                                    </div>
                                    <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                                        {user?.role || 'No role'}
                                    </span>
                                </div>

                                {/* Author Details */}
                                <div className="space-y-6">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={user?.displayName || 'No name available'}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 cursor-not-allowed focus:ring-0"
                                                disabled
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-gray-500">Informasi ini diambil dari profil Anda dan tidak dapat diubah di sini.</p>
                                    </div>

                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-2">Level Akses</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={user?.role || 'No role available'}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-500 cursor-not-allowed focus:ring-0"
                                                disabled
                                            />
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-background border-t border-[var(--border-color)] px-4 md:px-6 py-4 flex justify-end gap-3 z-10">
                    <button
                        type="button"
                        onClick={handleCloseModal}
                        className="btn btn-ghost hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                        disabled={isSubmitting}
                    >
                        Batal
                    </button>
                    <button
                        type="submit"
                        form="project-form"
                        className="btn bg-blue-600 hover:bg-blue-700 text-white border-none relative"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <div className="btn flex items-center gap-2 bg-primary">
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                <span>Memuat...</span>
                            </div>
                        ) : isEditing ? 'Update Produk' : 'Simpan Produk'}
                    </button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

