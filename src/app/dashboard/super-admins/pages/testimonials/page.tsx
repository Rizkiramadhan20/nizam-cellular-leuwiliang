import React from 'react'

import TestimonialsLayout from '@/hooks/dashboard/super-admins/pages/testimonials/TestimonialsLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Testimonials | Nizam Cellular Leuwiliang",
  description: "Halaman testimonials untuk super admin",
}

export default function page() {
  return (
    <TestimonialsLayout />
  )
}