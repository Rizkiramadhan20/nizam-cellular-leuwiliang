import type { Metadata } from 'next'

import { Fragment } from 'react'

import Script from "next/script";

import ProductSlug from '@/hooks/pages/product/slug/ProductSlug'

import { generateMetadata as getProductMetadata } from '@/hooks/pages/product/slug/meta/metadata'

type Props = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProductMetadata({ params: { slug: resolvedParams.slug } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return (
        <Fragment>
            <Script id="json-ld-product-category" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `Products - ${resolvedParams.slug} - Nizam Cellular Leuwiliang`,
                    "description": `Koleksi project ${resolvedParams.slug} terbaik dari Nizam Cellular Leuwiliang`,
                    "url": `https://nizamcellularleuwiliang.my.id/product/${resolvedParams.slug}`,
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Nizam Cellular Leuwiliang",
                        "url": "https://nizamcellularleuwiliang.my.id"
                    },
                    "about": {
                        "@type": "Thing",
                        "name": `Products - ${resolvedParams.slug}`,
                        "description": `Product kategori ${resolvedParams.slug} oleh Nizam Cellular Leuwiliang`
                    },
                    "provider": {
                        "@type": "Organization",
                        "name": "Nizam Cellular Leuwiliang",
                        "url": "https://nizamcellularleuwiliang.my.id"
                    },
                    "breadcrumb": {
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Product",
                                "item": "https://nizamcellularleuwiliang.my.id/product"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": resolvedParams.slug,
                                "item": `https://nizamcellularleuwiliang.my.id/product/${resolvedParams.slug}`
                            }
                        ]
                    }
                })}
            </Script>

            <ProductSlug slug={resolvedParams.slug} />
        </Fragment>
    )
}