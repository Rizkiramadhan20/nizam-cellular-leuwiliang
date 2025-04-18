import React from 'react'

import { Metadata } from 'next'

import AboutLayout from "@/hooks/pages/about/AboutLayout"

export const metadata: Metadata = {
    title: 'About | Nizam Cellular Leuwiliang',
    description: 'About page',
}

export default function page() {
    return (
        <AboutLayout />
    )
}
