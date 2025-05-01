import React from 'react'

import { Metadata } from 'next'

import SuperAdminsLayour from "@/hooks/dashboard/super-admins/accounts/super-admins/SuperAdminsLayour"

export const metadata: Metadata = {
    title: 'Super Admins | Nizam Cellular Leuwiliang',
    description: 'Halaman untuk mengelola accounts super admins',
}

export default function page() {
    return (
        <SuperAdminsLayour />
    )
}
