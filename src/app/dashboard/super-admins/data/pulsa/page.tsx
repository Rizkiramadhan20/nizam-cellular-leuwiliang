import React from 'react'

import PulsaLayout from '@/hooks/dashboard/super-admins/data/pulsa/PulsaLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Pulsa | Nizam Cellular Leuwiliang",
    description: "Halaman Pulsa untuk super admin",
}

export default function page() {
    return (
        <PulsaLayout />
    )
}