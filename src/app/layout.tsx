import { metadata } from "@/base/meta/Metadata";

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
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased`}
      >
        <Providers>
          <Pathname>
            {children}
          </Pathname>
        </Providers>
      </body>
    </html>
  );
}
