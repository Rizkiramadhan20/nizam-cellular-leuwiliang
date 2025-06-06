"use client"

import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { IoIosArrowForward } from 'react-icons/io'

import { motion, useScroll, useTransform } from 'framer-motion'

import banner from '@/base/assets/pages/product/category.jpg'

import { FetchGenreTitle } from '@/hooks/pages/product/GenreTitle/lib/FetchGenreTitle'

import { ProductType } from '@/hooks/pages/product/product/types/Product'

import ProductGenreTitleSkelaton from '@/hooks/pages/product/GenreTitle/ProductGenreTitleSkelaton'

import ProductGenreNotFound from '@/hooks/pages/product/GenreTitle/ProductGenreNotFound'

export default function ProductCategoryHero({ typeCategory, genreTitle }: { typeCategory: string, genreTitle: string }) {
    const [product, setProduct] = useState<ProductType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 250]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const titleY = useTransform(scrollY, [0, 300], [0, 100]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    useEffect(() => {
        const unsubscribe = FetchGenreTitle(typeCategory, genreTitle, (data) => {
            if (data && data.length > 0) {
                setProduct(data[0])
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [typeCategory, genreTitle])

    if (isLoading) {
        return <ProductGenreTitleSkelaton />
    }

    if (!product) {
        return <ProductGenreNotFound typeCategory={typeCategory} genreTitle={genreTitle} />
    }

    return (
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{ y }}
            >
                <Image
                    src={banner}
                    alt="banner"
                    className='w-full h-[130%] object-cover brightness-[0.85]'
                    priority
                    quality={100}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"
                    style={{ opacity }}
                />
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10"
                    style={{
                        opacity,
                        y: titleY,
                        scale,
                    }}
                >
                    <h3 className='text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg capitalize'>
                        {genreTitle}
                    </h3>
                    <div className="flex items-center gap-4 bg-white/10 px-8 py-3 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                            Home
                        </Link>

                        <IoIosArrowForward className="text-white/90 text-sm" />
                        <Link href="/product" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                            Product
                        </Link>

                        <IoIosArrowForward className="text-white/90 text-sm" />
                        <Link href={`/product/${product?.typeCategory}`} className='text-sm md:text-base text-white hover:text-primary transition-all duration-300 capitalize'>{product?.typeCategory}</Link>
                        <IoIosArrowForward className="text-white/90 text-sm" />
                        <span className='text-sm md:text-base text-white/80 capitalize'>{genreTitle}</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}