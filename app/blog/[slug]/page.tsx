import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getPost, getPostSlugs } from "@/lib/blog";

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} | frankogenrwoth`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.cover],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-4 py-6 md:px-20">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← Back to blog
          </Link>
          <Link href="/" className="text-sm font-semibold tracking-tight">
            frankogenrwoth
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12 md:px-0 md:py-16">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-primary px-3 py-1 text-[11px] tracking-[0.12em] text-primary-foreground">
            {post.tag}
          </span>
          <span className="text-xs text-muted-foreground">{post.readingTime}</span>
          {post.date ? (
            <time className="text-xs text-muted-foreground" dateTime={post.date}>
              {post.date}
            </time>
          ) : null}
        </div>

        <h1 className="mt-6 text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl">
          {post.title}
        </h1>

        <div className="relative mt-10 overflow-hidden rounded-xl">
          <Image
            src={post.cover}
            alt=""
            width={1200}
            height={800}
            priority
            className="aspect-4/3 w-full object-cover"
          />
        </div>

        <div className="prose-blog mt-10 max-w-none text-base leading-relaxed text-muted-foreground">
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
              pre: ({ children }) => (
                <pre className="mt-4 overflow-x-auto rounded-xl bg-secondary p-4 text-[13px] leading-relaxed text-foreground">
                  {children}
                </pre>
              ),
              code: ({ className, children }) => {
                const isBlock = Boolean(className);
                if (isBlock) {
                  return <code className="font-mono text-[13px]">{children}</code>;
                }
                return (
                  <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-foreground">
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
}
