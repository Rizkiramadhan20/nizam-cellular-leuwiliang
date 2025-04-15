import React from 'react'

import SuperAdminsLayout from '@/hooks/dashboard/super-admins/SuperAdminsLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Dashboard Super Admin | Nizam Cellular Leuwiliang",
  description: "Halaman dashboard untuk super admin",
}

export default function page() {
  return (
    <SuperAdminsLayout />
  )
}