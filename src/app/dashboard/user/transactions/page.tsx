import React from 'react'

import TransactionLayout from '@/hooks/dashboard/users/transaction/transaction/TransactionLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Daftar Transaksi | Nizam Cellular Leuwiliang",
  description: "Halaman ini digunakan untuk melihat daftar transaksi",
}

export default function page() {
  return (
    <TransactionLayout />
  )
}