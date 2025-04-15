import React from 'react'

import ServicesLayout from '@/hooks/dashboard/super-admins/layout/services/ServicesLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Services | Nizam Cellular Leuwiliang",
  description: "Halaman services untuk super admin",
}

export default function page() {
  return (
    <ServicesLayout />
  )
}