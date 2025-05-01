import { Role } from '@/utils/context/interface/Auth';

import { useState } from 'react';

import { UserFormModalProps } from '@/hooks/dashboard/super-admins/accounts/karyawan/types/Karyawan';

export default function UserFormModal({
    showModal,
    modalMode,
    formData,
    isSubmitting,
    onSubmit,
    onClose,
    setFormData
}: UserFormModalProps) {
    const [showPassword, setShowPassword] = useState(false);

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-4 md:p-8 max-h-[90vh] overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                    {modalMode === 'create' ? 'Tambahkan Pengguna Baru' : 'Edit Pengguna'}
                </h3>
                <div className="space-y-4">
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-transparent"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                        />
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-transparent"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password {modalMode === 'edit' && '(Opsional)'}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10 bg-transparent"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder={modalMode === 'edit' ? 'Kosongkan untuk menjaga password saat ini' : 'Masukkan password'}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-transparent"
                            value={formData.role}
                            onChange={(e) => setFormData({
                                ...formData,
                                role: e.target.value as Role
                            })}
                        >
                            <option value={Role.KARYAWAN}>Karyawan</option>
                        </select>
                    </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 hover:shadow-indigo-100 hover:shadow-lg flex items-center gap-2"
                        onClick={onSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Menyimpan...
                            </>
                        ) : 'Simpan'}
                    </button>
                    <button
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md"
                        onClick={onClose}
                    >
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
}