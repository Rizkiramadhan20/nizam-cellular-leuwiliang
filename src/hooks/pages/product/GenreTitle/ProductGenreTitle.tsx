"use client"

import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import { FetchGenreTitle } from '@/hooks/pages/product/GenreTitle/lib/FetchGenreTitle'

import { ProductType } from '@/hooks/pages/product/product/types/Product'

import Link from 'next/link'

import { FormatSlug } from "@/base/helper/FormatSlug"

import { FormatRupiah } from "@/base/helper/FormatRupiah"

import ProductTypeCategorySkelaton from "@/hooks/pages/product/GenreTitle/ProductGenreTitleSkelaton"

export default function ProductTypeCategory({ typeCategory, genreTitle }: { typeCategory: string, genreTitle: string }) {
    const [products, setProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [sortBy, setSortBy] = useState<string>('')
    const [selectedType, setSelectedType] = useState<string>('')
    const [allTypes, setAllTypes] = useState<string[]>([])
    const [stockFilter, setStockFilter] = useState<string>('all')
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [expandedSections, setExpandedSections] = useState({
        price: true,
        stock: true,
        type: true
    })

    useEffect(() => {
        const unsubscribe = FetchGenreTitle(typeCategory, genreTitle, (data) => {
            let sortedData = [...data]; // Create a copy of the data to avoid mutating the original

            // Apply search filter
            if (searchQuery) {
                const query = searchQuery.toLowerCase().trim();
                const searchWords = query.split(/\s+/); // Split by whitespace

                sortedData = sortedData.filter(product => {
                    const productTitle = product.title.toLowerCase();
                    return searchWords.every(word => productTitle.includes(word));
                });
            }

            // Apply sorting based on sortBy state
            if (sortBy === 'price-low-high') {
                sortedData.sort((a, b) => a.price - b.price);
            } else if (sortBy === 'price-high-low') {
                sortedData.sort((a, b) => b.price - a.price);
            } else {
                // Default sort by newest first
                sortedData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            }

            // Apply type filter if selected
            if (selectedType) {
                sortedData = sortedData.filter(product => product.typeTitle === selectedType);
            }

            // Apply stock filter
            if (stockFilter === 'best-selling') {
                sortedData.sort((a, b) => b.sold - a.sold);
            }

            // Update all available types
            const uniqueTypes = [...new Set(data.map(item => item.typeTitle))];
            setAllTypes(uniqueTypes);

            setProducts(sortedData);
            setIsLoading(false);
        });

        return () => {
            unsubscribe();
        };
    }, [genreTitle, typeCategory, sortBy, selectedType, stockFilter, searchQuery]);

    if (isLoading) {
        return <ProductTypeCategorySkelaton />
    }

    return (
        <section className='min-h-full py-10'>
            <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6 lg:gap-8">
                    <aside className="lg:sticky lg:top-24 lg:h-fit overflow-y-auto bg-background rounded-xl shadow-sm p-6 border border-[var(--border-color)]">
                        <div className="space-y-6">
                            {/* Range Price */}
                            <div className="border-b border-gray-100">
                                <button
                                    className="flex items-center justify-between w-full group"
                                    onClick={() => setExpandedSections(prev => ({ ...prev, price: !prev.price }))}
                                >
                                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">SORT BY PRICE</h3>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 text-gray-400 group-hover:text-primary transition duration-300 ${expandedSections.price ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <div
                                    className={`mt-4 space-y-3 transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.price
                                        ? 'max-h-[500px] opacity-100'
                                        : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="price-sort"
                                            className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                            checked={sortBy === ''}
                                            onChange={() => setSortBy('')}
                                        />
                                        <span className="text-sm text-gray-600">All</span>
                                    </label>

                                    <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="price-sort"
                                            className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                            checked={sortBy === 'price-low-high'}
                                            onChange={() => setSortBy('price-low-high')}
                                        />
                                        <span className="text-sm text-gray-600">Price: Low to High</span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="price-sort"
                                            className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                            checked={sortBy === 'price-high-low'}
                                            onChange={() => setSortBy('price-high-low')}
                                        />
                                        <span className="text-sm text-gray-600">Price: High to Low</span>
                                    </label>
                                </div>
                            </div>

                            {/* Stock */}
                            <div className="border-b border-gray-100">
                                <button
                                    className="flex items-center justify-between w-full group"
                                    onClick={() => setExpandedSections(prev => ({ ...prev, stock: !prev.stock }))}
                                >
                                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">STOCK</h3>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 text-gray-400 group-hover:text-primary transition duration-300 ${expandedSections.stock ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div
                                    className={`mt-4 space-y-3 transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.stock
                                        ? 'max-h-[500px] opacity-100'
                                        : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="stock-filter"
                                            className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                            checked={stockFilter === 'all'}
                                            onChange={() => setStockFilter('all')}
                                        />
                                        <span className="text-sm text-gray-600">All</span>
                                    </label>
                                    <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="stock-filter"
                                            className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                            checked={stockFilter === 'best-selling'}
                                            onChange={() => setStockFilter('best-selling')}
                                        />
                                        <span className="text-sm text-gray-600">Best Selling</span>
                                    </label>
                                </div>
                            </div>

                            {/* Type Product */}
                            <div className="border-b border-gray-100">
                                <button
                                    className="flex items-center justify-between w-full group"
                                    onClick={() => setExpandedSections(prev => ({ ...prev, type: !prev.type }))}
                                >
                                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors">RAGAM PRODUK</h3>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-5 w-5 text-gray-400 group-hover:text-primary transition duration-300 ${expandedSections.type ? 'rotate-180' : ''}`}
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <div
                                    className={`mt-4 space-y-3 transition-all duration-300 ease-in-out overflow-hidden ${expandedSections.type
                                        ? 'max-h-[500px] opacity-100'
                                        : 'max-h-0 opacity-0'
                                        }`}
                                >
                                    <label className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="type-filter"
                                            className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                            checked={selectedType === ''}
                                            onChange={() => setSelectedType('')}
                                        />
                                        <span className="text-sm text-gray-600">Semua</span>
                                    </label>
                                    {
                                        allTypes.map((typeTitle) => (
                                            <label key={typeTitle} className="flex items-center space-x-3 cursor-pointer hover:text-primary transition-colors">
                                                <input
                                                    type="radio"
                                                    name="type-filter"
                                                    className="form-radio h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                                    checked={selectedType === typeTitle}
                                                    onChange={() => setSelectedType(typeTitle)}
                                                />
                                                <span className="text-sm text-gray-600">{typeTitle}</span>
                                            </label>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </aside>

                    <article>
                        <div className="mb-8">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        className="w-full px-4 py-3 pl-12 pr-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <svg
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>

                                <div className='flex items-center space-x-3 justify-center w-full sm:w-80 bg-white p-3 rounded-xl border border-gray-200'>
                                    <h3 className='text-base sm:text-lg font-medium text-gray-900'>Total Produk</h3>
                                    <span className='text-sm font-semibold px-3 py-1.5 rounded-full bg-primary text-white'>
                                        {products.length} produk
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {products.map((product) => (
                                <Link
                                    href={`/product/${FormatSlug(product.typeCategory)}/${FormatSlug(product.genreTitle)}/${FormatSlug(product.typeTitle)}/${FormatSlug(product.slug)}`}
                                    key={product.id}
                                    className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-200 hover:border-primary/20 hover:shadow-lg"
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                                        <Image
                                            src={product.imageUrl}
                                            alt={product.title}
                                            quality={100}
                                            loading='lazy'
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-4 left-4">
                                            <span className='capitalize bg-primary text-white text-xs font-semibold py-1.5 px-3 rounded-full shadow-md'>
                                                {product.genreTitle}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-white">
                                        <h1 className='text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300'>
                                            {product.title}
                                        </h1>

                                        <p className='text-sm text-gray-600 line-clamp-2 mb-4'>{product.description}</p>

                                        <div className='flex items-center justify-between'>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-base font-semibold text-primary">Rp</span>
                                                <span className='text-base font-semibold text-primary'>
                                                    {FormatRupiah(product.price).replace('Rp', '')}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-1.5">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                                <span className='text-sm text-gray-500'>
                                                    {product.stock}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}