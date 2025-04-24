import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { FormatSlug } from "@/base/helper/FormatSlug"

import { ProductCategoryProps } from '@/hooks/pages/product/slug/types/slug'

export default function ProductCategory({ typeCategory, icon, title }: ProductCategoryProps) {
    return (
        <div className='mb-8'>
            <h2 className='text-xl font-medium text-gray-900 mb-4 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                </svg>
                Category
            </h2>
            <Link
                href={`/product/${FormatSlug(typeCategory)}`}
                className='flex items-center gap-4 p-6 bg-gray-50 rounded-lg border border-[var(--border-color)] hover:bg-gray-100 transition-colors'
            >
                <div className='relative w-12 h-12'>
                    <Image
                        src={icon}
                        alt={title}
                        fill
                        className='object-contain'
                    />
                </div>
                <span className='text-gray-600 capitalize font-medium'>{typeCategory}</span>
            </Link>
        </div>
    )
} 