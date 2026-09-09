import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";

import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "D.Nova — Product Designer Portfolio",
  description:
    "D.Nova is a product designer crafting monochrome, high-impact digital experiences for startups and brands.",
  authors: [{ name: "D.Nova" }],
  openGraph: {
    title: "D.Nova — Product Designer Portfolio",
    description: "Product design portfolio: selected works, experience and design insights.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}