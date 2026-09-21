import type { Metadata } from "next";
import Link from "next/link";

import { PostList } from "@/components/post-list";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes and experiments from frankogenrwoth: DNS, local AI, and shipping production software.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog | frankogenrwoth",
    description:
      "Engineering notes and experiments from frankogenrwoth: DNS, local AI, and shipping production software.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | frankogenrwoth",
    description:
      "Engineering notes and experiments from frankogenrwoth: DNS, local AI, and shipping production software.",
  },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 py-6 md:px-20">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Link
            href="/#blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to blog
          </Link>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            frankogenrwoth
          </Link>
        </div>
      </header>

      <section className="px-4 py-16 md:px-20 md:py-24">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
            All Posts
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Design insights, engineering notes and experiments worth sharing.
          </p>

          <PostList posts={posts} />
        </div>
      </section>
    </main>
  );
}
