"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// SCROLL REVEAL FOR THE HOME PAGE (web v3, 2026-11-03).
//
// The owner asked for an animated site. Nothing here is a dependency: one
// shared IntersectionObserver and CSS transitions in `globals.css`
// (`.reveal-ready [data-reveal]`).
//
// THE ORDER MATTERS, AND IT IS WHY THIS FILE EXISTS INSTEAD OF A CSS CLASS:
// the hidden state only applies once `<html>` carries `reveal-ready`, and
// `RevealRoot` adds it AFTER marking everything already on screen as shown.
// So:
//   - with JavaScript off, or a bundle that never arrives on a slow Venezuelan
//     connection, nothing is ever hidden -- the page is plain static HTML;
//   - what is on screen when the bundle hydrates does not blink out and back
//     in; only what is still below the fold animates when scrolled to.
// The hero does not use this at all: it animates with CSS keyframes that run
// on first paint, so the top of the page never waits on JavaScript.

export type RevealVariant = "up" | "left" | "right" | "scale";

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-shown", "");
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  return observer;
}

export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  style,
  children,
}: {
  as?: ElementType;
  variant?: RevealVariant;
  /** Milliseconds; used to stagger the items of a list. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || el.hasAttribute("data-shown")) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={{ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/** Mounted once per page. Arms the hidden state without hiding what is already visible. */
export function RevealRoot() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("reveal-ready")) return;
    const fold = window.innerHeight;
    for (const el of document.querySelectorAll("[data-reveal]")) {
      const r = el.getBoundingClientRect();
      if (r.top < fold && r.bottom > 0) el.setAttribute("data-shown", "");
    }
    root.classList.add("reveal-ready");
    return () => root.classList.remove("reveal-ready");
  }, []);
  return null;
}

/** A gentle, endless bob for the phone illustrations once they are on screen. */
export function Float({ className, children, delay = 0 }: { className?: string; children: ReactNode; delay?: number }) {
  return (
    <div className={cn("home-float", className)} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
