import React from 'react';

import { Handphone } from '../types/handphone';

interface SearchFilterProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedBrand: string;
    setSelectedBrand: (value: string) => void;
    selectedOwner: string;
    setSelectedOwner: (value: string) => void;
    availableBrands: string[];
    availableOwners: string[];
    handphones: Handphone[];
}

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
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Input */}
                <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Cari Ponsel..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Brand Filter */}
                <div>
                    <select
                        value={selectedBrand}
                        onChange={(e) => setSelectedBrand(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
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
                <div>
                    <select
                        value={selectedOwner}
                        onChange={(e) => setSelectedOwner(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-transparent"
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

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-500">
                Showing {handphones.length} handphone{handphones.length !== 1 ? 's' : ''}
            </div>
        </div>
    );
}
