import React from 'react'

import BrandLayout from '@/hooks/dashboard/super-admins/voucher/brand/BrandLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Merek Vocher | Nizam Cellular Leuwiliang",
  description: "Halaman ini digunakan untuk melihat jenis voucher",
}

export default function page() {
  return (
    <BrandLayout />
  )
}