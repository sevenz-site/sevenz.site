import Image from "next/image";
import { cn } from "@/lib/utils";
import { SIGNUP_URL } from "@/lib/config";
import { OFFER } from "@/lib/offer";
import { Container, Lines, PrimaryLink } from "@/components/home/ui";
import { Reveal } from "@/components/home/reveal";

// The two «notebook» sections of the frame: the hero (node 1856:14843) and the
// closing call to action (node 1902:16343). Ruled lines every 20px in #E5E5E5
// and the red margin, 2px #FFCAC9, 40px in from each edge — a page of the
// libreta Sevenz replaces.
//
// The hero animates on first paint with CSS keyframes, never through `Reveal`:
// it is what a visitor on a slow connection sees first, and it must not wait
// for the JavaScript bundle to be visible. The closing section sits 8,000px
// down the page, where a load-time animation would have finished long before
// anybody arrives, so it reveals on scroll instead.

function NotebookBackground({ draw }: { draw: boolean }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className={cn("home-notebook absolute inset-0", draw && "home-notebook-draw")} />
      {/* 40px from the edges in the frame. A phone has a 16px gutter, so the
          margin moves to 8px there instead of running through the text. */}
      <div className={cn("absolute inset-y-0 left-2 w-0.5 bg-[#ffcac9] md:left-10", draw && "home-margin")} />
      <div className={cn("absolute inset-y-0 right-2 w-0.5 bg-[#ffcac9] md:right-10", draw && "home-margin")} />
    </div>
  );
}

function TrialCallToAction() {
  return (
    <div className="flex flex-col items-center gap-2">
      <PrimaryLink href={SIGNUP_URL}>Probar {OFFER.freeMonths} meses gratis</PrimaryLink>
      <p className="text-sm leading-5 text-[#737373]">Sin tarjeta de crédito.</p>
    </div>
  );
}

const FLAGS = [
  { src: "/web-v3/VE-flag.svg", alt: "Bolívares" },
  { src: "/web-v3/US-flag.svg", alt: "Dólares" },
  { src: "/web-v3/USDT-flag.svg", alt: "USDT" },
  { src: "/web-v3/EU-flag.svg", alt: "Euros" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <NotebookBackground draw />
      <Container className="relative flex flex-col items-center gap-6 py-16 lg:py-[120px]">
        {/* The four currencies the app speaks, overlapped by 12px. */}
        <div className="flex items-center -space-x-3">
          {FLAGS.map((flag, i) => (
            <span
              key={flag.src}
              className="home-pop relative inline-flex size-10 rounded-full"
              style={{ animationDelay: `${150 + i * 110}ms` }}
            >
              <span className="home-bob inline-flex" style={{ animationDelay: `${1100 + i * 250}ms` }}>
                <Image src={flag.src} alt={flag.alt} width={40} height={40} priority />
              </span>
            </span>
          ))}
        </div>

        <div className="flex w-full flex-col items-center gap-10">
          <div className="flex w-full flex-col gap-2 text-center">
            <h1
              className="home-in text-[2.5rem] leading-[1.02] font-bold tracking-[-0.03em] text-balance lg:text-wrap text-[#272727] lg:text-[56px]"
              style={{ animationDelay: "250ms" }}
            >
              <Lines text={"Lo que vendes y lo que te deben\nen una sola app."} />
            </h1>
            <p className="home-in text-lg leading-7 text-[#737373]" style={{ animationDelay: "420ms" }}>
              <Lines text={"Sevenz anota cada venta, cada fiado, cada abono y cada fecha.\nTu cliente y tú ven el mismo número, sin tanta vaina."} />
            </p>
          </div>
          <div className="home-in" style={{ animationDelay: "560ms" }}>
            <TrialCallToAction />
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ClosingCallToAction() {
  return (
    <section className="relative overflow-hidden border-y border-[#e5e5e5] bg-white">
      <NotebookBackground draw={false} />
      <Container className="relative flex flex-col items-center gap-6 py-16 lg:py-[120px]">
        <div className="flex w-full flex-col items-center gap-2 text-center">
          <Reveal variant="scale">
            <Image src="/web-v3/logo-primary.svg" alt="Sevenz" width={111} height={40} />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="text-[2.5rem] leading-[1.02] font-bold tracking-[-0.03em] text-balance lg:text-wrap text-[#272727] lg:text-[56px]">
              ¡Cuentas claras sin tanta vaina!
            </h2>
          </Reveal>
          <Reveal delay={220}>
            <p className="text-lg leading-7 text-[#737373]">
              Sevenz anota cada venta, cada fiado, cada abono y cada fecha.
            </p>
          </Reveal>
        </div>
        <Reveal delay={320}>
          <TrialCallToAction />
        </Reveal>
      </Container>
    </section>
  );
}
