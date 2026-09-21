import type { Metadata } from "next";
import Link from "next/link";

import { WorkGrid } from "@/components/work-grid";
import { absoluteUrl } from "@/lib/site";
import { getAllWorks } from "@/lib/works";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Selected projects by frankogenrwoth: production web applications for clinics, property consultancies and startups.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Portfolio | frankogenrwoth",
    description:
      "Selected projects by frankogenrwoth: production web applications for clinics, property consultancies and startups.",
    url: absoluteUrl("/work"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | frankogenrwoth",
    description:
      "Selected projects by frankogenrwoth: production web applications for clinics, property consultancies and startups.",
  },
};

export default function WorksPage() {
  const works = getAllWorks();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 py-6 md:px-20">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Link
            href="/#portfolio"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to portfolio
          </Link>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            frankogenrwoth
          </Link>
        </div>
      </header>

      <section className="bg-secondary px-4 py-24 md:px-20">
        <div className="mx-auto w-full max-w-[1600px]">
          <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
            My Projects
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Everything I&apos;ve shipped, from clinic sites to property
            consultancies.
          </p>

          <WorkGrid works={works} />
        </div>
      </section>
    </main>
  );
}
