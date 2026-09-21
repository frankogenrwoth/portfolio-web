"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import { PostList } from "@/components/post-list";
import { WorkGrid } from "@/components/work-grid";
import type { PostMeta } from "@/lib/blog";
import { contactEmail } from "@/lib/contact";
import type { WorkMeta } from "@/lib/works";

const heroPortrait = "/assets/frankogenrwoth.webp";
const aboutPortrait = "/assets/frankogenrwoth.webp";
const promoBanner = "/assets/promo-banner.jpg";

const navLinks = ["About Me", "Portfolio", "Services", "Blog"];

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.35, ease: easeOut },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2, delayChildren: 0.18 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.06 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.5, ease: easeOut },
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

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

function TextLink({ label }: { label: string }) {
  return (
    <a
      href="/contact"
      className="group inline-flex items-center gap-1 border-b border-current pb-0.5 text-sm font-medium transition-opacity hover:opacity-60"
    >
      {label}
      <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}

function Eyebrow({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] ${
        dark ? "text-secondary" : "text-muted-foreground"
      }`}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function Nav() {
  const reduce = useReducedMotion();
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-10 md:pt-6">
      <motion.nav
        className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between gap-6 rounded-full bg-primary px-5 py-3 text-primary-foreground md:px-8"
        initial={reduce ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: easeOut, delay: 0.15 }}
      >
        <div className="flex items-center gap-8">
          <a href="#hero" className="text-base font-semibold tracking-tight">
            frankogenrwoth
          </a>
          <ul className="hidden items-center gap-6 text-sm text-primary-foreground/70 md:flex">
            {navLinks.map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                  className="transition-colors hover:text-primary-foreground"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="/contact"
          className="group inline-flex items-center gap-1 border-b border-primary-foreground/60 pb-0.5 text-sm"
        >
          Book A Call
          <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </motion.nav>
    </header>
  );
}

const skillGroups = [
  { label: "Languages", items: "Python, TypeScript, JavaScript, Java, C" },
  { label: "Backend", items: "Django, FastAPI, Flask, Laravel" },
  { label: "Frontend", items: "React, React Native" },
  { label: "DevOps", items: "Linux, Bash, Git, cloud deploy, DNS" },
];

const experiences = [
  {
    company: "AIBOS Uganda",
    city: "Kampala, Uganda",
    range: "Dec 2024 to Jul 2025",
    role: "Software Engineer / Project Lead",
    tags: [
      { label: "Project Lead", active: true },
      { label: "Full-Stack", active: false },
    ],
    detail:
      "Led projects from requirements analysis and system design through implementation, deployment and production support. Owned technical architecture and key engineering decisions, and coordinated teams through sprint planning, stand-ups and code reviews.",
    open: true,
  },
  {
    company: "Remote Squad",
    city: "Kampala, Uganda",
    range: "May 2023 to Jun 2026",
    role: "Software Engineer",
    tags: [
      { label: "Backend", active: true },
      { label: "Full-Stack", active: false },
    ],
    detail:
      "Designed and developed production web applications across frontend and backend, including backend APIs, business logic, database integration, authentication and user interfaces, and resolved bugs, performance and deployment issues.",
    open: false,
  },
];

export default function HomePage({
  posts,
  works,
}: {
  posts: PostMeta[];
  works: WorkMeta[];
}) {
  const [openRow, setOpenRow] = useState(0);
  const reduce = useReducedMotion();
  const workCovers = works
    .slice(0, 3)
    .map((w) => ({ bg: w.bg, cover: w.cover }));

  return (
    <div className="snap-shell bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section
        id="hero"
        className="snap-panel relative flex flex-col justify-center px-4 md:px-20"
      >
        <div
          className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 flex-col gap-10 text-[11px] uppercase tracking-[0.28em] text-muted-foreground lg:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          <span>2026</span>
          <span>Software engineer</span>
        </div>

        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 pt-28 md:grid-cols-2 md:pt-24">
          <motion.div
            variants={reduce ? undefined : stagger}
            initial={reduce ? false : "hidden"}
            animate="visible"
          >
            <motion.div className="flex gap-12" variants={fadeUp}>
              <div>
                <p className="text-4xl font-semibold tracking-tight md:text-5xl">
                  +15
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Projects delivered
                </p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-tight md:text-5xl">
                  +20k
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Users supported
                </p>
              </div>
            </motion.div>

            <motion.h1
              className="mt-10 text-[22vw] font-medium leading-[0.85] tracking-tight md:text-[13vw]"
              variants={fadeUp}
            >
              Hello
            </motion.h1>
            <motion.p
              className="mt-4 text-sm text-muted-foreground"
              variants={fadeUp}
            >
              It&apos;s frankogenrwoth, a software engineer
            </motion.p>
          </motion.div>

          <motion.div
            className="relative h-[46vh] overflow-hidden rounded-xl md:h-[78vh]"
            variants={reduce ? undefined : scaleIn}
            initial={reduce ? false : "hidden"}
            animate="visible"
          >
            <Image
              src={heroPortrait}
              alt="Black and white portrait of frankogenrwoth, software engineer"
              width={1024}
              height={1408}
              priority
              className="size-full object-cover grayscale"
            />
          </motion.div>
        </div>

        <motion.span
          className="absolute bottom-6 left-4 text-xs uppercase tracking-[0.2em] text-muted-foreground md:left-20"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll down ↓
        </motion.span>
      </section>

      {/* About */}
      <section
        id="about-me"
        className="snap-panel flex items-center bg-secondary px-4 py-24 md:px-20"
      >
        <div className="mx-auto grid w-full max-w-[1600px] gap-8 md:grid-cols-3">
          <Reveal>
            <Eyebrow label="Who I am" />
            <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
              About Me
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              I&apos;m Frank Ogenrwoth, a software engineer and full-stack
              developer studying at Makerere University. I design and ship
              production web applications end to end, from APIs and databases to
              the interfaces people use every day. My work is deliberate and
              built to scale.
            </p>
            <svg
              viewBox="0 0 160 80"
              className="mt-8 h-16 w-40 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 8c50 0 96 18 120 56" strokeDasharray="4 6" />
              <path d="M116 52l10 14 14-8" />
            </svg>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-center rounded-xl bg-background p-7">
              <span className="text-5xl md:text-6xl" aria-hidden="true">
                😁
              </span>
              <h3 className="mt-4 text-xl font-medium tracking-tight">
                Skills &amp; Tools
              </h3>
              <dl className="mt-5 space-y-3 text-sm">
                {skillGroups.map((group) => (
                  <div
                    key={group.label}
                    className="grid grid-cols-[5.5rem_1fr] gap-3"
                  >
                    <dt className="text-muted-foreground">{group.label}</dt>
                    <dd className="leading-snug text-foreground">
                      {group.items}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="relative w-fit">
              <Image
                src={aboutPortrait}
                alt="Portrait of Frank Ogenrwoth"
                width={900}
                height={900}
                loading="lazy"
                className="size-44 rounded-full object-cover grayscale md:size-52"
              />
              <span className="group absolute bottom-1 right-1">
                <ArrowButton size="sm" />
              </span>
            </div>
            <ul className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-foreground">+</span>
                Bachelor of Software Engineering at Makerere University (Jul
                2023 to Dec 2027).
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">+</span>
                Full-stack engineer across backend APIs, databases, React UIs,
                and production devops.
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">+</span>
                Based in Kampala, shipping for startups, clinics, and university
                associations.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section
        id="services"
        className="snap-panel flex items-center px-4 py-24 md:px-20"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <Eyebrow label="Experiences" />
                <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                  Explore My
                  <br />
                  Engineering Journey
                </h2>
              </div>
              <div className="md:max-w-xs md:text-right">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Two years of shipping production software for companies and
                  university associations.
                </p>
                <div className="mt-4">
                  <TextLink label="Book A Call" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 border-t border-border">
            {experiences.map((e, i) => {
              const isOpen = openRow === i;
              return (
                <div key={e.company} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setOpenRow(isOpen ? -1 : i)}
                    className="grid w-full grid-cols-1 items-center gap-4 py-6 text-left md:grid-cols-[1.1fr_1.4fr_auto]"
                  >
                    <div>
                      <p className="text-lg font-medium">
                        {e.company},{" "}
                        <span className="text-muted-foreground">{e.city}</span>
                      </p>
                      <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="size-1.5 rounded-full bg-current" />
                        {e.range}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">{e.role}</p>
                    <div className="flex items-center gap-2">
                      {e.tags.map((t) => (
                        <span
                          key={t.label}
                          className={`rounded-full px-3 py-1 text-xs ${
                            t.active
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {t.label}
                        </span>
                      ))}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="detail"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: easeOut }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 pb-8 md:grid-cols-[1.1fr_1.4fr_auto] md:items-center">
                          <div className="flex gap-3">
                            {workCovers.map((img, n) => (
                              <Image
                                key={img.cover}
                                src={img.cover}
                                alt={`${e.company} project thumbnail ${n + 1}`}
                                width={900}
                                height={1000}
                                loading="lazy"
                                className="h-20 w-24 rounded-lg object-contain object-center"
                                style={{ backgroundColor: img.bg }}
                              />
                            ))}
                          </div>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {e.detail}
                          </p>
                          <span className="group w-fit">
                            <ArrowButton />
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="snap-panel flex items-center px-4 py-24 md:px-20">
        <Reveal className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-2xl">
          <Image
            src={promoBanner}
            alt="Software engineer workspace"
            width={1600}
            height={912}
            loading="lazy"
            className="h-[60vh] w-full object-cover md:h-[70vh]"
          />
          <div className="absolute inset-0 bg-primary/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-primary-foreground">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
              (Get a Free Consultation!)
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
              Let&apos;s Build Something Great Together!
            </h2>
            <p className="mt-4 max-w-lg text-sm text-primary-foreground/70">
              From full-stack web apps to high-volume e-voting systems. Tell me
              about your project and I&apos;ll bring the architecture and a plan
              for the first sprint.
            </p>
            <div className="mt-7">
              <TextLink label="Let's talk" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Portfolio */}
      <section
        id="portfolio"
        className="snap-panel flex items-center bg-secondary px-4 py-24 md:px-20"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <Eyebrow label="Portfolio" />
            <h2 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
              Latest Works
            </h2>
          </Reveal>

          <WorkGrid works={works.slice(0, 3)} />

          <div className="mt-12 text-center text-sm text-muted-foreground">
            Check out My Full Portfolio →{" "}
            <Link
              href="/work"
              className="border-b border-foreground text-foreground"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section
        id="blog"
        className="snap-panel flex items-center px-4 py-24 md:px-20"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <Reveal>
            <Eyebrow label="Blogs" />
            <h2 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
              Design Insights &amp; Trends
            </h2>
          </Reveal>

          <div className="">
            <PostList posts={posts.slice(0, 5)} />
          </div>

          <div className="mt-12 text-center text-sm text-muted-foreground">
            Check out All My Blog Posts →{" "}
            <Link
              href="/blog"
              className="border-b border-foreground text-foreground"
            >
              View More
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="contact"
        className="snap-panel flex flex-col items-center justify-center bg-secondary px-4 text-center md:px-20"
      >
        <Reveal className="flex flex-col items-center">
          <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Got a Vision? Let&apos;s Bring It to Life!
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Start with a short intro. Tell me who you are and what you have in
            mind, and we will take it from there.
          </p>
          <div className="mt-8">
            <TextLink label="Reach out" />
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="snap-end-panel footer-grid bg-primary px-4 py-16 text-primary-foreground md:px-20">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 md:flex-row md:items-end">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <a
              href="#hero"
              className="rounded-full bg-primary-foreground/15 px-4 py-2"
            >
              Home
            </a>
            <a
              href="#about-me"
              className="rounded-full px-4 py-2 text-primary-foreground/70"
            >
              About Me
            </a>
            <a
              href="#portfolio"
              className="rounded-full px-4 py-2 text-primary-foreground/70"
            >
              Portfolio
            </a>
            <a
              href="#blog"
              className="rounded-full px-4 py-2 text-primary-foreground/70"
            >
              Blog
            </a>
          </nav>
          <div className="flex flex-col items-start gap-4 md:items-end">
            <div className="flex items-center gap-4 text-sm text-primary-foreground/70">
              <a
                href="https://github.com/frankogenrwoth"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary-foreground"
              >
                GitHub
              </a>

              <a
                href="https://linkedin.com/in/ogenrwoth-jim-frank"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary-foreground"
              >
                LinkedIn
              </a>

              <a
                href="https://x.com/frankogenrwoth"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary-foreground"
              >
                X
              </a>

              <a
                href="https://linktr.ee/frankogenrwoth"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary-foreground"
              >
                Linktree
              </a>
            </div>
            <a
              href="/contact"
              className="text-3xl font-medium tracking-tight md:text-5xl"
            >
              {contactEmail}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
