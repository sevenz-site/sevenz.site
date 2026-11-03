import Image from "next/image";
import { cn } from "@/lib/utils";
import { SIGNUP_URL } from "@/lib/config";
import { OFFER, formatUsd } from "@/lib/offer";
import { CheckCircleIcon, PaymentsIcon } from "@/components/home/icons";
import { Reveal } from "@/components/home/reveal";

// The pricing card (node 1902:15771): 672 wide on #272727, a #272727→#0A0A0A
// fill, a 1px gradient border (#737373 → #272727 → #737373), radius 12 and a
// 0 8 8 rgba(0,0,0,.25) shadow.
//
// THE FIGURES COME FROM `lib/offer.ts`, not from the frame's text: that file is
// where the owner's decision of 2026-10-31 lives («19,50 USD fijo (antes 35)»)
// and it also feeds the FAQ answer and the JSON-LD price. The frame says the
// same today; if the offer changes, this card follows it instead of drifting.
//
// «(antes 35 USD)» and «Notificaciones»: spelling fixed on 2026-11-03 at the
// owner's request; the Figma frame still reads «(antes35 USD)» and «Notificacione».
//
// Item colours alternate between #DADADA and #F5F5F5 in the frame and the
// check alignment between centred and top; both are copied item by item.

type Item = { text: string; light?: boolean; top?: boolean };

const LEFT: Item[] = [
  { text: "Ventas de contado y fiado en un solo registro." },
  { text: "Inventario con precios al detal y al mayor, en dólares y euros, que avisa cuando queda poco." },
  { text: "Resumen semanal de tu cartera vía WhatsApp." },
  { text: "Recordatorios de cobro por WhatsApp, sin escribirlos tú." },
  { text: "Notificaciones vía WhatsApp a clientes cuando realizan un abono." },
  { text: "Balance de fiado vs. abonos, en dólares y en euros.", light: true, top: true },
  { text: "Puntaje de puntualidad: sabes quién paga a tiempo y quién no.", light: true, top: true },
  { text: "Enlace de saldo para cada cliente: ve lo mismo que tú, sin instalar nada.", light: true, top: true },
];

const RIGHT: Item[] = [
  {
    text: "Reportes de ventas, inventario y proveedores, con un resumen diario hecho por el asistente de Sevenz.",
    light: true,
    top: true,
  },
  { text: "Catálogo con pedidos: tus clientes piden desde su teléfono y por WhatsApp." },
  { text: "Calculadora de tasa: dólar BCV, euro y USDT." },
  { text: "Perfil de cliente con historial de abonos, fiados y ventas.", light: true, top: true },
  {
    text: "Cada cliente con su estado (dentro del plazo, vencido, crítico) y una lista aparte de malas pagas.",
    light: true,
    top: true,
  },
  { text: "Sube tu libreta: una foto y pasa a digital.", light: true, top: true },
  { text: "Acceso garantizado a nuevas funcionalidades.", light: true, top: true },
];

function Column({ items, offset }: { items: Item[]; offset: number }) {
  return (
    <ul className="flex flex-1 flex-col gap-6">
      {items.map((item, i) => (
        <Reveal
          as="li"
          key={item.text}
          delay={200 + (offset + i) * 60}
          className={cn("flex gap-1.5", item.top ? "items-start" : "items-center")}
        >
          <CheckCircleIcon className="size-4 shrink-0 text-[#d9d9d9]" />
          <span className={cn("text-sm leading-5", item.light ? "text-[#f5f5f5]" : "text-[#dadada]")}>{item.text}</span>
        </Reveal>
      ))}
    </ul>
  );
}

export function PricingSection() {
  return (
    <section id="precio" className="scroll-mt-[60px] bg-[#272727] px-4 py-16 lg:py-20">
      <Reveal variant="scale" className="mx-auto w-full max-w-[672px]">
        <div
          className="rounded-xl border border-transparent shadow-[0_8px_8px_rgba(0,0,0,0.25)]"
          style={{
            background:
              "linear-gradient(180deg, #272727 0%, #0a0a0a 100%) padding-box, linear-gradient(180deg, #737373 0%, #272727 75%, #737373 100%) border-box",
          }}
        >
          <div className="relative flex flex-col gap-2 p-6">
            <span className="font-mono text-sm leading-[17px] text-[#9a9a9a]">Precio</span>
            <div className="flex items-start justify-between gap-8">
              <div className="flex flex-col">
                <h2 className="text-[2rem] leading-[1.05] font-bold tracking-[-0.025em] text-[#dadada] lg:text-[44px]">
                  {OFFER.freeMonths} meses gratis
                </h2>
                <p className="text-base leading-6 font-semibold text-[#dadada]">
                  Todas las funcionalidades y sin tarjeta de crédito
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-1 text-base leading-6 font-semibold">
                  <span className="text-[#9a9a9a]">
                    Después: <s>(antes {OFFER.listPriceUsd} USD)</s>
                  </span>
                  <PaymentsIcon className="size-4 text-[#a6f3d0]" />
                  <span className="text-[#dadada]">{formatUsd(OFFER.monthlyPriceUsd)} USD al mes.</span>
                </p>
              </div>
              <Image
                src="/web-v3/logo-secondary.svg"
                alt=""
                width={111}
                height={40}
                className="hidden shrink-0 sm:block"
              />
            </div>
            {/* The frame's bottom stroke: #272727 → #9A9A9A → #272727, left to right. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px"
              style={{ background: "linear-gradient(90deg, #272727 0%, #9a9a9a 50%, #272727 100%)" }}
            />
          </div>

          <div className="flex flex-col gap-10 p-6">
            <div className="flex flex-col gap-6 md:flex-row">
              <Column items={LEFT} offset={0} />
              <Column items={RIGHT} offset={LEFT.length} />
            </div>
            <a
              href={SIGNUP_URL}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-[#dadada] p-2.5 text-[17px] text-black transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-[0.99]"
            >
              Probar gratis
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
