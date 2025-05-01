import React from 'react'

import { Metadata } from 'next'

import KaryawanLayout from "@/hooks/dashboard/super-admins/accounts/karyawan/KaryawanLayout"

export const metadata: Metadata = {
    title: 'Karyawan | Nizam Cellular Leuwiliang',
    description: 'Halaman untuk mengelola accounts karyawan',
}

export default function page() {
    return (
        <KaryawanLayout />
    )
}
