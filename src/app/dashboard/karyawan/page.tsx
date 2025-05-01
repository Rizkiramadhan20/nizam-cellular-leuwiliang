import React from 'react'

import KaryawanLayout from '@/hooks/dashboard/super-admins/accounts/karyawan/KaryawanLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Dashboard | Nizam Cellular Leuwiliang",
    description: "Halaman ini digunakan untuk melihat dashboard",
}

export default function page() {
    return (
        <KaryawanLayout />
    )
}
