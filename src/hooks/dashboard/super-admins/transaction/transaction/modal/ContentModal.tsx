"use client"

import React, { useEffect, useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { collection, addDoc, Timestamp, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';

import { db } from '@/utils/firebase/firebase';

import { toast } from 'react-hot-toast';

import { Transaction, Customer, TransactionStatus } from '../types/transaction';

interface TransactionModalProps {
  transaction?: Transaction;
  onClose: () => void;
  onSuccess?: () => void;
}

interface UserAccount {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  role: string;
}

const TransactionModal = forwardRef<HTMLDialogElement, TransactionModalProps>(({ transaction, onClose, onSuccess }, ref) => {
  const [formData, setFormData] = useState<Transaction>(() => ({
    customer: {
      name: '',
      phone: '',
    },
    deviceBrand: '',
    deviceModel: '',
    complaint: '',
    repairActions: '',
    status: 'pending',
    price: 0,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
    transactionDate: new Date(),
    ...transaction,
  }));

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  const fetchUsers = async () => {
    try {
      const usersQuery = query(
        collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string),
        where('role', '==', 'user')
      );
      const querySnapshot = await getDocs(usersQuery);
      const usersData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id
      })) as UserAccount[];
      setUsers(usersData);
      setShowUserDropdown(true);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Gagal mengambil data pelanggan');
    }
  };

  const handleCustomerSelect = (user: UserAccount) => {
    setFormData(prev => ({
      ...prev,
      customer: {
        name: user.displayName,
        phone: user.phoneNumber,
      },
    }));
    setShowUserDropdown(false);
  };

  const handleCustomerChange = (field: keyof Customer, value: string) => {
    setFormData(prev => ({
      ...prev,
      customer: {
        ...prev.customer,
        [field]: value,
      },
    }));
  };

  const handleChange = (field: keyof Transaction, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const transactionData: Omit<Transaction, 'id'> = {
        ...formData,
        updatedAt: Timestamp.now(),
      };

      if (transaction?.id) {
        // Update existing transaction
        await updateDoc(doc(db, 'transactions', transaction.id), transactionData);
        toast.success('Transaksi berhasil diperbarui');
      } else {
        // Create new transaction
        await addDoc(collection(db, 'transactions'), transactionData);
        toast.success('Transaksi berhasil dibuat');
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Error saving transaction:', error);
      toast.error('Gagal menyimpan transaksi');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box bg-white max-w-6xl p-0 overflow-hidden">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center z-10">
          <h3 className="font-bold text-xl text-gray-900">
            {transaction ? 'Edit Transaksi' : 'Tambah Transaksi'}
          </h3>
          <button
            onClick={onClose}
            className="btn btn-circle btn-ghost btn-sm hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-12rem)]">
          <form id="transaction-form" onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg text-gray-900">Informasi Pelanggan</h4>
                <button
                  type="button"
                  onClick={fetchUsers}
                  className="ml-auto btn btn-sm bg-primary text-white border-none hover:bg-primary/90"
                >
                  Pilih Pelanggan
                </button>
              </div>

              {showUserDropdown && users.length > 0 && (
                <div className="mb-4">
                  <div className="dropdown w-full">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-2">
                      <div className="relative mb-2">
                        <input
                          type="text"
                          placeholder="Cari berdasarkan nama pelanggan..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="input input-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg pl-10"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <div
                              key={user.uid}
                              onClick={() => handleCustomerSelect(user)}
                              className="p-2 hover:bg-gray-100 cursor-pointer rounded-lg"
                            >
                              <div className="font-medium">{user.displayName}</div>
                              <div className="text-sm text-gray-600">{user.phoneNumber}</div>
                            </div>
                          ))
                        ) : (
                          <div className="p-2 text-center text-gray-500">
                            Tidak ada pelanggan yang ditemukan
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="text-sm font-medium text-gray-700 mb-1.5">Nama Pelanggan</label>
                  <input
                    type="text"
                    value={formData.customer.name}
                    onChange={(e) => handleCustomerChange('name', e.target.value)}
                    className="input input-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="text-sm font-medium text-gray-700 mb-1.5">Nomor Telepon</label>
                  <input
                    type="tel"
                    value={formData.customer.phone}
                    onChange={(e) => handleCustomerChange('phone', e.target.value)}
                    className="input input-bordered w-full bg-white border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Device Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg text-gray-900">Informasi Perangkat</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="text-sm font-medium text-gray-700 mb-1.5">Merek Perangkat</label>
                  <input
                    type="text"
                    value={formData.deviceBrand}
                    onChange={(e) => handleChange('deviceBrand', e.target.value)}
                    className="input input-bordered w-full bg-white border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all rounded-lg"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="text-sm font-medium text-gray-700 mb-1.5">Model Perangkat</label>
                  <input
                    type="text"
                    value={formData.deviceModel}
                    onChange={(e) => handleChange('deviceModel', e.target.value)}
                    className="input input-bordered w-full bg-white border-gray-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-lg text-gray-900">Informasi Servis</h4>
              </div>

              <div className="space-y-4">
                <div className="form-control">
                  <label className="text-sm font-medium text-gray-700 mb-1.5">Keluhan</label>
                  <textarea
                    value={formData.complaint}
                    onChange={(e) => handleChange('complaint', e.target.value)}
                    className="textarea textarea-bordered w-full bg-white border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all rounded-lg h-24"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="text-sm font-medium text-gray-700 mb-1.5">Tindakan Perbaikan</label>
                  <textarea
                    value={formData.repairActions}
                    onChange={(e) => handleChange('repairActions', e.target.value)}
                    className="textarea textarea-bordered w-full bg-white border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all rounded-lg h-24"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="text-sm font-medium text-gray-700 mb-1.5">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value as TransactionStatus)}
                      className="select select-bordered w-full bg-white border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all rounded-lg"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="sedang_dikerjakan">Sedang Dikerjakan</option>
                      <option value="selesai">Selesai</option>
                      <option value="return">Return</option>
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="text-sm font-medium text-gray-700 mb-1.5">Tanggal Transaksi</label>
                    <DatePicker
                      selected={formData.transactionDate ? new Date(formData.transactionDate) : null}
                      onChange={(date) => handleChange('transactionDate', date?.toISOString() || '')}
                      minDate={new Date()}
                      dateFormat="dd/MM/yyyy"
                      className="input input-bordered w-full bg-white border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all rounded-lg"
                      placeholderText="Pilih tanggal transaksi"
                      required
                      wrapperClassName="w-full"
                      popperClassName="!z-50"
                      popperPlacement="bottom-start"
                      calendarClassName="!border-gray-200 !rounded-lg !shadow-lg"
                      dayClassName={() => "hover:bg-purple-100 rounded-md"}
                      renderCustomHeader={({
                        date,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                      }) => (
                        <div className="flex items-center justify-between px-2 py-2">
                          <button
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                            type="button"
                            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <span className="text-gray-700 font-semibold">
                            {date.toLocaleString('id-ID', { month: 'long', year: 'numeric' })}
                          </span>
                          <button
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                            type="button"
                            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      )}
                    />
                  </div>

                  <div className="form-control">
                    <label className="text-sm font-medium text-gray-700 mb-1.5">Harga</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleChange('price', Number(e.target.value))}
                      className="input input-bordered w-full bg-white border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-end gap-3 z-10">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-ghost hover:bg-gray-100 transition-colors"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            form="transaction-form"
            className="btn bg-primary text-white border-none transition-colors disabled:opacity-100 disabled:bg-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm text-white/80 border-none"></span>
                <span className="text-white">Loading...</span>
              </>
            ) : transaction ? 'Update Transaksi' : 'Simpan Transaksi'}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
});

TransactionModal.displayName = 'TransactionModal';

export default TransactionModal; 