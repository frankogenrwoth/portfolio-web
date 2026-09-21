import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";

import { JsonLd, personJsonLd, websiteJsonLd } from "@/components/json-ld";
import {
  AUTHOR,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Software Engineer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
  publisher: AUTHOR.name,
  keywords: [
    "software engineer",
    "full-stack developer",
    "Kampala",
    "Uganda",
    "Django",
    "FastAPI",
    "React",
    "frankogenrwoth",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    other: {
      "google-adsense-account": "ca-pub-5639367802041023",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: `${SITE_NAME} | Software Engineer`,
    description:
      "Software engineering portfolio: projects, experience and engineering insights.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_UG",
    type: "website",
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE),
        width: 1024,
        height: 1408,
        alt: "Portrait of frankogenrwoth, software engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Software Engineer`,
    description:
      "Software engineering portfolio: projects, experience and engineering insights.",
    images: [absoluteUrl(DEFAULT_OG_IMAGE)],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
