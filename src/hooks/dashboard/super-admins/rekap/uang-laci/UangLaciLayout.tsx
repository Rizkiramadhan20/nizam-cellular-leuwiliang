"use client"

import React, { useState, useRef } from 'react';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import { useUangLaciData } from '@/hooks/dashboard/super-admins/rekap/uang-laci/lib/FetchUangLaci';

import { ContentModal } from '@/hooks/dashboard/super-admins/rekap/uang-laci/modal/ContentModal';

import { DeleteModal } from '@/hooks/dashboard/super-admins/rekap/uang-laci/modal/DeleteModal';

import { UangLaciContent, UangLaciFormData, initialFormData } from '@/hooks/dashboard/super-admins/rekap/uang-laci/types/UangLaci';

import { FormatRupiah } from '@/base/helper/FormatRupiah';

import { formatDateToMonthName } from '@/base/helper/FormatDate';

export default function UangLaciLayout() {
    const [selectedContent, setSelectedContent] = useState<UangLaciContent | null>(null);
    const [formData, setFormData] = useState<UangLaciFormData>(initialFormData);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const contentModalRef = useRef<HTMLDialogElement>(null);
    const deleteModalRef = useRef<HTMLDialogElement>(null);

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
        setSearchQuery,
        handlePageChange,
    } = useUangLaciData();

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (start && end) {
            const formattedStartDate = start.toISOString().split('T')[0];
            const formattedEndDate = end.toISOString().split('T')[0];
            setSearchQuery(`${formattedStartDate},${formattedEndDate}`);
        } else {
            setSearchQuery('');
        }
    };

    const handleOpenModal = (content?: UangLaciContent) => {
        if (content) {
            setSelectedContent(content);
            setFormData({
                uangModal: content.uangModal,
                pendapatan: content.pendapatan,
                UangLaba: content.UangLaba,
                date: content.date,
            });
        } else {
            setSelectedContent(null);
            setFormData(initialFormData);
        }
        contentModalRef.current?.showModal();
    };

    const handleCloseModal = () => {
        contentModalRef.current?.close();
    };

    const handleOpenDeleteModal = (content: UangLaciContent) => {
        setSelectedContent(content);
        deleteModalRef.current?.showModal();
    };

    const handleCloseDeleteModal = () => {
        deleteModalRef.current?.close();
    };

    const handleSubmit = async () => {
        if (selectedContent) {
            const success = await updateContent(selectedContent.id!, formData);
            if (success) {
                handleCloseModal();
            }
        } else {
            const success = await createContent(formData);
            if (success) {
                handleCloseModal();
            }
        }
    };

    const handleDelete = async () => {
        if (selectedContent?.id) {
            try {
                setIsDeleting(true);
                const success = await deleteContent(selectedContent.id);
                if (success) {
                    handleCloseDeleteModal();
                }
            } finally {
                setIsDeleting(false);
            }
        }
    };

    return (
        <section>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <div className="space-y-1">
                        <h1 className='text-xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Uang Laci
                        </h1>
                        <p className='text-sm sm:text-base text-gray-500'>
                            Kelola dan atur pemasukan uang laci
                        </p>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg text-sm sm:text-base"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 sm:h-5 sm:w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Uang Laci
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6 mb-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Pilih rentang tanggal..."
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base bg-transparent"
                            isClearable
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6">
                <div className="overflow-x-auto -mx-3 sm:mx-0">
                    <div className="min-w-[640px]">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Tanggal</th>
                                    <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Uang Modal</th>
                                    <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Pendapatan</th>
                                    <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Uang Laba</th>
                                    <th className="text-right py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-6 sm:py-8">
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin h-6 w-6 sm:h-8 sm:w-8 text-indigo-600" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                            </div>
                                        </td>
                                    </tr>
                                ) : contents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">
                                            Tidak ada data uang laci
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {contents.map((content) => (
                                            <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">{formatDateToMonthName(content.date)}</td>
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">{FormatRupiah(content.uangModal)}</td>
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">{FormatRupiah(content.pendapatan)}</td>
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">{FormatRupiah(content.UangLaba)}</td>
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4">
                                                    <div className="flex justify-end gap-1.5 sm:gap-2">
                                                        <button
                                                            onClick={() => handleOpenModal(content)}
                                                            className="p-1.5 sm:p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleOpenDeleteModal(content)}
                                                            className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-50 font-medium">
                                            <td colSpan={3} className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">Total Uang Laba:</td>
                                            <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm text-indigo-600">{FormatRupiah(contents.reduce((total, content) => total + Number(content.UangLaba), 0).toString())}</td>
                                            <td></td>
                                        </tr>
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {totalItems > itemsPerPage && (
                    <div className="flex justify-center mt-4 sm:mt-6">
                        <div className="flex gap-1.5 sm:gap-2">
                            {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i)}
                                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-colors duration-200 text-sm sm:text-base ${currentPage === i
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Modals */}
            <ContentModal
                ref={contentModalRef}
                isEditing={!!selectedContent}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                onClose={handleCloseModal}
            />

            <DeleteModal
                ref={deleteModalRef}
                onConfirm={handleDelete}
                onClose={handleCloseDeleteModal}
                isDeleting={isDeleting}
            />
        </section>
    );
}
