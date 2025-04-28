import React from 'react'

import PulsaLayout from '@/hooks/dashboard/super-admins/voucher/voucher/PulsaLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pulsa | Nizam Cellular Leuwiliang",
  description: "Halaman ini digunakan untuk melihat daftar pulsa",
}

export default function page() {
  return (
    <PulsaLayout />
  )
}