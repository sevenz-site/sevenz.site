import Image from "next/image";
import { Fragment, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "@/components/home/icons";
import { Reveal } from "@/components/home/reveal";

// Shared pieces of the web v3 home page, measured on the Figma frame
// `Sevenz.site` → Foundations → «Web - V2» → «Web» (node 1856:14834).
//
// The frame is DESKTOP ONLY (1400 wide; content column 1024 with 24 of inner
// padding = 976). There is no phone version of this design — the 370-wide
// «Web» next to it in Figma is the previous site — so everything below `lg`
// is an adaptation, not a replica: columns stack, headlines shrink, and the
// forced line breaks of the frame are dropped (see `Lines`).

/** The 1024 column of every section. 16px gutter on a phone, the frame's 24 from `lg`. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1024px] px-4 lg:px-6", className)}>{children}</div>;
}

/**
 * Text with the frame's forced line breaks (U+2028 in Figma, written here as
 * "\n"). They are honoured from `lg`, where the column widths are the frame's;
 * below that the text wraps on its own, because a break placed for 471px reads
 * as a mistake at 343.
 */
export function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 ? (
            <>
              {" "}
              <br className="max-lg:hidden" />
            </>
          ) : null}
        </Fragment>
      ))}
    </>
  );
}

/** Section headline: Geist Bold 44, line-height 105%, tracking −2.5%. */
export function SectionTitle({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <h2
      className={cn(
        "text-[2rem] leading-[1.05] font-bold tracking-[-0.025em] text-balance lg:text-wrap text-[#272727] lg:text-[44px]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

/** The 18/28 paragraph: grey by default, with the emphasised words in #272727. */
export function Body({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn("text-lg leading-7 text-[#737373]", className)}>{children}</p>;
}

/** An emphasised fragment inside a grey paragraph. */
export function Em({ children }: { children: ReactNode }) {
  return <span className="text-[#272727]">{children}</span>;
}

export type Feature = {
  content: ReactNode;
  /**
   * The frame aligns some checks to the middle of their text (auto-layout
   * CENTER) and some to its first line (MIN). It only shows on items that wrap,
   * and it is copied item by item rather than evened out.
   */
  center?: boolean;
  /**
   * Items the frame sizes as HUG instead of FILL never wrap there — two of
   * them are wider than their column and overflow it by up to 50px
   * («Disponibilidad: ¿cuántos productos quedan?…», «Margen de ganancia…»).
   * Copied from `lg`; below it they wrap like everything else.
   */
  nowrap?: boolean;
};

/** A list of features with the green check_circle. Each item slides in, staggered. */
export function FeatureList({
  items,
  tone = "light",
  className,
}: {
  items: Feature[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("flex flex-col gap-4", className)}>
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={i}
          delay={120 + i * 90}
          className={cn("flex gap-1", item.center ? "items-center" : "items-start")}
        >
          <CheckCircleIcon className="size-6 shrink-0 text-[#007956]" />
          <span
            className={cn(
              "text-lg leading-7",
              tone === "dark" ? "text-[#dadada]" : "text-[#737373]",
              item.nowrap && "lg:whitespace-nowrap",
            )}
          >
            {item.content}
          </span>
        </Reveal>
      ))}
    </ul>
  );
}

/** The green WhatsApp note at the end of two sections. */
export function WhatsappNote({ children }: { children: ReactNode }) {
  return (
    <Reveal
      delay={600}
      className="flex items-start gap-2 rounded-lg border border-[#a6f3d0] bg-[#ecfdf5] p-3"
    >
      <Image src="/web-v3/whatsapp-icon.svg" alt="" width={24} height={24} className="shrink-0" />
      <p className="text-lg leading-7 text-[#007956]">{children}</p>
    </Reveal>
  );
}

/** The dark 40px button of the frame («Probar 3 meses gratis», «Regístrate»). */
export function PrimaryLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#272727] p-2.5 text-base leading-6 font-semibold whitespace-nowrap text-[#dadada]",
        "transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1c1c1c] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.45)] active:translate-y-0 active:scale-[0.98]",
        "focus-visible:ring-2 focus-visible:ring-[#272727] focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
    >
      {children}
    </a>
  );
}

/**
 * A phone illustration. The PNGs of `Illustrations/Web-V3` already carry the
 * grey blob AND the drop shadows of the frame, so one image is the whole
 * group. They ship as WebP under 100 KB (see `public/web-v3`).
 *
 * THE SHADOW IS WHY THIS IS NOT A PLAIN <img>. In Figma an effect does not
 * count towards a group's bounds: the sales group is 489×480 while its PNG,
 * shadow included, is 489×498. Sized by the PNG, every section came out 9 to
 * 28px taller than the frame (measured at 1400 on 2026-11-03). So the wrapper
 * takes the frame's box (`slot`) and the image is drawn at its true scale
 * (`drawn`, = PNG ÷ 2 for the @2x files) and allowed to spill over it, the way
 * the shadow does in Figma. Both scale together below the frame's width.
 */
export function Illustration({
  src,
  alt,
  width,
  height,
  slot,
  drawnWidth,
  className,
  variant = "up",
  floatDelay = 0,
  delay = 150,
  as,
}: {
  src: string;
  alt: string;
  /** Intrinsic pixels of the file. */
  width: number;
  height: number;
  /** The group's box in the frame. */
  slot: { w: number; h: number };
  /** Rendered width at the frame's scale (PNG ÷ 2 for @2x files). */
  drawnWidth: number;
  className?: string;
  variant?: "up" | "left" | "right" | "scale";
  floatDelay?: number;
  delay?: number;
  /** "li" when the illustration is an item of a list. */
  as?: ElementType;
}) {
  const widthPct = (drawnWidth / slot.w) * 100;
  return (
    <Reveal
      as={as}
      variant={variant}
      delay={delay}
      className={cn("relative mx-auto w-full shrink-0", className)}
      style={{ maxWidth: slot.w, aspectRatio: `${slot.w} / ${slot.h}` }}
    >
      <div
        className="home-float absolute top-0"
        style={{ animationDelay: `${floatDelay}ms`, width: `${widthPct}%`, left: `${(100 - widthPct) / 2}%` }}
      >
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" />
      </div>
    </Reveal>
  );
}
