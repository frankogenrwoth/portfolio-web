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
  title: "frankogenrwoth — Software Engineer",
  description:
    "frankogenrwoth is a full-stack software engineer building production web applications with Django, FastAPI, Flask and React.",
  authors: [{ name: "Ogenrwoth Jim Frank" }],
  openGraph: {
    title: "frankogenrwoth — Software Engineer",
    description: "Software engineering portfolio: projects, experience and engineering insights.",
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