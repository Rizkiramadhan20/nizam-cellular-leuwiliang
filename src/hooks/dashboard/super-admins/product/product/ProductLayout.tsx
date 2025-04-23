"use client"

import React, { useState, useEffect, useRef } from 'react'

import { collection, getDocs, query, orderBy } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import { toast } from 'react-hot-toast'

import ProductSkelaton from "@/hooks/dashboard/super-admins/product/product/ProductSkelaton"

import { useAuth } from '@/utils/context/AuthContext'

import { useRouter } from 'next/navigation'

import { Project, ProjectType } from '@/hooks/dashboard/super-admins/product/product/types/Product'

import { Pagination } from '@/base/helper/Pagination'

import dynamic from 'next/dynamic'

import Card from '@/hooks/dashboard/super-admins/product/product/components/grid/Card'

import SearchFilter from '@/hooks/dashboard/super-admins/product/product/components/filter/SearchFilter'

import { DelateModalRef } from '@/hooks/dashboard/super-admins/product/product/types/Product'

const FormModal = dynamic(() => import('@/hooks/dashboard/super-admins/product/product/components/modal/FormModal'), { ssr: false })

const DelateModal = dynamic(() => import('@/hooks/dashboard/super-admins/product/product/components/modal/DelateModal'), { ssr: false })

const ViewModal = dynamic(() => import('@/hooks/dashboard/super-admins/product/product/components/view/ViewModal'), { ssr: false })

export default function ProjectLayout() {
    const { user, hasRole } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!hasRole(['super-admins', 'admins'])) {
            toast.error('You do not have permission to access this page')
            router.push('/')
        }
    }, [hasRole, router])

    // Data states
    const [projects, setProjects] = useState<Project[]>([])
    const [projectTypes, setProjectTypes] = useState<ProjectType[]>([])
    const [productIcons, setProductIcons] = useState<{ id: string; imageUrl: string }[]>([])
    const [productLogo, setProductLogo] = useState<{ id: string; imageUrl: string }[]>([])

    // UI states
    const [isLoading, setIsLoading] = useState(true)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Filter states
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedGenre, setSelectedGenre] = useState('')
    const [selectedType, setSelectedType] = useState('')
    const [availableCategories, setAvailableCategories] = useState<string[]>([])
    const [availableGenres, setAvailableGenres] = useState<string[]>([])
    const [availableTypes, setAvailableTypes] = useState<string[]>([])

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0)
    const [projectsPerPage] = useState(8)

    // Form and edit states
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editData, setEditData] = useState<Project | null>(null)
    const [projectToDelete, setProjectToDelete] = useState<string | null>(null)
    const [viewProject, setViewProject] = useState<Project | null>(null)

    // Filtered and paginated projects
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = !selectedCategory || project.typeCategory === selectedCategory
        const matchesGenre = !selectedGenre || project.genreTitle === selectedGenre
        const matchesType = !selectedType || project.typeTitle === selectedType

        return matchesSearch && matchesCategory && matchesGenre && matchesType
    })

    const paginatedProjects = filteredProjects.slice(
        currentPage * projectsPerPage,
        (currentPage + 1) * projectsPerPage
    )

    const modalRef = useRef<HTMLDialogElement>(null)
    const deleteModalRef = useRef<DelateModalRef>(null)

    // useEffect hooks
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                await Promise.all([
                    fetchProjects(),
                    fetchProjectTypes(),
                    fetchProductIcons(),
                    fetchProductLogo()
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


    // Data fetching functions
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

    const fetchProductIcons = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_ICONS as string))
            const iconsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                imageUrl: doc.data().imageUrl
            }))
            setProductIcons(iconsData)
        } catch (error) {
            console.error('Error fetching product icons:', error)
            toast.error('Failed to fetch product icons')
        }
    }

    const fetchProductLogo = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_PRODUCT_LOGO as string))
            const logoData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                imageUrl: doc.data().imageUrl
            }))
            setProductLogo(logoData)
        } catch (error) {
            console.error('Error fetching product icons:', error)
            toast.error('Failed to fetch product icons')
        }
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected)
        window.scrollTo(0, 0)
    }

    // Modal handling functions
    const openModal = () => {
        setIsModalOpen(true)
        setIsEditing(false)
        setEditingId(null)
        setEditData(null)
        const modal = modalRef.current
        modal?.showModal()
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setIsEditing(false)
        setEditingId(null)
        setEditData(null)
        const modal = modalRef.current
        modal?.close()
    }

    const handleView = (project: Project) => {
        setViewProject(project)
    }

    const closeViewModal = () => {
        setViewProject(null)
    }

    // CRUD operations
    const handleEdit = (project: Project) => {
        if (project.id) {
            setEditingId(project.id);
            setEditData(project);
            setIsEditing(true);
            setIsModalOpen(true);
        }
    };

    const handleDelete = (id: string) => {
        if (!hasRole(['super-admins', 'admins'])) {
            toast.error('You do not have permission to perform this action')
            return
        }
        setProjectToDelete(id)
        deleteModalRef.current?.showModal()
    }

    if (isLoading) {
        return <ProductSkelaton />
    }

    return (
        <section className='min-h-full'>
            {/* Header Section */}
            <div className="bg-background rounded-2xl shadow-sm border border-[var(--border-color)] p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Products
                        </h1>
                        <p className='text-gray-500'>Kelola dan atur produk Anda</p>
                    </div>

                    <button
                        onClick={openModal}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Product
                    </button>
                </div>
            </div>

            {/* Search and Filter Section */}
            <SearchFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedGenre={selectedGenre}
                setSelectedGenre={setSelectedGenre}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                availableCategories={availableCategories}
                availableGenres={availableGenres}
                availableTypes={availableTypes}
                projects={projects}
            />

            {/* Project Grid */}
            {paginatedProjects.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {paginatedProjects.map((project) => (
                        <Card
                            key={project.id}
                            project={project}
                            onView={handleView}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
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
            {filteredProjects.length > projectsPerPage && (
                <div className="mt-8">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredProjects.length / projectsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* Form Modal */}
            <FormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                isEditing={isEditing}
                editData={editData}
                editingId={editingId}
                projectTypes={projectTypes}
                productIcons={productIcons}
                productLogo={productLogo}
                user={user as { uid: string; displayName: string; email: string; photoURL: string; role?: string }}
                onSuccess={async () => {
                    await fetchProjects();
                    closeModal();
                }}
            />

            {/* Delete Modal */}
            <DelateModal
                ref={deleteModalRef}
                projectToDelete={projectToDelete}
                setProjectToDelete={setProjectToDelete}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
                onSuccess={fetchProjects}
            />

            {/* View Modal */}
            <ViewModal viewProject={viewProject} onClose={closeViewModal} />
        </section>
    )
}