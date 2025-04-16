import React from 'react'

import Home from "@/components/ui/home/Home"

import Services from "@/components/ui/services/Services"

import Faqs from "@/components/ui/faqs/Faqs"

export default function page() {
  return (
    <main className='overflow-hidden'>
      <Home />
      <Services />
      <Faqs />
    </main>
  )
}
