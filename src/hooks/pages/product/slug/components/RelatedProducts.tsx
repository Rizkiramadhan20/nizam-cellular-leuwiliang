import React from 'react'

import ProductCard from "@/hooks/pages/product/slug/components/ProductCard"

import { ProductType } from '@/hooks/pages/product/product/types/Product'

interface RelatedProductsProps {
    relatedProducts: ProductType[]
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {
    return (
        <div>
            <h2 className='text-xl font-medium text-gray-900 mb-4 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                Related Products
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
                {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
            </div>
        </div>
    )
} 