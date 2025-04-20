import React from 'react'

import ProductLayout from '@/hooks/dashboard/super-admins/product/product/ProductLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Product | Nizam Cellular Leuwiliang",
  description: "Halaman Product untuk super admin",
}

export default function page() {
  return (
    <ProductLayout />
  )
}