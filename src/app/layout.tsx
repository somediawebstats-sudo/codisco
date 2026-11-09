import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE, SITE_URL } from "@/data/site";
import "./globals.css";

const plymouth = localFont({
  src: [
    { path: "./fonts/Plymouth-Regular.woff2", weight: "400" },
    { path: "./fonts/Plymouth-Medium.woff2", weight: "500" },
    { path: "./fonts/Plymouth-Bold.woff2", weight: "700" },
    { path: "./fonts/Plymouth-ExtraBold.woff2", weight: "800" },
  ],
  variable: "--font-plymouth",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE.titre,
  description: SITE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    title: SITE.partage.titre,
    description: SITE.partage.description,
    images: [SITE.partage.image],
  },
};

export const viewport: Viewport = {
  themeColor: "#0F2234",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={plymouth.variable}>
      <body>{children}</body>
    </html>
  );
}
