import React from 'react'

import Image from 'next/image'

import { ProductAuthorProps } from '@/hooks/pages/product/slug/types/slug'

export default function ProductAuthor({ author }: ProductAuthorProps) {
    return (
        <div className='mb-8'>
            <h2 className='text-xl font-medium text-gray-900 mb-4 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                Author
            </h2>
            <div className='flex items-center gap-4 p-6 bg-gray-50 rounded-lg border border-[var(--border-color)]'>
                <div className='relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-gray-900'>
                    <Image
                        src={author.photoURL}
                        alt={author.name}
                        fill
                        className='object-cover'
                    />
                </div>
                <div className='space-y-1'>
                    <h3 className='font-medium text-gray-900'>{author.name}</h3>
                    <p className='text-gray-600'>{author.role}</p>
                </div>
            </div>
        </div>
    )
} 