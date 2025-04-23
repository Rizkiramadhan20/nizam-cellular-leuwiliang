const BASE_URL = process.env.NEXT_PUBLIC_URL as string;
const TAG_MANAGER = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID as string;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#f5f5f5",
};

interface Metadata {
  title: string;
  description: string;
  authors: Array<{ name: string }>;
  keywords: string[];
  icons: {
    icon: Array<{
      url: string;
      sizes: string;
      type: string;
    }>;
    apple: string;
    shortcut: string;
    appleTouchIcon: string;
  };
  manifest: string;
  metadataBase: URL;
  canonical: string;
  other: {
    [key: string]: string;
  };
  openGraph: {
    type: string;
    title: string;
    description: string;
    url: string;
    siteName: string;
    locale: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    card: string;
    title: string;
    description: string;
    images: string[];
  };
  verification?: {
    googleTagManager?: string;
  };
  robots: {
    index: boolean;
    follow: boolean;
  };
  alternates: {
    canonical: string;
    languages: {
      [key: string]: string;
    };
  };
}

export const metadata: Metadata = {
  title: "Nizam Cellular Leuwiliang - Service Handphone Terlengkap",
  description:
    "Nizam Cellular Leuwiliang menyediakan layanan service handphone terlengkap di Leuwiliang. Kami menangani berbagai masalah handphone dengan teknisi berpengalaman dan harga terjangkau.",

  authors: [{ name: "Nizam Cellular Leuwiliang" }],

  keywords: [
    "Nizam Cellular Leuwiliang",
    "Service Handphone Leuwiliang",
    "Service HP Leuwiliang",
    "Service Handphone Terlengkap",
    "Service HP Terbaik",
    "Service Handphone Murah",
    "Service HP Profesional",
    "Service Handphone Berkualitas",
  ],

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "64x64 32x32 24x24 16x16",
        type: "image/x-icon",
      },
    ],
    apple: "/favicon.ico",
    shortcut: "/favicon.ico",
    appleTouchIcon: "/favicon.ico",
  },

  manifest: "/manifest.json",
  metadataBase: new URL(BASE_URL),
  canonical: `${BASE_URL}`,

  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "format-detection": "telephone=yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "msapplication-TileColor": "#f5f5f5",
    "google-tag-manager": TAG_MANAGER,
  },

  openGraph: {
    type: "website",
    title: "Nizam Cellular Leuwiliang - Service Handphone Terlengkap",
    description:
      "Layanan service handphone terlengkap di Leuwiliang. Teknisi berpengalaman, harga terjangkau, dan garansi terjamin.",
    url: BASE_URL,
    siteName: "Nizam Cellular Leuwiliang",
    locale: "id_ID",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nizam Cellular Leuwiliang - Service Handphone Terlengkap",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nizam Cellular Leuwiliang - Service Handphone Terlengkap",
    description:
      "Layanan service handphone terlengkap di Leuwiliang. Teknisi berpengalaman, harga terjangkau, dan garansi terjamin.",
    images: ["/og-image.jpg"],
  },

  verification: {
    googleTagManager: TAG_MANAGER,
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "id-ID": BASE_URL,
    },
  },
};

export default metadata;
