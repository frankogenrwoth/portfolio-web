"use client";

import Image from "next/image";
import { useState } from "react";

const heroPortrait = "/assets/hero-portrait.jpg";
const aboutPortrait = "/assets/about-portrait.jpg";
const aboutSquare = "/assets/about-square.jpg";
const promoBanner = "/assets/promo-banner.jpg";
const work1 = "/assets/work-1.jpg";
const work2 = "/assets/work-2.jpg";
const work3 = "/assets/work-3.jpg";
const blog1 = "/assets/blog-1.jpg";
const blog2 = "/assets/blog-2.jpg";
const blog3 = "/assets/blog-3.jpg";

const navLinks = ["About Me", "Portfolio", "Services", "Blog"];

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
    <span
      className={`inline-flex ${box} shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45`}
    >
      <ArrowIcon className="size-4" />
    </span>
  );
}

function TextLink({ label }: { label: string }) {
  return (
    <a
      href="#contact"
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
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-10 md:pt-6">
      <nav className="pointer-events-auto mx-auto flex max-w-[1600px] items-center justify-between gap-6 rounded-full bg-primary px-5 py-3 text-primary-foreground md:px-8">
        <div className="flex items-center gap-8">
          <a href="#hero" className="text-base font-semibold tracking-tight">
            D<span className="text-muted-foreground">.</span>Nova
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
          href="#contact"
          className="group inline-flex items-center gap-1 border-b border-primary-foreground/60 pb-0.5 text-sm"
        >
          Book A Call
          <ArrowIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </nav>
    </header>
  );
}

const experiences = [
  {
    company: "FutureTech",
    city: "Berlin, Germany",
    range: "2022 — Present",
    role: "Lead product designer shaping a multi-platform design system.",
    tags: [
      { label: "UI/UX", active: true },
      { label: "Branding", active: false },
    ],
    open: true,
  },
  {
    company: "Lumen Studio",
    city: "Lisbon, Portugal",
    range: "2020 — 2022",
    role: "Designed fintech onboarding flows for a Series-A startup.",
    tags: [
      { label: "Product", active: true },
      { label: "Research", active: false },
    ],
    open: false,
  },
  {
    company: "Northline",
    city: "Oslo, Norway",
    range: "2018 — 2020",
    role: "Brand identity and web systems for retail clients.",
    tags: [
      { label: "Branding", active: true },
      { label: "Web", active: false },
    ],
    open: false,
  },
];

const works = [
  { img: work1, name: "Halo Digital", domain: "halodigital.xyz", client: "Halo Inc." },
  { img: work2, name: "Ember Studio", domain: "emberstudio.io", client: "Ember" },
  { img: work3, name: "Nimbus App", domain: "nimbus.app", client: "Nimbus Labs" },
];

const posts = [
  {
    img: blog1,
    tag: "MARKETING",
    read: "4 min read",
    text: "How restrained visual systems build more trust than loud ones.",
  },
  {
    img: blog2,
    tag: "PROCESS",
    read: "6 min read",
    text: "The research rituals that keep a product team honest.",
  },
  {
    img: blog3,
    tag: "TRENDS",
    read: "3 min read",
    text: "Where interface typography is heading in the next year.",
  },
];

