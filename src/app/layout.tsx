import { metadata } from "@/base/meta/meta";

import { GoogleTagManager, GoogleTagManagerNoScript } from '@/base/analytics/GoogleTagManager'

import "@/base/style/globals.css";

import { openSans } from "@/base/fonts/Fonts";

import Pathname from "@/base/router/Pathname";

import Providers from "@/base/router/Provider";

metadata.manifest = "/manifest.json";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <GoogleTagManager />
        <meta name="google-site-verification" content={metadata.verification.google} />
      </head>
      <body
        className={`${openSans.variable} antialiased`}
      >
        <GoogleTagManagerNoScript />
        <Providers>
          <Pathname>
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}

