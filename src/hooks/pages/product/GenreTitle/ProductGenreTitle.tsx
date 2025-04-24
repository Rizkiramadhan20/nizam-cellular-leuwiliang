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

    useEffect(() => {
        const unsubscribe = FetchGenreTitle(typeCategory, genreTitle, (data) => {
            setProducts(data)
            setIsLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [genreTitle, typeCategory])

    if (isLoading) {
        return <ProductTypeCategorySkelaton />
    }

    return (
        <section className='min-h-full bg-gradient-to-b from-blue-50/50 via-white to-white py-10'>
            <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
                <div className='mt-10'>
                    <h2 className="text-2xl font-bold mb-10 capitalize">Product berdasarkan Kategori: {genreTitle}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {products.slice(0, 10).map((product) => (
                            <Link
                                href={`/product/${FormatSlug(product.typeCategory)}/${FormatSlug(product.genreTitle)}/${FormatSlug(product.typeTitle)}/${FormatSlug(product.slug)}`}
                                key={product.id}
                                className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md"
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
                                    <div className="absolute bottom-4 left-2">
                                        <span className='capitalize bg-primary text-white text-xs font-semibold py-1.5 px-3 rounded-full shadow-md'>
                                            {product.genreTitle}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 bg-white">
                                    <h1 className='text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300'>
                                        {product.title}
                                    </h1>

                                    <div className='flex items-center justify-between mt-4'>
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
                </div>
            </div>
        </section>
    )
}