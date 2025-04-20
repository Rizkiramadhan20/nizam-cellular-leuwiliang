import React from 'react'

import ProductCategoryLayout from '@/hooks/dashboard/super-admins/product/category/ProductCategoryLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Product Category | Nizam Cellular Leuwiliang",
    description: "Halaman Product Category untuk super admin",
}

export default function page() {
    return (
        <ProductCategoryLayout />
    )
}