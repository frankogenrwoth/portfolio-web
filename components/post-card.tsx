"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import type { PostMeta } from "@/lib/blog";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.35, ease: easeOut },
  },
};

export function PostCard({ post }: { post: PostMeta }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group"
      variants={fadeUp}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <Image
          src={post.cover}
          alt={`${post.title} cover`}
          width={900}
          height={700}
          loading="lazy"
          className="aspect-4/3 w-full rounded-xl object-fit transition-transform duration-500 group-hover:scale-105"
        />
        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-primary px-3 py-1 text-[11px] tracking-[0.12em] text-primary-foreground">
            {post.tag}
          </span>
          <span className="text-xs text-muted-foreground">
            {post.readingTime}
          </span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
          {post.excerpt}
        </p>
      </Link>
    </motion.article>
  );
}