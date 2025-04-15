import React from 'react'

import { Metadata } from 'next'

import SigninLayout from '@/hooks/pages/(auth)/signin/SigninLayout'

export const metadata: Metadata = {
  title: 'Sign In | Nizam Cellular Leuwiliang',
  description: 'Halaman login untuk mengakses akun Anda',
}

export default function page() {
  return (
    <SigninLayout />
  )
}
