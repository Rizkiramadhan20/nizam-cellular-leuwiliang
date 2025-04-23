import React from 'react'

import ProductLogoLayout from '@/hooks/dashboard/super-admins/product/logo/ProductLogoLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Product Logo | Nizam Cellular Leuwiliang",
    description: "Halaman Product Logo untuk super admin",
}

export default function page() {
    return (
        <ProductLogoLayout />
    )
}