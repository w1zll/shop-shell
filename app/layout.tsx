import type { Metadata } from "next";

import "./globals.css";

import { Toaster } from "@w1zll/shop-ui";

import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { getPublicSiteUrl } from "../lib/site-url";

export const metadata: Metadata = {
  title: {
    default: "Shop MFS",
    template: "%s | Shop MFS",
  },
  description: "Демонстрационный интернет-магазин на микрофронтендах.",
  metadataBase: new URL(getPublicSiteUrl()),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
