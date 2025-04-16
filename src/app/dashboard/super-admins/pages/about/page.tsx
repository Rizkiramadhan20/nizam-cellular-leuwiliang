import React from 'react'

import AboutLayout from '@/hooks/dashboard/super-admins/pages/about/AboutLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About | Nizam Cellular Leuwiliang",
  description: "Halaman About untuk super admin",
}

export default function page() {
  return (
    <AboutLayout />
  )
}