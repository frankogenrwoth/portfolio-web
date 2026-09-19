import Link from "next/link";

import type { PostMeta } from "@/lib/blog";

export function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="mt-12 text-sm text-muted-foreground">No posts yet.</p>;
  }

  return (
    <div className="mt-12 divide-y divide-border border-y border-border">
      {posts.map((post) => {
        const showExcerpt = post.excerpt.trim() !== post.title.trim();

        return (
          <article key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="group flex flex-col gap-2 py-5 md:flex-row md:items-baseline md:gap-10"
            >
              {post.date ? (
                <time
                  dateTime={post.date}
                  className="shrink-0 text-xs text-muted-foreground md:w-28"
                >
                  {post.date}
                </time>
              ) : null}

              <div className="min-w-0 flex-1">
                <h3 className="text-base font-medium tracking-tight text-foreground transition-colors group-hover:text-muted-foreground md:text-lg">
                  {post.title}
                </h3>
                {showExcerpt ? (
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                ) : null}
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-full bg-primary px-3 py-1 text-[11px] tracking-[0.12em] text-primary-foreground">
                  {post.tag}
                </span>
                <span className="text-xs text-muted-foreground">{post.readingTime}</span>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
