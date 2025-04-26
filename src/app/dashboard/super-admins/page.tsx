import React from 'react'

import SuperAdminsLayout from '@/hooks/dashboard/super-admins/SuperAdminsLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Dashboard | Nizam Cellular Leuwiliang",
    description: "Halaman ini digunakan untuk melihat dashboard",
}

export default function page() {
    return (
        <SuperAdminsLayout />
    )
}
