const BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://nizamcellularleuwiliang.my.id";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata = {
  title: "Nizam Cellular Leuwiliang - Service Handphone Terlengkap",
  description:
    "Nizam Cellular Leuwiliang menyediakan layanan service handphone terlengkap di Leuwiliang. Kami menangani berbagai masalah handphone dengan teknisi berpengalaman dan harga terjangkau!",
  authors: [{ name: "Rizki Ramadhan" }],
  creator: "Rizki Ramadhan",
  publisher: "Nizam Cellular Leuwiliang",
  category: "Phone Service",
  keywords: [
    "Service Handphone",
    "Service HP",
    "Service Ponsel",
    "Service Smartphone",
    "Service iPhone",
    "Service Samsung",
    "Service Xiaomi",
    "Service Oppo",
    "Service Vivo",
    "Service Realme",
    "Service HP Leuwiliang",
    "Service HP Bogor",
    "Service HP Ciampea",
    "Service HP Cibatok",
  ],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
      {
        url: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/favicon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    title: "Nizam Cellular Leuwiliang - Service Handphone Terlengkap",
    description:
      "Butuh service handphone profesional dengan harga terjangkau? Nizam Cellular Leuwiliang siap membantu memperbaiki berbagai masalah handphone Anda dengan teknisi berpengalaman!",
    url: BASE_URL,
    siteName: "Nizam Cellular Leuwiliang",
    locale: "id_ID",
    images: [
      {
        url: `${BASE_URL}/home.png`,
        width: 1200,
        height: 630,
        alt: "Service Handphone Nizam Cellular Leuwiliang",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nizam Cellular Leuwiliang - Service Handphone Terlengkap",
    description:
      "Butuh service handphone profesional dengan harga terjangkau? Nizam Cellular Leuwiliang siap membantu memperbaiki berbagai masalah handphone Anda dengan teknisi berpengalaman!",
    creator: "@rizki_ramadhan",
    site: "@rizki_ramadhan",
    images: [`${BASE_URL}/home.png`],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SEARCH_CONSOLE,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "format-detection": "telephone=no",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#f5f5f5",
    "application-name": "Nizam Cellular Leuwiliang",
    "msapplication-tap-highlight": "no",
    "theme-color": "#f5f5f5",
  },
};

export default metadata;
