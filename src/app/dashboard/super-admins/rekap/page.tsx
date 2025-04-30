import React from 'react'

import ProductLayout from '@/hooks/dashboard/super-admins/rekap/rekap/RekapLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Rekaputasi | Nizam Cellular Leuwiliang",
    description: "Halaman Product untuk super admin",
}

export default function page() {
    return (
        <ProductLayout />
    )
}