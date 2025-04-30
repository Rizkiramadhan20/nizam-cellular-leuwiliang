import React from 'react'

import PiutangLayout from '@/hooks/dashboard/super-admins/rekap/piutang/PiutangLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Piutang | Nizam Cellular Leuwiliang",
    description: "Halaman Piutang untuk super admin",
}

export default function page() {
    return (
        <PiutangLayout />
    )
}