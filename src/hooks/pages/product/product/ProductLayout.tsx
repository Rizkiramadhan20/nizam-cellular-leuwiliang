"use client"

import React, { useState, useEffect } from 'react'

import { FetchProduct } from "@/hooks/pages/product/product/lib/FetchProduct"

import { ProductType } from "@/hooks/pages/product/product/types/Product"

import ProductSkelaton from "@/hooks/pages/product/product/ProductSkelaton"

import { BannerType } from "@/hooks/pages/product/product/banner/types/Banner"

import { FetchBanner } from "@/hooks/pages/product/product/banner/lib/FetchBanner"

import Image from 'next/image'

import { FormatSlug } from "@/base/helper/FormatSlug"

import Link from 'next/link'

import { FormatRupiah } from "@/base/helper/FormatRupiah"

import BannerSwiper from '@/hooks/pages/product/product/banner/BannerSwiper'

export default function ProductLayout() {
    const [product, setProduct] = useState<ProductType[]>([]);
    const [banner, setBanner] = useState<BannerType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribeContact = FetchProduct((newProduct) => {
            setProduct(newProduct);
            setLoading(false);
        });

        const unsubscribeTestimonials = FetchBanner((newBanner) => {
            setBanner(newBanner);
            setLoading(false);
        });

        return () => {
            unsubscribeContact();
            unsubscribeTestimonials();
        };
    }, []);

    if (loading) {
        return <ProductSkelaton />;
    }

    return (
        <>
            <div className='pt-28 container px-4 sm:px-6 lg:px-8 xl:px-10'>
                <BannerSwiper banners={banner} />
            </div>

            <section className='min-h-screen py-12 sm:py-16'>
                <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                        {
                            product.filter((item, index, self) =>
                                index === self.findIndex((t) => t.typeCategory === item.typeCategory)
                            ).map((product) => (
                                <Link
                                    href={`/product/${FormatSlug(product.typeCategory)}`}
                                    key={product.id}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            src={product.icon}
                                            alt={product.title}
                                            quality={100}
                                            loading='lazy'
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                                        <h1 className='text-white text-lg sm:text-xl font-bold capitalize transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                                            {product.typeCategory}
                                        </h1>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>

                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-10">Produk Terbaru</h2>
                        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                            {
                                product
                                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                                    .reduce((acc: ProductType[], current) => {
                                        const categoryCount = acc.filter(item => item.typeCategory === current.typeCategory).length;
                                        if (categoryCount < 2) {
                                            acc.push(current);
                                        }
                                        return acc;
                                    }, [])
                                    .slice(0, 10)
                                    .map((product) => (
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
                                                        {product.typeCategory}
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
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
