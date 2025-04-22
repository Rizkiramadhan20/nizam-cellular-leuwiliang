import React from 'react'

import { Metadata } from 'next'

import ProductLayout from "@/hooks/pages/product/ProductLayout"

export const metadata: Metadata = {
    title: 'Product | Nizam Cellular Leuwiliang',
    description: 'Product page',
}

export default function page() {
    return (
        <ProductLayout />
    )
}
