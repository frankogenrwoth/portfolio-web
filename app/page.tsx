import type { Metadata } from "next";

import HomePage from "@/components/home-page";
import { getAllPosts } from "@/lib/blog";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";
import { getAllWorks } from "@/lib/works";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE_NAME} | Software Engineer`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${SITE_NAME} | Software Engineer`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Software Engineer`,
    description: SITE_DESCRIPTION,
  },
};

export default function Page() {
  const posts = getAllPosts();
  const works = getAllWorks();
  return <HomePage posts={posts} works={works} />;
}
