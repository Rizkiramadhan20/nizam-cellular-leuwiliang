import React from 'react'

import UangLaciLayout from '@/hooks/dashboard/super-admins/rekap/uang-laci/UangLaciLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Uang Laci | Nizam Cellular Leuwiliang",
    description: "Halaman Uang Laci untuk super admin",
}

export default function page() {
    return (
        <UangLaciLayout />
    )
}