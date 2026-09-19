import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const WORKS_DIR = path.join(process.cwd(), "content", "works");

export type WorkMeta = {
  slug: string;
  title: string;
  client: string;
  domain: string;
  href: string;
  cover: string;
  bg: string;
  date: string;
  draft: boolean;
  excerpt: string;
};

export type Work = WorkMeta & {
  body: string;
};

type YamlMeta = {
  title?: string;
  client?: string;
  domain?: string;
  href?: string;
  cover?: string;
  bg?: string;
  date?: string | Date;
  draft?: boolean;
  excerpt?: string;
};

function formatDate(value: string | Date | undefined): string {
  if (!value) return "";
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value);
}

function loadWork(slug: string): Work | null {
  const ymlPath = path.join(WORKS_DIR, `${slug}.yml`);
  const mdPath = path.join(WORKS_DIR, `${slug}.md`);

  if (!fs.existsSync(ymlPath) || !fs.existsSync(mdPath)) {
    return null;
  }

  const meta = parseYaml(fs.readFileSync(ymlPath, "utf8")) as YamlMeta;
  const body = fs.readFileSync(mdPath, "utf8");

  if (!meta.title || !meta.client || !meta.domain || !meta.href || !meta.cover || !meta.excerpt) {
    throw new Error(
      `Incomplete work meta for "${slug}" (need title, client, domain, href, cover, excerpt)`,
    );
  }

  return {
    slug,
    title: meta.title,
    client: meta.client,
    domain: meta.domain,
    href: meta.href,
    cover: meta.cover,
    bg: meta.bg ?? "#e2e8f0",
    date: formatDate(meta.date),
    draft: Boolean(meta.draft),
    excerpt: meta.excerpt,
    body,
  };
}

function includeDrafts(): boolean {
  return process.env.NODE_ENV !== "production";
}

export function getWorkSlugs(): string[] {
  if (!fs.existsSync(WORKS_DIR)) return [];

  return fs
    .readdirSync(WORKS_DIR)
    .filter((file) => file.endsWith(".yml"))
    .map((file) => file.replace(/\.yml$/, ""))
    .filter((slug) => {
      const work = loadWork(slug);
      if (!work) return false;
      if (work.draft && !includeDrafts()) return false;
      return true;
    });
}

export function getAllWorks(): WorkMeta[] {
  return getWorkSlugs()
    .map((slug) => loadWork(slug))
    .filter((work): work is Work => work !== null)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map(({ body: _body, ...meta }) => meta);
}

export function getWork(slug: string): Work | null {
  const work = loadWork(slug);
  if (!work) return null;
  if (work.draft && !includeDrafts()) return null;
  return work;
}