export default function Home() {
  const [openRow, setOpenRow] = useState(0);

  return (
    <div className="snap-shell bg-background text-foreground">
      <Nav />

      {/* Hero */}
      <section id="hero" className="snap-panel relative flex flex-col justify-center px-4 md:px-20">
        <div
          className="pointer-events-none absolute left-3 top-1/2 hidden -translate-y-1/2 flex-col gap-10 text-[11px] uppercase tracking-[0.28em] text-muted-foreground lg:flex"
          style={{ writingMode: "vertical-rl" }}
        >
          <span>2024</span>
          <span>Product designer</span>
        </div>

        <div className="mx-auto grid w-full max-w-[1600px] items-center gap-10 pt-28 md:grid-cols-2 md:pt-24">
          <div>
            <div className="flex gap-12">
              <div>
                <p className="text-4xl font-semibold tracking-tight md:text-5xl">+200</p>
                <p className="mt-1 text-sm text-muted-foreground">Project completed</p>
              </div>
              <div>
                <p className="text-4xl font-semibold tracking-tight md:text-5xl">+50</p>
                <p className="mt-1 text-sm text-muted-foreground">Startup raised</p>
              </div>
            </div>

            <h1 className="mt-10 text-[22vw] font-medium leading-[0.85] tracking-tight md:text-[13vw]">
              Hello
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              — It&apos;s D.Nova a design wizard
            </p>
          </div>

          <div className="relative h-[46vh] overflow-hidden rounded-xl md:h-[78vh]">
            <Image
              src={heroPortrait}
              alt="Black and white portrait of D.Nova, product designer"
              width={1024}
              height={1408}
              className="size-full object-cover grayscale"
            />
          </div>
        </div>

        <span className="absolute bottom-6 left-4 text-xs uppercase tracking-[0.2em] text-muted-foreground md:left-20">
          Scroll down ↓
        </span>
      </section>

      {/* About */}
      <section
        id="about-me"
        className="snap-panel flex items-center bg-secondary px-4 py-24 md:px-20"
      >
        <div className="mx-auto grid w-full max-w-[1600px] gap-8 md:grid-cols-3">
          <div>
            <Eyebrow label="Who I am" />
            <h2 className="mt-5 text-4xl font-medium leading-[1.05] tracking-tight md:text-5xl">
              About Me
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              I&apos;m a product designer working at the seam of research, systems and craft. For
              nine years I&apos;ve helped founders turn rough ideas into interfaces people actually
              finish using. My work is quiet, deliberate and built to scale.
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
          </div>

          <div className="flex flex-col rounded-xl bg-background p-7">
            <svg
              viewBox="0 0 24 24"
              className="size-8 text-foreground"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18" />
            </svg>
            <p className="mt-8 text-6xl font-medium tracking-tight md:text-7xl">120%</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Average increase in client engagement in the first 6 months.
            </p>
            <Image
              src={aboutSquare}
              alt="Hands sketching wireframes in a notebook"
              width={700}
              height={700}
              loading="lazy"
              className="mt-auto size-28 rounded-lg object-cover grayscale"
            />
          </div>

          <div>
            <div className="relative w-fit">
              <Image
                src={aboutPortrait}
                alt="Portrait of D.Nova"
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
                Nine years designing products across fintech, health and climate tooling.
              </li>
              <li className="flex gap-3">
                <span className="text-foreground">+</span>
                I lead with research, prototype early, and hand off systems teams can maintain.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="services"
        className="snap-panel flex items-center px-4 py-24 md:px-20"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <Eyebrow label="Experiences" />
              <h2 className="mt-5 max-w-xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                Explore My
                <br />
                Design Journey
              </h2>
            </div>
            <div className="md:max-w-xs md:text-right">
              <p className="text-sm leading-relaxed text-muted-foreground">
                A decade of building products with small teams and ambitious founders.
              </p>
              <div className="mt-4">
                <TextLink label="Book A Call" />
              </div>
            </div>
          </div>

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
                        {e.company}, <span className="text-muted-foreground">{e.city}</span>
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

                  {isOpen && (
                    <div className="grid gap-6 pb-8 md:grid-cols-[1.1fr_1.4fr_auto] md:items-center">
                      <div className="flex gap-3">
                        {[work1, work2, work3].map((img, n) => (
                          <Image
                            key={n}
                            src={img}
                            alt={`${e.company} project thumbnail ${n + 1}`}
                            width={900}
                            height={1000}
                            loading="lazy"
                            className="h-20 w-24 rounded-lg object-cover"
                          />
                        ))}
                      </div>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Rebuilt the core design system, shipped three platform launches and mentored
                        a team of four designers.
                      </p>
                      <span className="group w-fit">
                        <ArrowButton />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="snap-panel flex items-center px-4 py-24 md:px-20">
        <div className="relative mx-auto w-full max-w-[1600px] overflow-hidden rounded-2xl">
          <Image
            src={promoBanner}
            alt="Model car and design sketches on a desk"
            width={1600}
            height={912}
            loading="lazy"
            className="h-[60vh] w-full object-cover md:h-[70vh]"
          />
          <div className="absolute inset-0 bg-primary/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-primary-foreground">
            <p className="text-xs uppercase tracking-[0.2em] text-primary-foreground/70">
              (Book Your Free Consultation Now!)
            </p>
            <h2 className="mt-5 max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
              Exclusive Winter Deal Days Get a Free Consultation!
            </h2>
            <p className="mt-4 max-w-lg text-sm text-primary-foreground/70">
              Two weeks only — a full session on your product, your roadmap and the design work that
              moves it forward.
            </p>
            <div className="mt-7">
              <TextLink label="Let's talk" />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section
        id="portfolio"
        className="snap-panel flex items-center bg-secondary px-4 py-24 md:px-20"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <Eyebrow label="Portfolio" />
          <h2 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">Latest Works</h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {works.map((w) => (
              <article key={w.name} className="group">
                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src={w.img}
                    alt={`${w.name} project cover`}
                    width={900}
                    height={1000}
                    loading="lazy"
                    className="aspect-4/5 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end justify-between p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="flex items-center gap-2 rounded-full bg-background px-3 py-1 text-xs">
                      Website
                      <span className="text-muted-foreground">{w.domain}</span>
                    </span>
                    <ArrowButton size="sm" />
                  </div>
                </div>
                <p className="mt-4 text-base font-medium">{w.name}</p>
                <p className="text-sm text-muted-foreground">For ↗ {w.client}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center text-sm text-muted-foreground">
            Check out More →{" "}
            <a href="#portfolio" className="border-b border-foreground text-foreground">
              View More
            </a>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="snap-panel flex items-center px-4 py-24 md:px-20">
        <div className="mx-auto w-full max-w-[1600px]">
          <Eyebrow label="Blogs" />
          <h2 className="mt-5 text-4xl font-medium tracking-tight md:text-6xl">
            Design Insights &amp; Trends
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {posts.map((p) => (
              <article key={p.tag} className="group">
                <Image
                  src={p.img}
                  alt={`${p.tag} article cover`}
                  width={900}
                  height={700}
                  loading="lazy"
                  className="aspect-4/3 w-full rounded-xl object-cover"
                />
                <div className="mt-4 flex items-center gap-3">
                  <span className="rounded-full bg-primary px-3 py-1 text-[11px] tracking-[0.12em] text-primary-foreground">
                    {p.tag}
                  </span>
                  <span className="text-xs text-muted-foreground">{p.read}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="contact"
        className="snap-panel flex flex-col items-center justify-center bg-secondary px-4 text-center md:px-20"
      >
        <h2 className="max-w-3xl text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
          Got a Vision? Let&apos;s Bring It to Life!
        </h2>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
          Tell me where the product is today and where it needs to go.
          <br />
          I&apos;ll bring the process, the craft and a plan for the first month.
        </p>
        <div className="mt-8">
          <TextLink label="Book A Call" />
        </div>
      </section>

      {/* Footer */}
      <footer className="snap-end-panel footer-grid bg-primary px-4 py-16 text-primary-foreground md:px-20">
        <div className="mx-auto flex max-w-[1600px] flex-col justify-between gap-10 md:flex-row md:items-end">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <a href="#hero" className="rounded-full bg-primary-foreground/15 px-4 py-2">
              Home
            </a>
            <a href="#about-me" className="rounded-full px-4 py-2 text-primary-foreground/70">
              About Me
            </a>
            <a href="#portfolio" className="rounded-full px-4 py-2 text-primary-foreground/70">
              Portfolio
            </a>
            <a href="#blog" className="rounded-full px-4 py-2 text-primary-foreground/70">
              Blog
            </a>
          </nav>
          <a
            href="mailto:hello@dnova.com"
            className="text-3xl font-medium tracking-tight md:text-5xl"
          >
            hello@dnova.com
          </a>
        </div>
      </footer>
    </div>
  );
}