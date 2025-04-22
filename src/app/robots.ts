import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/', '/private/'],
        },
        sitemap: 'https://nizamcellularleuwiliang.my.id/sitemap.xml',
    }
} 