import React from 'react'

import KonsultasiLayout from '@/hooks/dashboard/super-admins/layout/konsultasi/KonsultasiLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Konsultasi | Nizam Cellular Leuwiliang",
  description: "Halaman konsultasi untuk super admin",
}

export default function page() {
  return (
    <KonsultasiLayout />
  )
}