"use client"

import React, { useState, useEffect, Fragment } from 'react'

import { FetchProduct } from "@/hooks/pages/product/product/lib/FetchProduct"

import { ProductType } from "@/hooks/pages/product/product/types/Product"

import ProductSkelaton from "@/hooks/pages/product/product/ProductSkelaton"

import { BannerType } from "@/hooks/pages/product/product/banner/types/Banner"

import { FetchBanner } from "@/hooks/pages/product/product/banner/lib/FetchBanner"

import BannerSwiper from '@/hooks/pages/product/product/banner/BannerSwiper'

import CategoryGrid from '@/hooks/pages/product/product/components/CategoryGrid'

import LatestProducts from '@/hooks/pages/product/product/components/LatestProducts'

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
        <Fragment>
            <div className='pt-24 container px-4 sm:px-6 lg:px-8 xl:px-10'>
                <BannerSwiper banners={banner} />
            </div>

            <section className='min-h-screen py-12 sm:py-16'>
                <div className="container px-4 sm:px-6 lg:px-8 xl:px-10">
                    <CategoryGrid products={product} />
                    <LatestProducts products={product} />
                </div>
            </section>
        </Fragment>
    )
}
