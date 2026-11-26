import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE, SITE_URL } from "@/data/site";
import "./globals.css";

const montserrat = localFont({
  src: "./fonts/Montserrat-latin-variable.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
});

const gilroyLight = localFont({
  src: "./fonts/Gilroy-Light.otf",
  weight: "300",
  variable: "--font-gilroy-light",
  display: "swap",
});

const gilroyExtraBold = localFont({
  src: "./fonts/Gilroy-ExtraBold.otf",
  weight: "800",
  variable: "--font-gilroy-extrabold",
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
    <html lang="fr" className={`${montserrat.variable} ${gilroyLight.variable} ${gilroyExtraBold.variable}`}>
      <body>{children}</body>
    </html>
  );
}
