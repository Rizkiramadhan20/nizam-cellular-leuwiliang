"use client"

import React, { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, Timestamp, query, orderBy } from 'firebase/firestore'
import { db } from '@/utils/firebase/firebase'
import imagekitInstance from '@/utils/imagekit/imagekit'
import { compressImage } from '@/base/helper/ImageCompression'
import { toast } from 'react-hot-toast'
import Image from 'next/image'
import ProductSkelaton from "@/hooks/dashboard/super-admins/product/product/ProductSkelaton"
import RichTextEditor from '@/base/helper/TextEditor'
import { useAuth } from '@/utils/context/AuthContext'
import { useRouter } from 'next/navigation'
import { Project, ProjectType, FormInputs } from '@/hooks/dashboard/super-admins/product/product/types/Product'
import { Pagination } from '@/base/helper/Pagination'
import { useForm, SubmitHandler } from 'react-hook-form'
import ViewModal from './components/view/ViewModal';

export default function ProjectLayout() {
    const { user, hasRole } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!hasRole(['super-admins', 'admins'])) {
            toast.error('You do not have permission to access this page')
            router.push('/')
        }
    }, [hasRole, router])

    const [projects, setProjects] = useState<Project[]>([])
    const [projectTypes, setProjectTypes] = useState<ProjectType[]>([])
    const [selectedProjectTypes, setSelectedProjectTypes] = useState<ProjectType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [availableCategories, setAvailableCategories] = useState<string[]>([])
    const [availableGenres, setAvailableGenres] = useState<string[]>([])
    const [availableTypes, setAvailableTypes] = useState<string[]>([])
    const [newProject, setNewProject] = useState<Project>({
        title: '',
        description: '',
        imageUrl: '',
        images: [],
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
    const [selectedImages, setSelectedImages] = useState<File[]>([])
    const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [isThumbnailUploading, setIsThumbnailUploading] = useState(false)
    const [isSliderUploading, setIsSliderUploading] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [viewProject, setViewProject] = useState<Project | null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const [projectsPerPage] = useState(8)

    // Add this function after the fetchProjects function
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = !selectedCategory || project.typeCategory === selectedCategory
        const matchesGenre = !selectedGenre || project.genreTitle === selectedGenre
        const matchesType = !selectedType || project.typeTitle === selectedType

        return matchesSearch && matchesCategory && matchesGenre && matchesType
    })

    // Update the paginatedProjects to use filteredProjects instead of projects
    const paginatedProjects = filteredProjects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    )

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected)
        window.scrollTo(0, 0)
    }

    // Fetch projects and types
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await Promise.all([
                    fetchProjects(),
                    fetchProjectTypes()
                ])
            } catch (error) {
                console.error('Error fetching data:', error)
                toast.error('Failed to load data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    const fetchProjects = async () => {
        try {
            setIsLoading(true)
            const q = query(
                collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string),
                orderBy('createdAt', 'desc')
            )
            const querySnapshot = await getDocs(q)
            const projectsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Project[]
            setProjects(projectsData)

            // Extract unique categories, genres, and types from projects
            const categories = [...new Set(projectsData.map(project => project.typeCategory).filter(Boolean))]
            const genres = [...new Set(projectsData.map(project => project.genreTitle).filter(Boolean))]
            const types = [...new Set(projectsData.map(project => project.typeTitle).filter(Boolean))]

            setAvailableCategories(categories)
            setAvailableGenres(genres)
            setAvailableTypes(types)
        } catch (error) {
            console.error('Error fetching projects:', error)
            toast.error('Failed to fetch projects')
        } finally {
            setIsLoading(false)
        }
    }

    const fetchProjectTypes = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_TYPE as string))
            const typesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title,
                categoryTitle: doc.data().categoryTitle,
                genreTitle: doc.data().genreTitle,
                createdAt: doc.data().createdAt
            })) as ProjectType[]
            setProjectTypes(typesData)
        } catch (error) {
            console.error('Error fetching project types:', error)
            toast.error('Failed to fetch project types')
        }
    }

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
    }

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
        }
    })

    // Add useEffect to watch title changes and update slug
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title' && value.title) {
                const generatedSlug = generateSlug(value.title);
                setValue('slug', generatedSlug);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, setValue]);

    // Add state to track if we're in edit mode
    const [isEditMode, setIsEditMode] = useState(false)
    const [editData, setEditData] = useState<Project | null>(null)

    // Handle form initialization when in edit mode
    useEffect(() => {
        if (isEditMode && editData) {
            // Reset form first
            reset()

            // Set values in the correct order with delays
            const setValues = async () => {
                try {
                    // First set the category
                    setValue('typeCategory', editData.typeCategory || '')

                    // Wait for category to be set
                    await new Promise(resolve => setTimeout(resolve, 200))

                    // Then set genre
                    setValue('genreTitle', editData.genreTitle || '')

                    // Wait for genre to be set
                    await new Promise(resolve => setTimeout(resolve, 200))

                    // Finally set type
                    setValue('typeTitle', editData.typeTitle || '')

                    // Set other values
                    setValue('title', editData.title || '')
                    setValue('description', editData.description || '')
                    setValue('slug', editData.slug || '')
                    setValue('status', editData.status || 'draft')
                    setValue('content', editData.content || '')
                    setValue('stock', editData.stock || 0)
                    setValue('price', editData.price || 0)
                } catch (error) {
                    console.error('Error setting form values:', error)
                }
            }

            setValues()
        }
    }, [isEditMode, editData, setValue, reset])

    // Handle category changes
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

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setIsSubmitting(true)

            // Handle image uploads first
            let imageUrl = newProject.imageUrl;
            let images = newProject.images;

            // Upload thumbnail if new one is selected
            if (selectedThumbnail) {
                imageUrl = await uploadImage(selectedThumbnail, 'thumbnail');
            }

            // Upload new slider images if any
            if (selectedImages.length > 0) {
                const uploadPromises = selectedImages.map(file => uploadImage(file, 'slider'));
                const uploadedUrls = await Promise.all(uploadPromises);
                images = [...newProject.images, ...uploadedUrls];
            }

            // Ensure all required fields have valid values
            const projectData: Project = {
                ...data,
                imageUrl: imageUrl || '',
                images: images || [],
                slug: generateSlug(data.title),
                createdAt: isEditing && newProject.createdAt ? newProject.createdAt : Timestamp.now(),
                updatedAt: Timestamp.now(),
                author: {
                    name: user?.displayName || '',
                    role: user?.role || '',
                    uid: user?.uid || '',
                    photoURL: user?.photoURL || ''
                }
            }

            if (isEditing && editingId) {
                await updateDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string, editingId), projectData)
                toast.success('Project updated successfully')
            } else {
                await addDoc(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string), projectData)
                toast.success('Project created successfully')
            }

            // Close modal first
            const modal = document.getElementById('project_modal') as HTMLDialogElement | null
            modal?.close()

            // Reset all states
            reset()
            setNewProject({
                title: '',
                description: '',
                imageUrl: '',
                images: [],
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
            setIsEditing(false)
            setEditingId(null)
            await fetchProjects()
        } catch (error) {
            console.error('Error submitting project:', error)
            toast.error('Failed to submit project')
        } finally {
            setIsSubmitting(false)
        }
    }

    const uploadImage = async (file: File, type: 'thumbnail' | 'slider' | 'mobile') => {
        try {
            const compressedImage = await compressImage(file)
            const base64 = await new Promise((resolve) => {
                const reader = new FileReader()
                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(compressedImage)
            })

            // Generate slug and limit to first 10 words
            const folderSlug = generateSlug(newProject.title)
                .split('-')
                .slice(0, 10)
                .join('-')

            // Create folder path based on type
            const folderPath = `projects/${folderSlug}/${type === 'thumbnail' ? 'thumbnails' : type === 'slider' ? 'sliders' : 'mobile'}`

            // Generate unique filename with timestamp
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

    const handleEdit = async (project: Project) => {
        try {
            setIsEditing(true)
            setEditingId(project.id!)
            setEditData(project) // Set edit data first
            setIsEditMode(true) // Then set edit mode

            const projectData = {
                title: project.title || '',
                description: project.description || '',
                imageUrl: project.imageUrl || '',
                images: project.images || [],
                slug: project.slug || '',
                typeCategory: project.typeCategory || '',
                typeTitle: project.typeTitle || '',
                genreTitle: project.genreTitle || '',
                status: project.status || 'draft',
                content: project.content || '',
                stock: project.stock || 0,
                price: project.price || 0,
                author: project.author || {
                    name: '',
                    role: '',
                    uid: '',
                    photoURL: ''
                },
                createdAt: project.createdAt || Timestamp.now(),
                updatedAt: project.updatedAt || Timestamp.now()
            }

            setNewProject(projectData)

            const modal = document.getElementById('project_modal') as HTMLDialogElement | null
            modal?.showModal()
        } catch (error) {
            console.error('Error setting up edit mode:', error)
            toast.error('Failed to load project for editing')
        }
    }

    const handleDelete = (id: string) => {
        if (!hasRole(['super-admins', 'admins'])) {
            toast.error('You do not have permission to perform this action')
            return
        }
        setProjectToDelete(id)
        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
        deleteModal?.showModal()
    }

    const confirmDelete = async () => {
        if (!projectToDelete) return

        setIsDeleting(true)
        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT as string, projectToDelete))
            toast.success('Project deleted successfully!')
            fetchProjects()
            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null
            deleteModal?.close()
            setProjectToDelete(null)
        } catch (error) {
            console.error('Error deleting project:', error)
            toast.error('Failed to delete project')
        } finally {
            setIsDeleting(false)
        }
    }

    const resetProjectState = () => {
        setNewProject({
            title: '',
            description: '',
            imageUrl: '',
            images: [],
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
        setSelectedProjectTypes([])
        setIsEditing(false)
        setEditingId(null)
        setIsEditMode(false)
        setEditData(null)
        reset()
    }

    const closeModal = () => {
        const modal = document.getElementById('project_modal') as HTMLDialogElement | null
        modal?.close()
        resetProjectState()
    }

    const openModal = () => {
        resetProjectState() // Reset state before opening modal for new project
        const modal = document.getElementById('project_modal') as HTMLDialogElement | null
        modal?.showModal()
    }

    const renderAuthorField = () => (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <h4 className="font-semibold text-lg text-gray-900">Author Information</h4>
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
                        <label className="text-sm font-medium text-gray-700 mb-2">Full Name</label>
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
                        <p className="mt-2 text-xs text-gray-500">This information is pulled from your profile and cannot be edited here.</p>
                    </div>

                    <div className="form-control">
                        <label className="text-sm font-medium text-gray-700 mb-2">Access Level</label>
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
    )

    const handleDragOver = (e: React.DragEvent, index?: number) => {
        e.preventDefault();
        e.stopPropagation();

        if (index !== undefined && draggedIndex !== null && draggedIndex !== index) {
            // Handle reordering
            e.dataTransfer.dropEffect = 'move';
            moveImage(draggedIndex, index);
            setDraggedIndex(index);
        } else {
            // Handle file drops
            const dropZone = e.currentTarget as HTMLDivElement;
            dropZone.classList.add('border-green-500', 'bg-green-50');
        }
    };

    // Update the handleDragLeave for file drops only
    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const dropZone = e.currentTarget as HTMLDivElement;
        dropZone.classList.remove('border-green-500', 'bg-green-50');
    };

    // Update the handleDrop to handle both file drops and reordering
    const handleDrop = async (e: React.DragEvent, type: 'thumbnail' | 'slider') => {
        e.preventDefault();
        e.stopPropagation();

        const dropZone = e.currentTarget as HTMLDivElement;
        dropZone.classList.remove('border-green-500', 'bg-green-50');

        // Reset dragged index
        setDraggedIndex(null);

        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        if (type === 'thumbnail') {
            await handleThumbnailUpload(files[0]);
        } else {
            const imageFiles = files.filter(file => file.type.startsWith('image/'));
            const remainingSlots = 5 - (selectedImages.length || newProject.images.length);
            const filesToUpload = imageFiles.slice(0, remainingSlots);

            const dataTransfer = new DataTransfer();
            filesToUpload.forEach(file => {
                dataTransfer.items.add(file);
            });
            await handleSliderUpload(dataTransfer.files);
        }
    };

    // Add these new functions near your other handlers

    const moveImage = (fromIndex: number, toIndex: number) => {
        if (selectedImages.length > 0) {
            const newImages = [...selectedImages];
            const [movedItem] = newImages.splice(fromIndex, 1);
            newImages.splice(toIndex, 0, movedItem);
            setSelectedImages(newImages);
        } else {
            const newImages = [...newProject.images];
            const [movedItem] = newImages.splice(fromIndex, 1);
            newImages.splice(toIndex, 0, movedItem);
            setNewProject(prev => ({ ...prev, images: newImages }));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowLeft' && index > 0) {
            moveImage(index, index - 1);
        } else if (e.key === 'ArrowRight' && index < (selectedImages.length || newProject.images.length) - 1) {
            moveImage(index, index + 1);
        }
    };

    const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, index: number) => {
        setDraggedIndex(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    // Update toggle function
    const toggleProductType = (type: ProjectType) => {
        const isSelected = selectedProjectTypes.some(p => p.id === type.id);

        if (isSelected) {
            // Remove product type if already selected
            const updatedTypes = selectedProjectTypes.filter(p => p.id !== type.id);
            setSelectedProjectTypes(updatedTypes);
        } else {
            // Add product type if not selected
            const updatedTypes = [...selectedProjectTypes, type];
            setSelectedProjectTypes(updatedTypes);
        }
    };

    // Update the UI section for product types
    {/* Product Types Selection */ }
    <div className="form-control">
        <label className="text-sm font-medium text-gray-700 mb-1.5">Product Types</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {projectTypes.map((type) => {
                const isSelected = selectedProjectTypes.some(p => p.id === type.id);

                return (
                    <div
                        key={type.id}
                        onClick={() => toggleProductType(type)}
                        className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${isSelected
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-orange-300'
                            }`}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-sm font-medium text-gray-700 text-center">
                                {type.title}
                            </span>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-xs text-gray-500">
                                    {type.categoryTitle}
                                </span>
                                <span className="text-xs text-gray-400">
                                    {type.genreTitle}
                                </span>
                            </div>
                        </div>

                        {/* Checkmark for selected product types */}
                        {isSelected && (
                            <div className="absolute top-2 right-2">
                                <div className="bg-orange-500 rounded-full p-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-3 w-3 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    </div>

    // Add handleView function
    const handleView = (project: Project) => {
        setViewProject(project);
    };

    // Add closeViewModal function
    const closeViewModal = () => {
        setViewProject(null);
    };

    // Update the image upload handlers to use uploadImage function
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

    const formatNumber = (value: string | number) => {
        // Convert to string and remove all non-numeric characters
        const numericValue = String(value).replace(/[^\d]/g, '');
        // Format with thousand separators
        return new Intl.NumberFormat('id-ID').format(Number(numericValue));
    };

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'price' | 'stock') => {
        const value = e.target.value;
        // Remove all non-numeric characters
        const numericValue = value.replace(/[^\d]/g, '');

        if (numericValue) {
            const numberValue = parseInt(numericValue, 10);
            if (!isNaN(numberValue)) {
                // Set the numeric value in the form
                setValue(field, numberValue);
                // Format the display value
                e.target.value = formatNumber(numberValue);
            }
        } else {
            setValue(field, 0);
            e.target.value = '';
        }
    };

    if (isLoading) {
        return <ProductSkelaton />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            {/* Header Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Projects
                        </h1>
                        <p className='text-gray-500'>Manage and organize your projects</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Project
                    </button>
                </div>
            </div>

            {/* Search and Filter Section */}
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
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200"
                                >
                                    <option value="">All Categories</option>
                                    {availableCategories.map(category => (
                                        <option key={category} value={category}>{category}</option>
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
                            <label htmlFor="genreFilter" className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Genre
                            </label>
                            <div className="relative">
                                <select
                                    id="genreFilter"
                                    value={selectedGenre}
                                    onChange={(e) => setSelectedGenre(e.target.value)}
                                    className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200"
                                >
                                    <option value="">All Genres</option>
                                    {availableGenres
                                        .filter(genre => !selectedCategory || projects.some(p => p.typeCategory === selectedCategory && p.genreTitle === genre))
                                        .map(genre => (
                                            <option key={genre} value={genre}>{genre}</option>
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
                            <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-2">
                                Filter by Type
                            </label>
                            <div className="relative">
                                <select
                                    id="typeFilter"
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200"
                                >
                                    <option value="">All Types</option>
                                    {availableTypes
                                        .filter(type =>
                                            (!selectedCategory || projects.some(p => p.typeCategory === selectedCategory && p.typeTitle === type)) &&
                                            (!selectedGenre || projects.some(p => p.genreTitle === selectedGenre && p.typeTitle === type))
                                        )
                                        .map(type => (
                                            <option key={type} value={type}>{type}</option>
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
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by title or category..."
                                    className="block w-full pl-10 pr-10 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                                />
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm("")}
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

            {/* Project Grid */}
            {paginatedProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedProjects.map((project) => (
                        <div
                            key={project.id}
                            className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                        >
                            {/* Image Container */}
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={project.imageUrl || '/placeholder.png'}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {/* Status Badge */}
                                <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${project.status === 'publish'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-gray-100 text-gray-700'
                                    }`}>
                                    {project.status}
                                </div>
                            </div>

                            {/* Content Container */}
                            <div className="p-5 space-y-4">
                                {/* Title and Description */}
                                <div className="space-y-2">
                                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                        {project.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-2 py-3 border-y border-gray-100">
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-gray-900">{project.stock}</p>
                                        <p className="text-xs text-gray-500">Stock</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-gray-900">Rp {project.price.toLocaleString('id-ID')}</p>
                                        <p className="text-xs text-gray-500">Price</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => handleView(project)}
                                        className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                                        title="View details"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="inline-flex items-center justify-center p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Edit project"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project.id!)}
                                        className="inline-flex items-center justify-center p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                        title="Delete project"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <div className="p-4 bg-gray-50 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-gray-900">No Projects Found</h3>
                            <p className="text-gray-500">There are no projects to display at the moment.</p>
                        </div>
                        <button
                            onClick={openModal}
                            className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Project
                        </button>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {filteredProjects.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredProjects.length / projectsPerPage)}
                    onPageChange={handlePageChange}
                />
            )}

            {/* Project Modal */}
            <dialog id="project_modal" className="modal">
                <div className="modal-box bg-background max-w-6xl p-0 overflow-hidden">
                    {/* Modal Header */}
                    <div className="sticky top-0 bg-background border-b border-[var(--border-color)] px-6 py-4 flex justify-between items-center z-10">
                        <h3 className="font-bold text-xl text-gray-900">
                            {isEditing ? 'Edit Project' : 'Add New Project'}
                        </h3>
                        <button
                            onClick={closeModal}
                            className="btn btn-circle btn-ghost btn-sm hover:bg-gray-100 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
                        <form id="project-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Basic Information */}
                            <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-blue-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Basic Information</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Title</label>
                                        <input
                                            type="text"
                                            {...register('title')}
                                            className="input input-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="Enter project title"
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
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Description</label>
                                        <textarea
                                            {...register('description')}
                                            className="textarea textarea-bordered w-full h-24 bg-gray-50/50 border-[var(--border-color)] focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                                            placeholder="Enter project description"
                                        />
                                        {errors.description && (
                                            <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
                                        )}
                                    </div>

                                    {/* Status Project */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Status Project</label>
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
                                    <h4 className="font-semibold text-lg text-gray-900">Categories & Details</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Category</label>
                                        <select
                                            {...register('typeCategory')}
                                            className="select select-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                                        >
                                            <option value="">Select category</option>
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
                                    <h4 className="font-semibold text-lg text-gray-900">Stock & Price</h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Stock Input */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Stock</label>
                                        <input
                                            type="text"
                                            {...register('stock', {
                                                valueAsNumber: true,
                                                onChange: (e) => handleNumberChange(e, 'stock')
                                            })}
                                            className="input input-bordered w-full bg-gray-50/50 border-[var(--border-color)] focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                            placeholder="Enter stock quantity"
                                            defaultValue={watch('stock') ? formatNumber(watch('stock').toString()) : ''}
                                        />
                                        {errors.stock && (
                                            <span className="text-red-500 text-sm mt-1">{errors.stock.message}</span>
                                        )}
                                    </div>

                                    {/* Price Input */}
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Price</label>
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
                                                placeholder="Enter price"
                                                defaultValue={watch('price') ? formatNumber(watch('price')) : ''}
                                            />
                                        </div>
                                        {errors.price && (
                                            <span className="text-red-500 text-sm mt-1">{errors.price.message}</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Images & Stock */}
                            <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-green-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Images</h4>
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
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Slider Images</label>
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
                                                                aria-label={`Slider image ${index + 1}. Use arrow keys to reorder.`}
                                                            >
                                                                <div className="absolute top-2 left-2 z-10 bg-black bg-opacity-50 text-white px-2 py-1 rounded-md text-xs">
                                                                    {index + 1}
                                                                </div>
                                                                <Image
                                                                    src={url}
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
                                                                        <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                        </svg>
                                                                        <p className="text-sm text-gray-500">Add Image</p>
                                                                        <p className="text-xs text-gray-400 mt-1">Drag or click to upload</p>
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

                            {/* Content & License */}
                            <div className="bg-background rounded-2xl p-6 shadow-sm border border-[var(--border-color)] hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-50 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                                        </svg>
                                    </div>
                                    <h4 className="font-semibold text-lg text-gray-900">Content</h4>
                                </div>
                                <div className="space-y-6">
                                    <div className="form-control">
                                        <label className="text-sm font-medium text-gray-700 mb-1.5">Content</label>
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
                            </div>

                            {/* Author Information */}
                            {renderAuthorField()}
                        </form>
                    </div>

                    {/* Modal Footer */}
                    <div className="sticky bottom-0 bg-background border-t border-[var(--border-color)] px-6 py-4 flex justify-end gap-3 z-10">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="btn btn-ghost hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
                            disabled={isSubmitting}
                        >
                            Cancel
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
                                    <span>Loading...</span>
                                </div>
                            ) : isEditing ? 'Update Project' : 'Save Project'}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* Delete Modal */}
            <dialog id="delete_modal" className="modal">
                <div className="modal-box max-w-md bg-white p-0 rounded-2xl overflow-hidden">
                    {/* Modal Header */}
                    <div className="p-6 pb-4 border-b border-[var(--border-color)]">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete Project</h3>
                                <p className="text-sm text-gray-500">This action cannot be undone.</p>
                            </div>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6">
                        <p className="text-gray-600">
                            Are you sure you want to delete this project? All of its data will be permanently removed from our servers forever. This action cannot be undone.
                        </p>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 bg-background">
                        <button
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 bg-background border border-[var(--border-color)] rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-all duration-200"
                            onClick={() => {
                                const modal = document.getElementById('delete_modal') as HTMLDialogElement
                                modal?.close()
                            }}
                        >
                            Cancel
                        </button>

                        <button
                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                    <span>Deleting...</span>
                                </div>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete Project
                                </>
                            )}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

            {/* View Modal */}
            <ViewModal viewProject={viewProject} onClose={closeViewModal} />
        </section>
    )
}