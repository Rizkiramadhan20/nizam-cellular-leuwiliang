import React from 'react'

import BrandLayout from '@/hooks/dashboard/super-admins/voucher/kartu/brand/BrandLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Merek Perdana | Nizam Cellular Leuwiliang",
  description: "Halaman ini digunakan untuk melihat jenis perdana",
}

export default function page() {
  return (
    <BrandLayout />
  )
}