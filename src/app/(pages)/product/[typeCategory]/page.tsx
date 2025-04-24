import type { Metadata } from 'next'

import { Fragment } from 'react'

import Script from "next/script";

import ProductTypeCategory from '@/hooks/pages/product/TypeCategory/ProductTypeCategory'

import { getProductMetadata } from '@/hooks/pages/product/TypeCategory/meta/metadata'

import ProductTypeHero from '@/hooks/pages/product/TypeCategory/ProductCategoryHero'

type Props = {
    params: Promise<{ typeCategory: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProductMetadata({ params: { typeCategory: resolvedParams.typeCategory } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return (
        <Fragment>
            <Script id="json-ld-product-category" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `Products - ${resolvedParams.typeCategory} - Nizam Cellular Leuwiliang`,
                    "description": `Koleksi project ${resolvedParams.typeCategory} terbaik dari Nizam Cellular Leuwiliang`,
                    "url": `https://nizamcellularleuwiliang.my.id/product/${resolvedParams.typeCategory}`,
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Nizam Cellular Leuwiliang",
                        "url": "https://nizamcellularleuwiliang.my.id"
                    },
                    "about": {
                        "@type": "Thing",
                        "name": `Products - ${resolvedParams.typeCategory}`,
                        "description": `Product kategori ${resolvedParams.typeCategory} oleh Nizam Cellular Leuwiliang`
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
                                "name": resolvedParams.typeCategory,
                                "item": `https://nizamcellularleuwiliang.my.id/product/${resolvedParams.typeCategory}`
                            }
                        ]
                    }
                })}
            </Script>

            <ProductTypeHero typeCategory={resolvedParams.typeCategory} />
            <ProductTypeCategory typeCategory={resolvedParams.typeCategory} />
        </Fragment>
    )
}