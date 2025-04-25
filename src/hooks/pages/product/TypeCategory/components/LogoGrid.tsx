import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { FormatSlug } from "@/base/helper/FormatSlug"

import { LogoGridProps } from '@/hooks/pages/product/TypeCategory/types/TypeCategory'

export default function LogoGrid({ products }: LogoGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products
                .filter((product, index, self) =>
                    index === self.findIndex((p) => p.logo === product.logo)
                )
                .map((product) => {
                    const productCount = products.filter(p => p.genreTitle === product.genreTitle).length;
                    return (
                        <Link
                            href={`/product/${FormatSlug(product.typeCategory)}/${FormatSlug(product.genreTitle)}`}
                            key={product.id}
                            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative aspect-square">
                                <Image
                                    src={product.logo}
                                    alt={product.genreTitle}
                                    quality={100}
                                    loading='lazy'
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                <h1 className='text-white text-lg sm:text-xl font-bold capitalize transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                                    {product.genreTitle}
                                </h1>
                                <p className='text-white/80 text-sm mt-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                                    {productCount} Products
                                </p>
                            </div>
                        </Link>
                    );
                })}
        </div>
    )
} 