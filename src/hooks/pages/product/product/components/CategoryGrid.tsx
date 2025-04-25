import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductType } from '../types/Product';
import { FormatSlug } from '@/base/helper/FormatSlug';

interface CategoryGridProps {
    products: ProductType[];
}

export default function CategoryGrid({ products }: CategoryGridProps) {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {products
                .filter((item, index, self) =>
                    index === self.findIndex((t) => t.typeCategory === item.typeCategory)
                )
                .map((categoryItem) => (
                    <Link
                        href={`/product/${FormatSlug(categoryItem.typeCategory)}`}
                        key={categoryItem.id}
                        className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="relative aspect-square">
                            <Image
                                src={categoryItem.icon}
                                alt={categoryItem.title}
                                quality={100}
                                loading='lazy'
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                            <h1 className='text-white text-lg sm:text-xl font-bold capitalize transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                                {categoryItem.typeCategory}
                            </h1>

                            <p className='text-white/80 text-sm transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300'>
                                {products.filter((item: ProductType) => item.typeCategory === categoryItem.typeCategory).length} Produk
                            </p>
                        </div>
                    </Link>
                ))}
        </div>
    );
} 