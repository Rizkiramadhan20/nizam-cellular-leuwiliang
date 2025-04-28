import React from 'react'

import HandphoneLayout from '@/hooks/dashboard/super-admins/handphone/handphone/HandphoneLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Handphone | Nizam Cellular Leuwiliang",
  description: "Halaman ini digunakan untuk melihat daftar handphone",
}

export default function page() {
  return (
    <HandphoneLayout />
  )
}