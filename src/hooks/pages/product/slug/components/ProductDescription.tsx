import React from 'react'

import { ProductDescriptionProps } from '@/hooks/pages/product/slug/types/slug'

export default function ProductDescription({ content }: ProductDescriptionProps) {
    return (
        <div>
            <h2 className='text-xl font-medium text-gray-900 mb-4 flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                Description
            </h2>
            <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none bg-gray-50 p-6 rounded-lg border border-[var(--border-color)]'>
                <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none 
                    prose-headings:text-gray-900 
                    prose-p:text-gray-700 
                    prose-strong:text-gray-900 
                    prose-a:text-blue-600 hover:prose-a:text-blue-800
                    
                    [&_h3]:text-xl sm:[&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mb-1 sm:[&_h3]:mb-2 [&_h3]:mt-3 sm:[&_h3]:mt-4
                    
                    [&_p]:mb-1 sm:[&_p]:mb-2 [&_p]:leading-relaxed [&_p]:text-base sm:[&_p]:text-lg
                    [&_p:empty]:hidden
                    
                    [&_ol]:pl-0 [&_ol]:list-none [&_ol]:space-y-0.5 sm:[&_ol]:space-y-1 [&_ol]:my-1 sm:[&_ol]:my-2
                    [&_ul]:pl-0 [&_ul]:list-none [&_ul]:space-y-0.5 sm:[&_ul]:space-y-1 [&_ul]:my-1 sm:[&_ul]:my-2
                    
                    [&_li]:relative [&_li]:pl-5 sm:[&_li]:pl-6 [&_li]:text-gray-700
                    
                    [&_li[data-list=bullet]]:before:content-["•"]
                    [&_li[data-list=bullet]]:before:absolute
                    [&_li[data-list=bullet]]:before:left-0
                    [&_li[data-list=bullet]]:before:text-gray-500
                    [&_li[data-list=bullet]]:before:font-bold
                    [&_li[data-list=bullet]]:before:text-lg sm:[&_li[data-list=bullet]]:before:text-xl
                    
                    [&_li[data-list=ordered]]:before:absolute
                    [&_li[data-list=ordered]]:before:left-0
                    [&_li[data-list=ordered]]:before:text-gray-700
                    [&_li[data-list=ordered]]:before:font-semibold
                    [&_li[data-list=ordered]]:before:counter-reset
                    [&_li[data-list=ordered]]:before:content-[counter(list-item)"."]
                    
                    [&_strong]:text-gray-900 [&_strong]:font-semibold
                    
                    [&_.ql-ui]:hidden
                    
                    [&_a]:text-blue-600 [&_a]:no-underline hover:[&_a]:underline
                    
                    [&_img]:my-2 sm:[&_img]:my-3 [&_img]:rounded-lg sm:[&_img]:rounded-xl [&_img]:shadow-md sm:[&_img]:shadow-lg'
                    dangerouslySetInnerHTML={{
                        __html: content || ''
                    }}
                />
            </div>
        </div>
    )
} 