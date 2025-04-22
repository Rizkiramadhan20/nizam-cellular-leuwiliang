import React from 'react'

import IconsLayout from '@/hooks/dashboard/super-admins/product/icons/IconsLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Icons | Nizam Cellular Leuwiliang",
    description: "Halaman icons product untuk super admin",
}

export default function page() {
    return (
        <IconsLayout />
    )
}