import React from 'react'

import ContactLayout from '@/hooks/dashboard/super-admins/pages/contact/ContactLayout'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Contact | Nizam Cellular Leuwiliang",
  description: "Halaman contact untuk super admin",
}

export default function page() {
  return (
    <ContactLayout />
  )
}