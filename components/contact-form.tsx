"use client";

import { useState, type FormEvent } from "react";

import { buildContactHref } from "@/lib/contact";

export function ContactForm() {
  const [name, setName] = useState("");
  const [brief, setBrief] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(buildContactHref(name, brief), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 w-full max-w-md text-left"
    >
      <label className="block text-sm">
        <span className="text-muted-foreground">Name</span>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="mt-2 w-full border-b border-border bg-transparent px-0 py-2 text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
        />
      </label>

      <label className="mt-6 block text-sm">
        <span className="text-muted-foreground">Brief</span>
        <textarea
          name="brief"
          required
          rows={4}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="A short note about what you want to build"
          className="mt-2 w-full resize-none border-b border-border bg-transparent px-0 py-2 text-foreground outline-none placeholder:text-muted-foreground/50 focus:border-foreground"
        />
      </label>

      <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
        From here I will set up a call within the next 24 hours to discuss the
        idea in detail, if that works for you. That is the next step after this
        intro.
      </p>

      <button
        type="submit"
        className="mt-8 inline-flex items-center gap-1 border-b border-foreground pb-0.5 text-sm font-medium transition-opacity hover:opacity-60"
      >
        Send intro
      </button>
    </form>
  );
}
