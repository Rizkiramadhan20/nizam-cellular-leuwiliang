import React from 'react'

import ProductTypeLayout from '@/hooks/dashboard/super-admins/product/type/ProductTypeLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Product Type | Nizam Cellular Leuwiliang",
    description: "Halaman Product Type untuk super admin",
}

export default function page() {
    return (
        <ProductTypeLayout />
    )
}