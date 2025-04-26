import React from 'react'

import SecurityLayout from '@/hooks/dashboard/super-admins/settings/security/SecurityLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Profile | Nizam Cellular Leuwiliang',
    description: 'Halaman ini digunakan untuk mengatur profil pengguna',
}

export default function page() {
    return (
        <SecurityLayout />
    )
}
