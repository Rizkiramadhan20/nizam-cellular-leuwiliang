import React from 'react'

import BrandLayout from '@/hooks/dashboard/super-admins/handphone/brand/BrandLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Jenis Handphone | Nizam Cellular Leuwiliang",
  description: "Halaman ini digunakan untuk melihat jenis handphone",
}

export default function page() {
  return (
    <BrandLayout />
  )
}