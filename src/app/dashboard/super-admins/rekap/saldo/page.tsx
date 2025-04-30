import React from 'react'

import SaldoLayout from '@/hooks/dashboard/super-admins/rekap/saldo/SaldoLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Saldo Electrik | Nizam Cellular Leuwiliang",
    description: "Halaman Saldo Electrik untuk super admin",
}

export default function page() {
    return (
        <SaldoLayout />
    )
}