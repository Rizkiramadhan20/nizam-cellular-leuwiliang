import React from 'react';

import { SearchFilterProps } from "@/hooks/dashboard/super-admins/product/product/types/Product"

export default function SearchFilter({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedGenre,
    setSelectedGenre,
    selectedType,
    setSelectedType,
    availableCategories,
    availableGenres,
    availableTypes,
    projects
}: SearchFilterProps) {
    return (
        <div className="bg-background rounded-xl border border-[var(--border-color)] p-6 mb-5">
            <div className="flex flex-col sm:flex-row gap-6 w-full">
                <div className="flex-1">
                    <div className="relative">
                        <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Category
                        </label>
                        <div className="relative">
                            <select
                                id="categoryFilter"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200"
                            >
                                <option value="">All Categories</option>
                                {availableCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative">
                        <label htmlFor="genreFilter" className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Genre
                        </label>
                        <div className="relative">
                            <select
                                id="genreFilter"
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200"
                            >
                                <option value="">All Genres</option>
                                {availableGenres
                                    .filter(genre => !selectedCategory || projects.some(p => p.typeCategory === selectedCategory && p.genreTitle === genre))
                                    .map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative">
                        <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Type
                        </label>
                        <div className="relative">
                            <select
                                id="typeFilter"
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 appearance-none transition-all duration-200"
                            >
                                <option value="">All Types</option>
                                {availableTypes
                                    .filter(type =>
                                        (!selectedCategory || projects.some(p => p.typeCategory === selectedCategory && p.typeTitle === type)) &&
                                        (!selectedGenre || projects.some(p => p.genreTitle === selectedGenre && p.typeTitle === type))
                                    )
                                    .map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="relative">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by title or category..."
                                className="block w-full pl-10 pr-10 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
