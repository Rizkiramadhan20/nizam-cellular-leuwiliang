import React, { useState, useEffect } from 'react';

import { VoucherFormProps } from '@/hooks/dashboard/super-admins/voucher/kartu/kartu/types/Kartu';

import { useBrandPerdanaData } from '@/hooks/dashboard/super-admins/voucher/kartu/brand/lib/FetchBrandPerdana';

export default function HandphoneForm({
    Kartu,
    onSubmit,
    onCancel,
    isSubmitting = false
}: VoucherFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        stock: 0,
        price: 0,
        total: 0
    });

    // Fetch brand data from brand_handphone collection
    const { contents: brandOptions, isLoading: loadingBrands } = useBrandPerdanaData();

    useEffect(() => {
        if (Kartu) {
            setFormData({
                title: Kartu.title,
                brand: Kartu.brand,
                stock: Kartu.stock,
                price: Kartu.price,
                total: Kartu.total || Kartu.stock * Kartu.price
            });
        }
    }, [Kartu]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'stock' || name === 'price') {
            // Remove non-numeric characters
            const numericValue = String(value).replace(/[^\d]/g, '');

            // Always update the form data, even with empty value
            const numberValue = numericValue === '' ? 0 : parseInt(numericValue, 10);

            // Update the form data with the numeric value
            setFormData(prev => {
                const updatedData = {
                    ...prev,
                    [name]: numberValue
                };

                // Calculate total when stock or price changes
                if (name === 'stock' || name === 'price') {
                    updatedData.total = updatedData.stock * updatedData.price;
                }

                return updatedData;
            });

            // Format the input value for display - only format price, leave stock as is
            if (name === 'price') {
                e.target.value = formatPrice(numberValue);
            } else {
                e.target.value = numericValue;
            }
        } else {
            // For non-numeric fields, update directly
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Ensure total is calculated before submitting
        const dataToSubmit = {
            ...formData,
            total: formData.stock * formData.price
        };
        await onSubmit(dataToSubmit);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full p-6 md:p-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="space-y-1">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {Kartu ? 'Edit Kartu' : 'Buat Kartu Baru'}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Isi informasi di bawah ini untuk {Kartu ? 'update' : 'create'} your kartu
                            </p>
                        </div>
                        <button
                            onClick={onCancel}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Form Fields */}
                        <div className="space-y-8">
                            <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-[var(--border-color)]">
                                <div className="space-y-5">
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {/* Title */}
                                        <div className="form-control">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Judul
                                            </label>
                                            <input
                                                type="text"
                                                id="title"
                                                name="title"
                                                value={formData.title}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                                placeholder="Masukan Judul"
                                            />
                                        </div>

                                        {/* Brand */}
                                        <div className="form-control">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Provider
                                            </label>
                                            <select
                                                id="brand"
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                                disabled={loadingBrands}
                                            >
                                                <option value="">Select Provider</option>
                                                {brandOptions.map((brand) => (
                                                    <option key={brand.id} value={brand.title}>
                                                        {brand.title}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        {/* Stock */}
                                        <div className="form-control">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Stock
                                            </label>
                                            <input
                                                type="text"
                                                id="stock"
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                                placeholder="Masukan Stock"
                                            />
                                        </div>

                                        {/* Price */}
                                        <div className="form-control">
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                                Harga
                                            </label>
                                            <input
                                                type="text"
                                                id="price"
                                                name="price"
                                                value={formData.price ? formatPrice(formData.price) : ''}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                                placeholder="Masukan harga"
                                            />
                                        </div>
                                    </div>

                                    {/* Total (read-only) */}
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Total Stock * Harga
                                        </label>
                                        <input
                                            type="text"
                                            id="total"
                                            name="total"
                                            value={formatPrice(formData.total)}
                                            readOnly
                                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-gray-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:shadow-md font-medium"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 hover:shadow-indigo-100 hover:shadow-lg font-medium flex items-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        <span>Saving Changes...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span>{Kartu ? 'Save Changes' : 'Create'}</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
} 