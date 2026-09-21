import type { Metadata } from "next";
import Link from "next/link";

import { ContactForm } from "@/components/contact-form";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Send a short intro to frankogenrwoth. Share your name and a brief, then schedule a call within 24 hours.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | frankogenrwoth",
    description:
      "Send a short intro to frankogenrwoth. Share your name and a brief, then schedule a call within 24 hours.",
    url: absoluteUrl("/contact"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | frankogenrwoth",
    description:
      "Send a short intro to frankogenrwoth. Share your name and a brief, then schedule a call within 24 hours.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 py-6 md:px-20">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Link
            href="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back home
          </Link>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            frankogenrwoth
          </Link>
        </div>
      </header>

      <section className="flex flex-col items-center px-4 py-16 text-center md:px-20 md:py-24">
        <div className="flex w-full max-w-md flex-col items-center">
          <h1 className="text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Let&apos;s talk
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            Start with a short intro. Tell me who you are and what you have in
            mind, and we will take it from there.
          </p>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
