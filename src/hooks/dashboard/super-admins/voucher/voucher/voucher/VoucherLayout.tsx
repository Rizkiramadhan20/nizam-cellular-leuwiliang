"use client"

import React, { useState, useMemo } from 'react';

import { useVoucher } from '@/hooks/dashboard/super-admins/voucher/voucher/voucher/useVoucher';

import VoucherTable from '@/hooks/dashboard/super-admins/voucher/voucher/voucher/VoucherTable';

import VoucherForm from '@/hooks/dashboard/super-admins/voucher/voucher/voucher/modal/ContentModal';

import SearchFilter from '@/hooks/dashboard/super-admins/voucher/voucher/voucher/filter/SearchFilter';

import { voucher } from '@/hooks/dashboard/super-admins/voucher/voucher/voucher/types/voucher';

import { Pagination } from '@/base/helper/Pagination';

import VoucherSkelaton from "@/hooks/dashboard/super-admins/voucher/voucher/voucher/VoucherSkelaton"

export default function VoucherLayout() {
    const { voucher: vouchers, loading, error, addVoucher, updateVoucher, deleteVoucher } = useVoucher();

    const [showForm, setShowForm] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState<voucher | undefined>(undefined);
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
        return [...new Set(vouchers.map(h => h.brand))].sort();
    }, [vouchers]);

    // Filter vouchers based on search term and selected filters
    const filteredVouchers = useMemo(() => {
        return vouchers.filter(voucher => {
            const matchesSearch = searchTerm === '' ||
                voucher.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                voucher.brand.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesBrand = selectedBrand === '' || voucher.brand === selectedBrand;

            return matchesSearch && matchesBrand;
        });
    }, [vouchers, searchTerm, selectedBrand]);

    // Paginated vouchers
    const paginatedVouchers = useMemo(() => {
        const startIndex = currentPage * itemsPerPage;
        return filteredVouchers.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredVouchers, currentPage, itemsPerPage]);

    // Handle page change
    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
    };

    const handleAddClick = () => {
        setSelectedVoucher(undefined);
        setShowForm(true);
    };

    const handleEditClick = (voucher: voucher) => {
        setSelectedVoucher(voucher);
        setShowForm(true);
    };

    const handleFormCancel = () => {
        setShowForm(false);
        setSelectedVoucher(undefined);
    };

    const handleFormSubmit = async (data: Omit<voucher, 'id' | 'createdAt' | 'updatedAt'>) => {
        setIsSubmitting(true);
        try {
            if (selectedVoucher) {
                await updateVoucher(selectedVoucher.id, data);
            } else {
                await addVoucher(data);
            }
            setShowForm(false);
            setSelectedVoucher(undefined);
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
                await deleteVoucher(deleteConfirm);
                setDeleteConfirm(null);
            } catch (error) {
                console.error("Error deleting voucher:", error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    if (loading) {
        return <VoucherSkelaton />
    }

    return (
        <section>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Voucher
                        </h1>
                        <p className='text-gray-500'>
                            Kelola dan atur Voucher Anda
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
                        Add Voucher
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
                    handphones={vouchers}
                />
            </div>

            {/* Form Section */}
            {showForm && (
                <VoucherForm
                    voucher={selectedVoucher}
                    onSubmit={handleFormSubmit}
                    onCancel={handleFormCancel}
                    isSubmitting={isSubmitting}
                />
            )}

            {/* Table Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <VoucherTable
                    handphones={paginatedVouchers}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />
            </div>

            {/* Pagination */}
            {!loading && filteredVouchers.length > 0 && (
                <div className="mt-6">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(filteredVouchers.length / itemsPerPage)}
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
                            Are you sure you want to delete this voucher? This action cannot be undone.
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
