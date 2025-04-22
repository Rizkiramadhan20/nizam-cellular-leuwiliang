"use client"

import React, { useState, useEffect } from 'react'

import { FetchProduct } from "@/hooks/pages/product/lib/FetchProduct"

import { ProductType } from "@/hooks/pages/product/types/Product"

import ProductSkelaton from "@/hooks/pages/product/ProductSkelaton"

export default function ProductLayout() {
    const [product, setProduct] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = FetchProduct((newProduct) => {
            setProduct(newProduct);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ProductSkelaton />;
    }

    return (
        <section className='min-h-screen py-28 md:py-32'>
            <div className="container px-4 sm:px-6 lg:px-10">
                <div>
                    {
                        product.filter((item, index, self) =>
                            index === self.findIndex((t) => t.typeCategory === item.typeCategory)
                        ).map((product) => (
                            <div key={product.id}>
                                <h1>{product.typeCategory}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}
