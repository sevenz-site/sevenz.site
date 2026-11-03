"use client";

import Link from "next/link";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { ArrowDownIcon } from "@/components/home/icons";
import { Reveal } from "@/components/home/reveal";
import { Container, SectionTitle } from "@/components/home/ui";
import type { FaqItem } from "@/components/home/faq-items";

// The FAQ of the web v3 frame (node 1902:16009): a 672 column, a mono eyebrow,
// a LEFT-aligned 44px title, and fifteen rows split by a 1px #E5E5E5 rule on
// top. Question 14/20 #272727, answer Geist Medium 12 #737373, a 24px chevron in
// #9A9A9A. The first item is open, as in the frame.
//
// Radix's accordion and not hand-written disclosure: it brings the keyboard
// handling, `aria-expanded` and the h3 that lets a screen reader walk the
// questions. Its height animation comes from tw-animate-css
// (`animate-accordion-down`/`-up`), already in `globals.css`.

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container className="max-w-[672px] lg:px-6">
        <div className="flex flex-col gap-4 lg:py-6">
          <Reveal>
            <p className="text-center font-mono text-sm leading-5 text-[#737373]">Preguntas frecuentes</p>
          </Reveal>
          <Reveal delay={80}>
            <SectionTitle>Todo lo que preguntan antes de empezar</SectionTitle>
          </Reveal>

          <Reveal delay={160}>
            <AccordionPrimitive.Root type="single" collapsible defaultValue="faq-0">
              {items.map((item, i) => (
                <AccordionPrimitive.Item
                  key={item.q}
                  value={`faq-${i}`}
                  className="group border-t border-[#e5e5e5] py-4"
                >
                  <AccordionPrimitive.Header>
                    <AccordionPrimitive.Trigger className="flex w-full items-start justify-between gap-4 rounded-sm text-left text-sm leading-5 text-[#272727] outline-none focus-visible:ring-2 focus-visible:ring-[#272727] focus-visible:ring-offset-2">
                      {item.q}
                      <ArrowDownIcon className="size-6 shrink-0 text-[#9a9a9a] transition-transform duration-300 group-data-[state=open]:rotate-180" />
                    </AccordionPrimitive.Trigger>
                  </AccordionPrimitive.Header>
                  {/* `forceMount`: the closed answers stay IN the HTML.
                      Unmounted, 14 of the 15 answers were only in the JSON-LD
                      and not in the page text Google weighs (SEO pass,
                      2026-11-03). Radix does NOT hide a force-mounted panel —
                      all fifteen showed open the first time — so the closed
                      state is hidden here. The cost is the closing
                      animation; opening still animates. */}
                  <AccordionPrimitive.Content
                    forceMount
                    className="overflow-hidden data-[state=closed]:hidden data-[state=open]:animate-accordion-down"
                  >
                    <p className="pt-4 text-xs leading-4 font-medium text-[#737373]">
                      {item.a}
                      {item.href ? (
                        <>
                          {" "}
                          <Link href={item.href} className="text-[#272727] underline underline-offset-4">
                            {item.hrefLabel}
                          </Link>
                        </>
                      ) : null}
                    </p>
                  </AccordionPrimitive.Content>
                </AccordionPrimitive.Item>
              ))}
            </AccordionPrimitive.Root>
          </Reveal>
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
