import React from 'react'

import { Metadata } from 'next'

import ProfileLayout from "@/hooks/dashboard/super-admins/settings/profile/ProfileLayout"

export const metadata: Metadata = {
    title: 'Profile | Nizam Cellular Leuwiliang',
    description: 'Halaman ini digunakan untuk mengatur profil pengguna',
}

export default function page() {
    return (
        <ProfileLayout />
    )
}
