import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
  JsonLd,
  breadcrumbJsonLd,
  creativeWorkJsonLd,
} from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";
import { getWork, getWorkSlugs } from "@/lib/works";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Work not found" };

  const url = absoluteUrl(`/work/${work.slug}`);

  return {
    title: work.title,
    description: work.excerpt,
    alternates: {
      canonical: `/work/${work.slug}`,
    },
    openGraph: {
      title: work.title,
      description: work.excerpt,
      url,
      type: "article",
      images: [
        {
          url: absoluteUrl(work.cover),
          alt: `${work.title} project cover`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: work.excerpt,
      images: [absoluteUrl(work.cover)],
    },
  };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <JsonLd
        data={[
          creativeWorkJsonLd({
            title: work.title,
            description: work.excerpt,
            slug: work.slug,
            cover: work.cover,
            date: work.date,
            href: work.href,
            client: work.client,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/work" },
            { name: work.title, path: `/work/${work.slug}` },
          ]),
        ]}
      />

      <header className="border-b border-border px-4 py-6 md:px-20">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/work"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← All projects
          </Link>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            frankogenrwoth
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 md:px-0 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="text-xs text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/work" className="hover:text-foreground">
                Portfolio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground">{work.title}</li>
          </ol>
        </nav>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-primary px-3 py-1 text-[11px] tracking-[0.12em] text-primary-foreground">
            Website
          </span>
          <span className="text-xs text-muted-foreground">{work.domain}</span>
          {work.date ? (
            <time className="text-xs text-muted-foreground" dateTime={work.date}>
              {work.date}
            </time>
          ) : null}
        </div>

        <h1 className="mt-6 text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
          {work.title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">For ↗ {work.client}</p>

        <div
          className="relative mt-10 overflow-hidden rounded-xl"
          style={{ backgroundColor: work.bg }}
        >
          <Image
            src={work.cover}
            alt={`${work.title} project cover`}
            width={1200}
            height={800}
            priority
            className="aspect-4/3 w-full object-contain object-center"
          />
        </div>

        <div className="mt-10 max-w-none text-base leading-relaxed text-muted-foreground">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h2 className="mt-10 text-2xl font-medium tracking-tight text-foreground first:mt-0">
                  {children}
                </h2>
              ),
              h2: ({ children }) => (
                <h2 className="mt-10 text-2xl font-medium tracking-tight text-foreground">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mt-8 text-xl font-medium tracking-tight text-foreground">
                  {children}
                </h3>
              ),
              p: ({ children }) => <p className="mt-4 leading-relaxed">{children}</p>,
              ul: ({ children }) => (
                <ul className="mt-4 list-disc space-y-2 pl-5">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mt-4 list-decimal space-y-2 pl-5">{children}</ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-medium text-foreground">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="border-b border-foreground text-foreground"
                  target={href?.startsWith("http") ? "_blank" : undefined}
                  rel={href?.startsWith("http") ? "noreferrer" : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {work.body}
          </ReactMarkdown>
        </div>

        <div className="mt-12">
          <a
            href={work.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 border-b border-foreground pb-0.5 text-sm font-medium"
          >
            Visit live site
          </a>
        </div>
      </article>
    </main>
  );
}
