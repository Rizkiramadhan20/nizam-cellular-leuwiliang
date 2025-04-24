import type { Metadata } from 'next'

import { Fragment } from 'react'

import Script from "next/script";

import ProductGenreTitle from '@/hooks/pages/product/GenreTitle/ProductGenreTitle'

import { getProductMetadata } from '@/hooks/pages/product/GenreTitle/meta/metadata'

import ProductTypeHero from '@/hooks/pages/product/GenreTitle/ProductGenreHero'

type Props = {
    params: Promise<{ typeCategory: string, genreTitle: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const resolvedParams = await params
    return getProductMetadata({ params: { typeCategory: resolvedParams.typeCategory, genreTitle: resolvedParams.genreTitle } })
}

export default async function Page({ params }: Props) {
    const resolvedParams = await params
    return (
        <Fragment>
            <Script id="json-ld-product-category" type="application/ld+json" strategy="afterInteractive">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": `Products - ${resolvedParams.typeCategory} - ${resolvedParams.genreTitle} - Space Digitalia`,
                    "description": `Koleksi project ${resolvedParams.genreTitle} terbaik dari Space Digitalia`,
                    "url": `https://nizamcellularleuwiliang.my.id/product/${resolvedParams.typeCategory}/${resolvedParams.genreTitle}`,
                    "isPartOf": {
                        "@type": "WebSite",
                        "name": "Space Digitalia",
                        "url": "https://nizamcellularleuwiliang.my.id/"
                    },
                    "about": {
                        "@type": "Thing",
                        "name": `Products - ${resolvedParams.typeCategory} - ${resolvedParams.genreTitle}`,
                        "description": `Product kategori ${resolvedParams.genreTitle} oleh Space Digitalia`
                    },
                    "provider": {
                        "@type": "Organization",
                        "name": "Space Digitalia",
                        "url": "https://nizamcellularleuwiliang.my.id/"
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
                                "name": resolvedParams.genreTitle,
                                "item": `https://nizamcellularleuwiliang.my.id/product/${resolvedParams.typeCategory}/${resolvedParams.genreTitle}`
                            }
                        ]
                    }
                })}
            </Script>

            <ProductTypeHero typeCategory={resolvedParams.typeCategory} genreTitle={resolvedParams.genreTitle} />
            <ProductGenreTitle typeCategory={resolvedParams.typeCategory} genreTitle={resolvedParams.genreTitle} />
        </Fragment>
    )
}