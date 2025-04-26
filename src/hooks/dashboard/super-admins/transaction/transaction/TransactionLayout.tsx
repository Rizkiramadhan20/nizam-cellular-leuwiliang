"use client"

import React, { useState, useEffect, useRef } from 'react'

import TransactionModal from './modal/ContentModal'

import { Transaction } from './types/transaction'

import { collection, getDocs, query, orderBy } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import { useAuth } from '@/utils/context/AuthContext'

import { toast } from 'react-hot-toast'

export default function TransactionLayout() {
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const { hasRole } = useAuth()
    const modalRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        fetchTransactions()
    }, [])

    const fetchTransactions = async () => {
        try {
            setLoading(true)
            const transactionsRef = collection(db, 'transactions')
            const q = query(transactionsRef, orderBy('createdAt', 'desc'))
            const querySnapshot = await getDocs(q)

            const transactionsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Transaction[]

            setTransactions(transactionsData)
        } catch (error) {
            console.error('Error fetching transactions:', error)
            toast.error('Gagal memuat data transaksi')
        } finally {
            setLoading(false)
        }
    }

    const handleSuccess = () => {
        fetchTransactions()
        toast.success('Transaksi berhasil disimpan')
        if (modalRef.current) {
            modalRef.current.close()
        }
    }

    const handleEdit = (transaction: Transaction) => {
        setSelectedTransaction(transaction)
        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }

    const handleAddTransaction = () => {
        setSelectedTransaction(undefined)
        if (modalRef.current) {
            modalRef.current.showModal()
        }
    }

    const handleCloseModal = () => {
        if (modalRef.current) {
            modalRef.current.close()
        }
        setSelectedTransaction(undefined)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'sedang_dikerjakan':
                return 'bg-blue-100 text-blue-800'
            case 'selesai':
                return 'bg-green-100 text-green-800'
            case 'return':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredTransactions = transactions.filter(transaction => {
        const searchLower = searchQuery.toLowerCase();
        return (
            transaction.customer.name.toLowerCase().includes(searchLower) ||
            transaction.customer.phone.toLowerCase().includes(searchLower) ||
            transaction.deviceBrand.toLowerCase().includes(searchLower) ||
            transaction.deviceModel.toLowerCase().includes(searchLower)
        );
    });

    return (
        <section className='min-h-full'>
            <div className="bg-background rounded-2xl shadow-sm border border-[var(--border-color)] p-6 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Daftar Transaksi
                        </h1>
                        <p className='text-gray-500'>Kelola dan atur transaksi Anda</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <div className="relative w-full sm:w-96">
                            <input
                                type="text"
                                placeholder="Cari berdasarkan nama, nomor telepon, merek, atau model..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input input-bordered w-full bg-white border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all rounded-lg pl-10"
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <button
                            onClick={handleAddTransaction}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            Tambah Transaksi
                        </button>
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-background rounded-2xl shadow-sm border border-[var(--border-color)] p-6">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loading loading-spinner loading-lg"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Pelanggan</th>
                                    <th>Perangkat</th>
                                    <th>Status</th>
                                    <th>Harga</th>
                                    <th>Tanggal</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactions.map((transaction, index) => (
                                    <tr key={transaction.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div>
                                                <div className="font-medium">{transaction.customer.name}</div>
                                                <div className="text-sm text-gray-500">{transaction.customer.phone}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                <div className="font-medium">{transaction.deviceBrand}</div>
                                                <div className="text-sm text-gray-500">{transaction.deviceModel}</div>
                                            </div>
                                        </td>
                                        <td>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                                                {transaction.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="font-medium">
                                                Rp {transaction.price.toLocaleString('id-ID')}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="text-sm">
                                                {transaction.createdAt.toDate().toLocaleDateString('id-ID')}
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleEdit(transaction)}
                                                className="btn btn-ghost btn-sm"
                                                disabled={!hasRole(['super-admins', 'admins'])}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <TransactionModal
                ref={modalRef}
                transaction={selectedTransaction}
                onClose={handleCloseModal}
                onSuccess={handleSuccess}
            />
        </section>
    )
}
