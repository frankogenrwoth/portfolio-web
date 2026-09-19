"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { WorkCard } from "@/components/work-card";
import type { WorkMeta } from "@/lib/works";

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.18 },
  },
};

export function WorkGrid({ works }: { works: WorkMeta[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="mt-12 grid gap-8 md:grid-cols-3"
      variants={reduce ? undefined : stagger}
      initial={reduce ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {works.map((work) => (
        <WorkCard key={work.slug} work={work} />
      ))}
    </motion.div>
  );
}