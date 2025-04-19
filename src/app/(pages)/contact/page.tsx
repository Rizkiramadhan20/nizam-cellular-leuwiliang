import React from 'react'

import { Metadata } from 'next'

import ContactLayout from "@/hooks/pages/contact/ContactLayout"

export const metadata: Metadata = {
    title: 'Contact | Nizam Cellular Leuwiliang',
    description: 'Contact page',
}

export default function page() {
    return (
        <ContactLayout />
    )
}
