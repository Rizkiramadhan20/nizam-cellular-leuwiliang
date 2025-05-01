import React from 'react'

import { Metadata } from 'next'

import UsersLayout from "@/hooks/dashboard/super-admins/accounts/users/UsersLayout"

export const metadata: Metadata = {
    title: 'Users | Nizam Cellular Leuwiliang',
    description: 'Halaman untuk mengelola accounts users',
}

export default function page() {
    return (
        <UsersLayout />
    )
}
