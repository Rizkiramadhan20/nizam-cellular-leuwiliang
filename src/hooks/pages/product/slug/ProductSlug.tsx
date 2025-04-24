"use client"

import React, { useState, useEffect } from 'react'

import { FetchSlug } from '@/hooks/pages/product/slug/lib/FetchSlug'

import { FetchRelatedProduct } from '@/hooks/pages/product/slug/lib/FetchSlug'

import { ProductType } from '@/hooks/pages/product/product/types/Product'

import ProductSlugSkelaton from "@/hooks/pages/product/slug/ProductSlugSkelaton"

import ProductSlugNotFound from "@/hooks/pages/product/slug/ProductSlugNotFound"

import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase/firebase'

import ProductImages from '@/hooks/pages/product/slug/components/ProductImages'

import ProductInfo from '@/hooks/pages/product/slug/components/ProductInfo'

import ProductAuthor from '@/hooks/pages/product/slug/components/ProductAuthor'

import ProductDescription from '@/hooks/pages/product/slug/components/ProductDescription'

import ProductCategory from '@/hooks/pages/product/slug/components/ProductCategory'

import RelatedProducts from '@/hooks/pages/product/slug/components/RelatedProducts'

export default function ProductSlug({ slug }: { slug: string }) {
    const [products, setProducts] = useState<ProductType[]>([])
    const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [authorPhone, setAuthorPhone] = useState("")

    useEffect(() => {
        const unsubscribe = FetchSlug(slug, (data) => {
            setProducts(data)
            setIsLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [slug])

    useEffect(() => {
        const unsubscribe = FetchRelatedProduct(slug, (data) => {
            setRelatedProducts(data)
        })

        return () => {
            unsubscribe()
        }
    }, [slug])

    useEffect(() => {
        const fetchAuthorPhone = async () => {
            if (products.length > 0) {
                const product = products.find((p) => p.slug === slug)
                if (product) {
                    const accountRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string, product.author.uid)
                    try {
                        const accountSnap = await getDoc(accountRef)
                        if (accountSnap.exists()) {
                            const accountData = accountSnap.data()
                            setAuthorPhone(accountData.phoneNumber || '')
                        }
                    } catch (error) {
                        console.error('Error fetching author phone:', error)
                    }
                }
            }
        }

        fetchAuthorPhone()
    }, [products, slug])

    console.log(products)

    if (isLoading) {
        return (
            <ProductSlugSkelaton />
        )
    }

    const product = products.find((product) => product.slug === slug)

    if (!product) {
        return (
            <ProductSlugNotFound slug={slug} />
        )
    }

    return (
        <section className='min-h-full py-10 pt-28'>
            <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-[0.8fr,1fr] gap-8 lg:gap-16">
                    <ProductImages images={product.images} title={product.title} />

                    <ProductInfo
                        title={product.title}
                        genreTitle={product.genreTitle}
                        typeTitle={product.typeTitle}
                        price={product.price}
                        stock={product.stock}
                        sold={product.sold}
                        description={product.description}
                        authorPhone={authorPhone}
                    />
                </div>

                <div className='mt-16 pt-8 border-t border-gray-200'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
                        <div>
                            <ProductAuthor author={product.author} />
                            <ProductDescription content={product.content} />
                        </div>

                        <div>
                            <ProductCategory
                                typeCategory={product.typeCategory}
                                icon={product.icon}
                                title={product.title}
                            />
                            <RelatedProducts relatedProducts={relatedProducts} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}