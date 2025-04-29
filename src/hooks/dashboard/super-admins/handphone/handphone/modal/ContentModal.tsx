import React, { useState, useEffect } from 'react';

import { Handphone } from '@/hooks/dashboard/super-admins/handphone/handphone/types/handphone';

import { useBrandHandphoneData } from '@/hooks/dashboard/super-admins/handphone/brand/lib/FetchBrandHandphone';

import { useOwnerHandphoneData } from '@/hooks/dashboard/super-admins/handphone/owner/lib/FetchOwnerHandphone';

interface HandphoneFormProps {
    handphone?: Handphone;
    onSubmit: (data: Omit<Handphone, 'id' | 'createdAt' | 'updatedAt'>) => Promise<boolean>;
    onCancel: () => void;
    isSubmitting?: boolean;
}

export default function HandphoneForm({
    handphone,
    onSubmit,
    onCancel,
    isSubmitting = false
}: HandphoneFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        brand: '',
        owner: '',
        stock: '',
        price: 0,
        total: 0,
        description: ''
    });

    // Fetch brand data from brand_handphone collection
    const { contents: brandOptions, isLoading: loadingBrands } = useBrandHandphoneData();

    // Fetch owner data from owner_handphone collection
    const { contents: ownerOptions, isLoading: loadingOwners } = useOwnerHandphoneData();

    useEffect(() => {
        if (handphone) {
            setFormData({
                title: handphone.title,
                brand: handphone.brand,
                owner: handphone.owner,
                stock: handphone.stock.toString(),
                price: handphone.price,
                total: handphone.total || handphone.stock * handphone.price,
                description: handphone.description || ''
            });
        }
    }, [handphone]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === 'price') {
            // Remove non-numeric characters
            const numericValue = String(value).replace(/[^\d]/g, '');

            if (numericValue) {
                const numberValue = parseInt(numericValue, 10);
                if (!isNaN(numberValue)) {
                    // Update the form data with the numeric value
                    setFormData(prev => {
                        const updatedData = {
                            ...prev,
                            [name]: numberValue
                        };

                        // Calculate total when price changes
                        const stockNumber = parseInt(prev.stock) || 0;
                        updatedData.total = stockNumber * updatedData.price;
                        return updatedData;
                    });

                    // Format the input value for display
                    e.target.value = formatPrice(numberValue);
                }
            } else {
                // If no numeric value, set to 0
                setFormData(prev => ({
                    ...prev,
                    [name]: 0,
                    total: 0
                }));
                e.target.value = '';
            }
        } else if (name === 'stock') {
            // For stock, just update the text value directly
            setFormData(prev => ({
                ...prev,
                [name]: value,
                total: prev.price * (parseInt(value) || 0)
            }));
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
        // Convert stock to number for submission
        const stockNumber = parseInt(formData.stock) || 0;
        const dataToSubmit = {
            ...formData,
            stock: stockNumber,
            total: stockNumber * formData.price
        };
        await onSubmit(dataToSubmit);
    };

    // Calculate total value
    const totalValue = (parseInt(formData.stock) || 0) * formData.price;

    // Format price for display
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID').format(price);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-gray-900">
                            {handphone ? 'Edit Data Handphone' : 'Buat Data Handphone Baru'}
                        </h3>
                        <p className="text-sm text-gray-500">
                            Isi informasi di bawah ini untuk {handphone ? 'update' : 'membuat'} handphone Anda
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
                    <div className="space-y-8">
                        <div className="bg-gray-50/50 p-6 rounded-2xl space-y-6 border border-[var(--border-color)]">
                            <div className="space-y-5">
                                <div className="form-control">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="title">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                        placeholder="Masukan Nama Ponsel"
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="description">
                                        Description (Optional)
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent resize-none h-24"
                                        placeholder="Masukan deskripsi handphone (optional)"
                                    />
                                </div>

                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="brand">
                                            Merk
                                        </label>
                                        <select
                                            id="brand"
                                            name="brand"
                                            required
                                            value={formData.brand}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                        >
                                            <option value="">Select a brand</option>
                                            {loadingBrands ? (
                                                <option value="" disabled>Loading brands...</option>
                                            ) : (
                                                brandOptions?.map((brand) => (
                                                    <option key={brand.id} value={brand.title}>
                                                        {brand.title}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>

                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="owner">
                                            Pemilik
                                        </label>
                                        <select
                                            id="owner"
                                            name="owner"
                                            required
                                            value={formData.owner}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                        >
                                            <option value="">Select an owner</option>
                                            {loadingOwners ? (
                                                <option value="" disabled>Loading owners...</option>
                                            ) : (
                                                ownerOptions?.map((owner) => (
                                                    <option key={owner.id} value={owner.title}>
                                                        {owner.title}
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="stock">
                                            Stock
                                        </label>
                                        <input
                                            id="stock"
                                            name="stock"
                                            type="text"
                                            required
                                            value={formData.stock}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                            placeholder="Masukkan jumlah stok"
                                        />
                                    </div>

                                    <div className="form-control">
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="price">
                                            Price
                                        </label>
                                        <input
                                            id="price"
                                            name="price"
                                            type="text"
                                            required
                                            value={formData.price ? formatPrice(formData.price) : ''}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                                            placeholder="Masukan Harga"
                                        />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                        Total Stock X Harga
                                    </label>
                                    <div className="w-full px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-gray-50 text-indigo-600 font-medium">
                                        {formatPrice(totalValue)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
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
                            disabled={isSubmitting}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition-all duration-200 disabled:opacity-50 hover:shadow-indigo-100 hover:shadow-lg font-medium flex items-center gap-2"
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
                                    <span>{handphone ? 'Save Changes' : 'Create'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
} 