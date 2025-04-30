"use client"

import React, { useState, useRef } from 'react';

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import { usePiutangData } from '@/hooks/dashboard/super-admins/rekap/piutang/lib/FetchPiutang';

import { ContentModal } from '@/hooks/dashboard/super-admins/rekap/piutang/modal/ContentModal';

import { DeleteModal } from '@/hooks/dashboard/super-admins/rekap/piutang/modal/DeleteModal';

import { PiutangContent, PiutangFormData, initialFormData } from '@/hooks/dashboard/super-admins/rekap/piutang/types/Piutang';

import { FormatRupiah } from '@/base/helper/FormatRupiah';

import { formatDateToMonthName } from '@/base/helper/FormatDate';

import PiutangSkelaton from '@/hooks/dashboard/super-admins/rekap/piutang/PiutangSkelaton';

export default function PiutangLayout() {
    const [selectedContent, setSelectedContent] = useState<PiutangContent | null>(null);
    const [formData, setFormData] = useState<PiutangFormData>(initialFormData);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [nameSearch, setNameSearch] = useState("");
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
        statusFilter,
        setStatusFilter,
        handlePageChange,
    } = usePiutangData();

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) {
            const formattedDate = date.toISOString().split('T')[0];
            setSearchQuery(formattedDate);
        } else {
            setSearchQuery('');
        }
    };

    const handleNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNameSearch(value);
        setSearchQuery(value);
    };

    const handleOpenModal = (content?: PiutangContent) => {
        if (content) {
            setSelectedContent(content);
            setFormData({
                nama: content.nama,
                price: content.price,
                date: content.date,
                status: content.status,
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

    const handleOpenDeleteModal = (content: PiutangContent) => {
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

    if (isLoading) {
        return <PiutangSkelaton />
    }

    return (
        <section>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                    <div className="space-y-1">
                        <h1 className='text-xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Piutang
                        </h1>
                        <p className='text-sm sm:text-base text-gray-500'>
                            Kelola dan atur piutang
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
                        Tambah Piutang
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-6 mb-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={nameSearch}
                            onChange={handleNameSearch}
                            placeholder="Cari berdasarkan nama..."
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base bg-transparent"
                        />
                    </div>
                    <div className="flex-1">
                        <DatePicker
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Pilih tanggal..."
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base bg-transparent"
                            isClearable
                        />
                    </div>
                    <div className="flex-1">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm sm:text-base bg-transparent"
                        >
                            <option value="">Semua Status</option>
                            <option value="sudah_bayar">Sudah Bayar</option>
                            <option value="belum_bayar">Belum Bayar</option>
                        </select>
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
                                    <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Nama</th>
                                    <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Tanggal</th>
                                    <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Jumlah</th>
                                    <th className="text-left py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Status</th>
                                    <th className="text-right py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-medium text-gray-500">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contents.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-6 sm:py-8 text-sm sm:text-base text-gray-500">
                                            Tidak ada data piutang
                                        </td>
                                    </tr>
                                ) : (
                                    <>
                                        {contents.map((content) => (
                                            <tr key={content.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">{content.nama}</td>
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">{formatDateToMonthName(content.date)}</td>
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">{FormatRupiah(content.price)}</td>
                                                <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-sm">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${content.status === 'sudah_bayar'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {content.status === 'sudah_bayar' ? 'Sudah Bayar' : 'Belum Bayar'}
                                                    </span>
                                                </td>
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
