import React from 'react'

import FaqsLayout from '@/hooks/dashboard/super-admins/layout/faqs/FaqsLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "FAQS | Nizam Cellular Leuwiliang",
  description: "Halaman faqs super admins",
}

export default function page() {
  return (
    <FaqsLayout />
  )
}