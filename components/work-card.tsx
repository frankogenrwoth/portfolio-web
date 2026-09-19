"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import type { WorkMeta } from "@/lib/works";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.35, ease: easeOut },
  },
};

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function ArrowButton({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "size-8" : "size-11";
  return (
    <motion.span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground`}
      whileHover={{ rotate: 45 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
    >
      <ArrowIcon className="size-4" />
    </motion.span>
  );
}

export function WorkCard({ work }: { work: WorkMeta }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group"
      variants={fadeUp}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <Link href={`/work/${work.slug}`} className="block">
        <div
          className="relative overflow-hidden rounded-xl"
          style={{ backgroundColor: work.bg }}
        >
          <Image
            src={work.cover}
            alt={`${work.title} project cover`}
            width={600}
            height={600}
            loading="lazy"
            className="aspect-4/3 w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs">
              Website
              <span className="text-muted-foreground">{work.domain}</span>
            </span>
            <ArrowButton size="sm" />
          </div>
        </div>
        <p className="mt-4 text-base font-medium">{work.title}</p>
        <p className="text-sm text-muted-foreground">For ↗ {work.client}</p>
      </Link>
    </motion.article>
  );
}