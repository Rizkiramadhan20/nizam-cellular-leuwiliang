import React from 'react'

import OwnerLayout from '@/hooks/dashboard/super-admins/handphone/owner/OwnerLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pemilik Handphone | Nizam Cellular Leuwiliang",
  description: "Halaman ini digunakan untuk melihat pemilik handphone",
}

export default function page() {
  return (
    <OwnerLayout />
  )
}