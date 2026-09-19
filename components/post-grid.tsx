"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { PostCard } from "@/components/post-card";
import type { PostMeta } from "@/lib/blog";

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.18 },
  },
};

export function PostGrid({ posts }: { posts: PostMeta[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="mt-12 grid gap-8 md:grid-cols-3"
      variants={reduce ? undefined : stagger}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </motion.div>
  );
}