import React from 'react'

import HomeLayout from '@/hooks/dashboard/super-admins/layout/home/HomeLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Home | Nizam Cellular Leuwiliang",
  description: "Halaman home untuk super admin",
}

export default function page() {
  return (
    <HomeLayout />
  )
}