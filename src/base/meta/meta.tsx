import { Fragment } from "react";

import Script from "next/script";

export const metadata = {
  title: "Nizam Cellular Leuwiliang - Service Handphone Terlengkap",
  description:
    "Nizam Cellular Leuwiliang menyediakan layanan service handphone terlengkap di Leuwiliang. Kami menangani berbagai masalah handphone dengan teknisi berpengalaman dan harga terjangkau.",
  author: "Space Digitalia",
  keywords: "Service Handphone Leuwiliang, Service HP Leuwiliang, Service Handphone Terlengkap, Service HP Terbaik, Service Handphone Murah, Service HP Profesional, Service Handphone Berkualitas",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Nizam Cellular Leuwiliang",
    description:
      "Nizam Cellular Leuwiliang menyediakan layanan service handphone terlengkap di Leuwiliang. Kami menangani berbagai masalah handphone dengan teknisi berpengalaman dan harga terjangkau.",
    url: "https://nizamcellularleuwiliang.my.id/",
    siteName: "Nizam Cellular Leuwiliang",
    images: [
      {
        url: "https://nizamcellularleuwiliang.my.id/favicon.ico",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nizam Cellular Leuwiliang",
    description:
      "Nizam Cellular Leuwiliang menyediakan layanan service handphone terlengkap di Leuwiliang. Kami menangani berbagai masalah handphone dengan teknisi berpengalaman dan harga terjangkau.",
    creator: "@nizamcellularleuwiliang",
    images: "https://nizamcellularleuwiliang.my.id/favicon.ico",
  },
  verification: process.env.NEXT_PUBLIC_VERTIFICATION_API_KEY,
};

const siteUrl = "https://nizamcellularleuwiliang.my.id";
const faviconUrl = `${siteUrl}/favicon.ico`;
const canonicalUrl = `${siteUrl}/`;

const Head = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nizam Cellular Leuwiliang",
    image: "https://nizamcellularleuwiliang.my.id/favicon.ico",
    "@id": "https://nizamcellularleuwiliang.my.id",
    url: "https://nizamcellularleuwiliang.my.id",
    telephone: "081284258290",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Jl. Kp. Sawah, Leuwiliang, Kec. Leuwiliang, Kabupaten Bogor, Jawa Barat 16640",
      addressLocality: "Leuwiliang Kab. Bogor",
      addressRegion: "Jawa Barat",
      postalCode: "16640",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -6.595038,
      longitude: 106.670528,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "21:00",
    },
    sameAs: ["https://www.facebook.com/nizamcellularleuwiliang", "https://www.instagram.com/nizamcellularleuwiliang", "https://www.tiktok.com/@nizamcellularleuwiliang"],

    description:
      "Nizam Cellular Leuwiliang menyediakan layanan service handphone terlengkap di Leuwiliang. Kami menangani berbagai masalah handphone dengan teknisi berpengalaman dan harga terjangkau.",
    logo: "https://nizamcellularleuwiliang.my.id/favicon.ico",
    title: "Nizam Cellular Leuwiliang",
  };

  const jsonLdString = JSON.stringify(jsonLd);

  return (
    <Fragment>
      <title>{metadata.title}</title>
      <meta charSet="UTF-8" />
      <meta name="version" content="1.0" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={metadata.description} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:type" content="website" />
      <meta name="google-site-verification" content={metadata.verification} />
      <meta property="og:title" content={metadata.title} />
      <meta name="author" content={metadata.author} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={faviconUrl} />
      <meta name="keywords" content={metadata.keywords} />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href={faviconUrl} type="image/x-icon" sizes="any" />
      <link rel="icon" href={faviconUrl} type="image/svg+xml" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href={faviconUrl} />
      <link rel="shortcut icon" href={faviconUrl} type="image/x-icon" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="canonical" href={canonicalUrl} />

      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}');
            `,
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID}`}
          height="0"
          width="0"
          title="Google Tag Manager"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
    </Fragment>
  );
};

export default Head;