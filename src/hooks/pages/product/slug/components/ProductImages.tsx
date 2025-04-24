import React, { useState } from 'react'

import Image from 'next/image'

import { ProductImagesProps } from '@/hooks/pages/product/slug/types/slug'

export default function ProductImages({ images, title }: ProductImagesProps) {
    const [activeImage, setActiveImage] = useState(0)

    return (
        <aside className='space-y-4'>
            <div className='w-full aspect-[4/5] relative rounded-lg overflow-hidden bg-[#f7f7f7] border border-[var(--border-color)]'>
                <Image
                    src={images[activeImage]}
                    alt={`${title} - ${activeImage + 1}`}
                    fill
                    className='object-cover'
                    priority
                />
            </div>

            <div className='flex gap-2 overflow-x-auto pb-2'>
                {images.map((image, index) => (
                    <button
                        key={index}
                        className={`relative w-28 h-28 rounded-md overflow-hidden border-2 transition-all duration-200 flex-shrink-0 ${activeImage === index
                            ? 'border-black'
                            : 'border-transparent hover:border-gray-300'
                            }`}
                        onClick={() => setActiveImage(index)}
                    >
                        <Image
                            src={image}
                            alt={`${title} - ${index + 1}`}
                            fill
                            className='object-cover'
                        />
                    </button>
                ))}
            </div>
        </aside>
    )
} 