import type { Metadata } from "next";
import Link from "next/link";

import { PostGrid } from "@/components/post-grid";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — frankogenrwoth",
  description:
    "Full list of blog posts by frankogenrwoth — design insights, engineering notes and experiments.",
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

      <section className="bg-secondary px-4 py-24 md:px-20">
        <div className="mx-auto w-full max-w-[1600px]">
          <h1 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
            All Posts
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Design insights, engineering notes and experiments worth sharing.
          </p>

          <PostGrid posts={posts} />
        </div>
      </section>
    </main>
  );
}