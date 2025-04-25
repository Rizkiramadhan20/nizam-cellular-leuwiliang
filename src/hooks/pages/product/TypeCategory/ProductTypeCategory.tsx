"use client"

import React, { useState, useEffect, Fragment } from 'react'

import { FetchTypeCategory } from '@/hooks/pages/product/TypeCategory/lib/FetchTypeCategory'

import { ProductType } from '@/hooks/pages/product/product/types/Product'

import ProductTypeCategorySkelaton from "@/hooks/pages/product/TypeCategory/ProductTypeCategorySkelaton"

import ProductTypeHero from '@/hooks/pages/product/TypeCategory/ProductCategoryHero'

import LogoGrid from '@/hooks/pages/product/TypeCategory/components/LogoGrid'

import ProductGrid from '@/hooks/pages/product/TypeCategory/components/ProductGrid'

import ProductTypeNotFound from '@/hooks/pages/product/TypeCategory/ProductCategoryNotFound'

export default function ProductTypeCategory({ typeCategory }: { typeCategory: string }) {
    const [products, setProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = FetchTypeCategory(typeCategory, (data) => {
            setProducts(data)
            setIsLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [typeCategory])

    if (isLoading) {
        return (
            <ProductTypeCategorySkelaton />
        )
    }

    if (products.length === 0) {
        return <ProductTypeNotFound typeCategory={typeCategory} />
    }

    return (
        <Fragment>
            <ProductTypeHero typeCategory={typeCategory} isLoading={isLoading} />
            <section className='min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white py-10'>
                <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
                    <LogoGrid products={products} />
                    <ProductGrid products={products} typeCategory={typeCategory} />
                </div>
            </section>
        </Fragment>
    )
}