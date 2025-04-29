"use client"

import React, { useState, useMemo } from 'react';

import { useHandphoneStore } from '@/hooks/dashboard/super-admins/handphone/handphone/utils/useHandphoneStore';

import HandphoneTable from '@/hooks/dashboard/super-admins/handphone/handphone/components/HandphoneTable';

import HandphoneForm from '@/hooks/dashboard/super-admins/handphone/handphone/modal/ContentModal';

import DeleteModal from '@/hooks/dashboard/super-admins/handphone/handphone/modal/DeleteModal';

import SearchFilter from '@/hooks/dashboard/super-admins/handphone/handphone/filter/SearchFilter';

import { Handphone } from '@/hooks/dashboard/super-admins/handphone/handphone/types/handphone';

import { Pagination } from '@/base/helper/Pagination';

import HandphoneSkelaton from "@/hooks/dashboard/super-admins/handphone/handphone/HandphoneSkelaton"

export default function HandphoneLayout() {
    const { handphones, loading, error, addHandphone, updateHandphone, deleteHandphone } = useHandphoneStore();

    const [showForm, setShowForm] = useState(false);
    const [selectedHandphone, setSelectedHandphone] = useState<Handphone | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedOwner, setSelectedOwner] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Get unique brands and owners for filter options
    const availableBrands = useMemo(() => {
        return [...new Set(handphones.map(h => h.brand))].sort();
    }, [handphones]);

    const availableOwners = useMemo(() => {
        return [...new Set(handphones.map(h => h.owner))].sort();
    }, [handphones]);

    // Filter handphones based on search term and selected filters
    const filteredHandphones = useMemo(() => {
        return handphones.filter(handphone => {
            const matchesSearch = searchTerm === '' ||
                handphone.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                handphone.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                handphone.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                handphone.owner.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesBrand = selectedBrand === '' || handphone.brand === selectedBrand;
            const matchesOwner = selectedOwner === '' || handphone.owner === selectedOwner;

            return matchesSearch && matchesBrand && matchesOwner;
        });
    }, [handphones, searchTerm, selectedBrand, selectedOwner]);

    // Paginated handphones
    const paginatedHandphones = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        return filteredHandphones.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredHandphones, currentPage, itemsPerPage]);

    // Calculate total value and stock for all filtered handphones
    const totalValue = useMemo(() => {
        return filteredHandphones.reduce((sum, handphone) => {
            return sum + (handphone.total || handphone.stock * handphone.price);
        }, 0);
    }, [filteredHandphones]);

    const totalStock = useMemo(() => {
        return filteredHandphones.reduce((sum, handphone) => {
            return sum + handphone.stock;
        }, 0);
    }, [filteredHandphones]);

    // Handle page change
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleAddClick = () => {
        setSelectedHandphone(undefined);
        setShowForm(true);
    };

    const handleEditClick = (handphone: Handphone) => {
        setSelectedHandphone(handphone);
        setShowForm(true);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedHandphone(undefined);
    };

    const handleFormSubmit = async (data: Omit<Handphone, 'id' | 'createdAt' | 'updatedAt'>) => {
        setIsSubmitting(true);
        try {
            if (selectedHandphone) {
                await updateHandphone(selectedHandphone.id, data);
            } else {
                await addHandphone(data);
            }
            setShowForm(false);
            setSelectedHandphone(undefined);
            return true;
        } catch (error) {
            console.error('Error submitting form:', error);
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteClick = (id: string) => {
        setDeleteConfirm(id);
    };

    const confirmDelete = async () => {
        if (deleteConfirm) {
            setIsDeleting(true);
            try {
                await deleteHandphone(deleteConfirm);
                setDeleteConfirm(null);
            } catch (error) {
                console.error("Error deleting handphone:", error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    if (loading) {
        return <HandphoneSkelaton />
    }

    return (
        <section>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Data Handphone
                        </h1>
                        <p className='text-gray-500'>
                            Kelola dan atur Data Handphone Anda
                        </p>
                    </div>

                    <button
                        onClick={handleAddClick}
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
                        Tambah Handphone
                    </button>
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* Search and Filter Section */}
            <div className="mb-4">
                <SearchFilter
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedBrand={selectedBrand}
                    setSelectedBrand={setSelectedBrand}
                    selectedOwner={selectedOwner}
                    setSelectedOwner={setSelectedOwner}
                    availableBrands={availableBrands}
                    availableOwners={availableOwners}
                    handphones={handphones}
                />
            </div>

            {/* Form Section */}
            {showForm && (
                <HandphoneForm
                    handphone={selectedHandphone}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isSubmitting={isSubmitting}
                />
            )}

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <HandphoneTable
                    handphones={paginatedHandphones}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                    currentPage={currentPage + 1}
                    itemsPerPage={itemsPerPage}
                    totalValue={totalValue}
                    totalStock={totalStock}
                />
            </div>

            {/* Pagination */}
            {!loading && filteredHandphones.length > 0 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredHandphones.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={!!deleteConfirm}
                onClose={() => setDeleteConfirm(null)}
                onConfirm={confirmDelete}
                isDeleting={isDeleting}
            />
        </section>
    );
}
