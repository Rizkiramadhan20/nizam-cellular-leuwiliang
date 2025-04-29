import React from 'react'

import KartuLayout from '@/hooks/dashboard/super-admins/voucher/kartu/kartu/KartuLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Kartu | Nizam Cellular Leuwiliang",
  description: "Halaman ini digunakan untuk melihat jenis kartu",
}

export default function page() {
  return (
    <KartuLayout />
  )
}