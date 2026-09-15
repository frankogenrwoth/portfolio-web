import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  cover: string;
  excerpt: string;
  draft: boolean;
  readingTime: string;
};

export type Post = PostMeta & {
  body: string;
};

type YamlMeta = {
  title?: string;
  tag?: string;
  date?: string | Date;
  cover?: string;
  excerpt?: string;
  draft?: boolean;
};

function readingTimeFrom(body: string): string {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function formatDate(value: string | Date | undefined): string {
  if (!value) return "";
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function loadPost(slug: string): Post | null {
  const ymlPath = path.join(BLOG_DIR, `${slug}.yml`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);

  if (!fs.existsSync(ymlPath) || !fs.existsSync(mdPath)) {
    return null;
  }

  const meta = parseYaml(fs.readFileSync(ymlPath, "utf8")) as YamlMeta;
  const body = fs.readFileSync(mdPath, "utf8");

  if (!meta.title || !meta.tag || !meta.cover || !meta.excerpt) {
    throw new Error(`Incomplete blog meta for "${slug}" (need title, tag, cover, excerpt)`);
  }

  return {
    slug,
    title: meta.title,
    tag: meta.tag,
    date: formatDate(meta.date),
    cover: meta.cover,
    excerpt: meta.excerpt,
    draft: Boolean(meta.draft),
    readingTime: readingTimeFrom(body),
    body,
  };
}

function includeDrafts(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".yml"))
    .map((file) => file.replace(/\.yml$/, ""))
    .filter((slug) => {
      const post = loadPost(slug);
      if (!post) return false;
      if (post.draft && !includeDrafts()) return false;
      return true;
    });
}

export function getAllPosts(): PostMeta[] {
  return getPostSlugs()
    .map((slug) => loadPost(slug))
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ body: _body, ...meta }) => meta);
}

export function getPost(slug: string): Post | null {
  const post = loadPost(slug);
  if (!post) return null;
  if (post.draft && !includeDrafts()) return null;
  return post;
}
