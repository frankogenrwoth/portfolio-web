import {
  AUTHOR,
  DEFAULT_OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: AUTHOR.name,
    alternateName: AUTHOR.shortName,
    url: AUTHOR.url,
    email: AUTHOR.email,
    jobTitle: AUTHOR.jobTitle,
    description: SITE_DESCRIPTION,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kampala",
      addressCountry: "UG",
    },
    sameAs: [...AUTHOR.sameAs],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  cover: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: absoluteUrl(input.cover),
    datePublished: input.date || undefined,
    dateModified: input.date || undefined,
    author: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    publisher: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${input.slug}`),
  };
}

export function creativeWorkJsonLd(input: {
  title: string;
  description: string;
  slug: string;
  cover: string;
  date: string;
  href: string;
  client: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.title,
    description: input.description,
    image: absoluteUrl(input.cover),
    dateCreated: input.date || undefined,
    url: absoluteUrl(`/work/${input.slug}`),
    creator: {
      "@type": "Person",
      name: AUTHOR.name,
      url: AUTHOR.url,
    },
    about: input.client,
    sameAs: input.href,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
