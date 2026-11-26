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
  title: {
    default: SITE.titre,
    template: `%s | ${SITE.nom}`,
  },
  description: SITE.description,
  alternates: { canonical: "/" },
  applicationName: SITE.nom,
  category: "Travaux, climatisation et hygiène 3D",
  keywords: [
    "CODISCO GIBAT",
    "climatisation Pointe-Noire",
    "réfrigération Congo",
    "travaux et maintenance Congo",
    "hygiène 3D Congo",
    "climatisation industrielle",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.nom,
    url: "/",
    title: SITE.partage.titre,
    description: SITE.partage.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CODISCO GIBAT, travaux, climatisation et hygiène 3D au Congo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.partage.titre,
    description: SITE.partage.description,
    images: ["/opengraph-image"],
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
