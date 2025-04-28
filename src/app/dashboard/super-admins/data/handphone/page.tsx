import React from 'react'

import HandphoneLayout from '@/hooks/dashboard/super-admins/data/handphone/HandphoneLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Handphone | Nizam Cellular Leuwiliang",
    description: "Halaman Handphone untuk super admin",
}

export default function page() {
    return (
        <HandphoneLayout />
    )
}