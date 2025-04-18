import React from 'react'

import GalleryLayout from '@/hooks/dashboard/super-admins/layout/gallery/GalleryLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Gallery | Nizam Cellular Leuwiliang",
  description: "Halaman gallery untuk super admin",
}

export default function GalleryPage() {
  return (
    <GalleryLayout />
  )
}