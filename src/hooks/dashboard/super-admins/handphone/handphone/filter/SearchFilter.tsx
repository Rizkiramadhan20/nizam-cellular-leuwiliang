import React from 'react';

import { SearchFilterProps } from '@/hooks/dashboard/super-admins/handphone/handphone/types/handphone';

export default function SearchFilter({
    searchTerm,
    setSearchTerm,
    selectedBrand,
    setSelectedBrand,
    selectedOwner,
    setSelectedOwner,
    availableBrands,
    availableOwners,
    handphones
}: SearchFilterProps) {
    // Calculate totals by owner
    const totalsByOwner = handphones.reduce((acc, handphone) => {
        const owner = handphone.owner;
        const value = handphone.total || handphone.stock * handphone.price;

        if (!acc[owner]) {
            acc[owner] = {
                totalValue: 0,
                totalStock: 0
            };
        }

        acc[owner].totalValue += value;
        acc[owner].totalStock += handphone.stock;

        return acc;
    }, {} as Record<string, { totalValue: number; totalStock: number }>);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari Ponsel..."
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent text-sm sm:text-base"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Brand Filter */}
                <div>
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent text-sm sm:text-base"
                    >
                        <option value="">Semua Merek</option>
                        {availableBrands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Owner Filter */}
                <div className="sm:col-span-2 lg:col-span-1">
                    <select
                        value={selectedOwner}
                        onChange={(e) => setSelectedOwner(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent text-sm sm:text-base"
                    >
                        <option value="">Semua Pemilik</option>
                        {availableOwners.map((owner) => (
                            <option key={owner} value={owner}>
                                {owner}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results Count and Totals */}
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                <div className="whitespace-nowrap">
                    Menampilkan {handphones.length} handphone{handphones.length !== 1 ? 's' : ''}
                </div>

                <div className="flex flex-wrap gap-2">
                    {Object.entries(totalsByOwner).map(([owner, totals]) => (
                        <div key={owner} className="flex items-center gap-1 whitespace-nowrap">
                            <span className="font-medium text-gray-700">{owner}:</span>
                            <span className="text-indigo-600">{formatPrice(totals.totalValue)}</span>
                            <span className="text-gray-400">({totals.totalStock} pcs)</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
