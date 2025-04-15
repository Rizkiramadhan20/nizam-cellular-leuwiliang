import { Metadata } from 'next'

import ForgotPasswordLayout from '@/hooks/pages/(auth)/forgot-password/ForgotPasswordLayout'

export const metadata: Metadata = {
  title: 'Forgot Password | Nizam Cellular Leuwiliang',
  description: 'Halaman untuk mereset password Anda',
}

export default function page() {
  return (
    <ForgotPasswordLayout />
  )
} 