"use client"

import React, { useState, useMemo } from 'react';

import { useKartu } from '@/hooks/dashboard/super-admins/voucher/kartu/kartu/utils/useKartu';

import VoucherTable from '@/hooks/dashboard/super-admins/voucher/kartu/kartu/components/KartuTable';

import VoucherForm from '@/hooks/dashboard/super-admins/voucher/kartu/kartu/modal/ContentModal';

import SearchFilter from '@/hooks/dashboard/super-admins/voucher/kartu/kartu/filter/SearchFilter';

import { Kartu } from '@/hooks/dashboard/super-admins/voucher/kartu/kartu/types/Kartu';

import { Pagination } from '@/base/helper/Pagination';

import KartuSkelaton from "@/hooks/dashboard/super-admins/voucher/kartu/kartu/KartuSkelaton"

export default function VoucherLayout() {
    const { kartu: kartus, loading, error, addKartu, updateKartu, deleteKartu } = useKartu();

    const [showForm, setShowForm] = useState(false);
    const [selectedKartu, setSelectedKartu] = useState<Kartu | undefined>(undefined);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    // Get unique brands for filter options
    const availableBrands = useMemo(() => {
        return [...new Set(kartus.map(h => h.brand))].sort();
    }, [kartus]);

    // Filter vouchers based on search term and selected filters
    const filteredKartus = useMemo(() => {
        return kartus.filter(kartu => {
            const matchesSearch = searchTerm === '' ||
                kartu.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                kartu.brand.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesBrand = selectedBrand === '' || kartu.brand === selectedBrand;

            return matchesSearch && matchesBrand;
        });
    }, [kartus, searchTerm, selectedBrand]);

    // Paginated vouchers
    const paginatedKartus = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        return filteredKartus.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredKartus, currentPage, itemsPerPage]);

    // Handle page change
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleAddClick = () => {
        setSelectedKartu(undefined);
        setShowForm(true);
    };

    const handleEditClick = (kartu: Kartu) => {
        setSelectedKartu(kartu);
        setShowForm(true);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedKartu(undefined);
    };

    const handleFormSubmit = async (data: Omit<Kartu, 'id' | 'createdAt' | 'updatedAt'>) => {
        setIsSubmitting(true);
        try {
            if (selectedKartu) {
                await updateKartu(selectedKartu.id, data);
            } else {
                await addKartu(data);
            }
            setShowForm(false);
            setSelectedKartu(undefined);
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
                await deleteKartu(deleteConfirm);
                setDeleteConfirm(null);
            } catch (error) {
                console.error("Error deleting kartu:", error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    if (loading) {
        return <KartuSkelaton />
    }

    return (
        <section>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Kartu Perdana
                        </h1>
                        <p className='text-gray-500'>
                            Kelola dan atur Kartu Perdana Anda
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
                        Add Kartu Perdana
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
                    availableBrands={availableBrands}
                    kartus={kartus}
                />
            </div>

            {/* Form Section */}
            {showForm && (
                <VoucherForm
                    Kartu={selectedKartu}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isSubmitting={isSubmitting}
                />
            )}

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <VoucherTable
                    kartus={paginatedKartus}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />
            </div>

            {/* Pagination */}
            {!loading && filteredKartus.length > 0 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredKartus.length / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
                        <p className="text-gray-600 mb-4">
                            Apakah Anda yakin ingin menghapus kartu perdana ini? Tindakan ini tidak dapat dibatalkan..
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                                disabled={isDeleting}
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Deleting...</span>
                                    </>
                                ) : (
                                    <span>Delete</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
