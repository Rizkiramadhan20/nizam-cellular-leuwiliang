import React from 'react'

import BannerLayout from '@/hooks/dashboard/super-admins/pages/banner/BannerLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Banner | Nizam Cellular Leuwiliang",
  description: "Halaman banner untuk super admin",
}

export default function page() {
  return (
    <BannerLayout />
  )
}