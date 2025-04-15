import React from 'react'

import { Metadata } from 'next'

import SignupLayout from '@/hooks/pages/(auth)/signup/SignupLayout'

export const metadata: Metadata = {
  title: 'Sign Up | Nizam Cellular Leuwiliang',
  description: 'Halaman daftar untuk membuat akun Anda',
}

export default function page() {
  return (
    <SignupLayout />
  )
}
