import React from 'react'

import ProductGenreLayout from '@/hooks/dashboard/super-admins/product/genre/ProductGenreLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Product Genre | Nizam Cellular Leuwiliang",
    description: "Halaman Product Genre untuk super admin",
}

export default function page() {
    return (
        <ProductGenreLayout />
    )
}