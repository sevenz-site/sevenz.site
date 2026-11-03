import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/reveal";
import { Body, Container, Illustration, Lines, SectionTitle } from "@/components/home/ui";

// «Empieza en tres pasos» (node 1901:15700): a 480/480 introduction, three
// #F5F5F5 cards (309 wide, 24 apart, 28 of padding, radius 10) and the three
// phones of the libreta import below them, 317 wide each.
//
// BELOW `lg` it follows the phone frame of the same section (node 1951:17870,
// sent by the owner on 2026-11-03): each card is followed by ITS phone —
// 01, phone, 02, phone, 03, phone — 24 apart, cards 309 and phones 317 wide,
// centred, with the intro block 309 wide and the title at 44. The DOM is in
// that interleaved order, and from `lg` a grid puts the cards back on one row
// and the phones on the next, as in the desktop frame.
//
// The frame gives the cards different heights on the phone (232, hugging, 232)
// and that is copied as drawn.

const STEPS = [
  { n: "01", phoneMinH: true, title: "Crea tu cuenta ¡gratis!", text: "Desde tu teléfono, sin tarjeta de crédito y sin instalar nada" },
  { n: "02", title: "Toma fotos de tu libreta", text: "O un pantallazo de Excel. Tal como está hoy: nada de volver\na escribir." },
  {
    n: "03",
    phoneMinH: true,
    title: "Sube las fotos y verifica",
    text: "A través de la opción “Subir libreta”. Revisa lo que Sevenz leyó, corrige lo que no cuadre y listo.",
  },
];

// Intrinsic pixels of the @2x WebP files, and each phone's box in the frame
// (317 wide; the first one 633 tall, the other two 655). The files carry the
// shadow on every side, so they are drawn 333.5 wide over a 317 slot.
const PHONES = [
  { src: "/web-v3/sevenz-paso-1-foto-libreta.webp", w: 667, h: 1298, slotH: 633, alt: "La cámara de Sevenz fotografiando una página de libreta con las deudas de Doña Julia" },
  { src: "/web-v3/sevenz-paso-2-verificacion.webp", w: 667, h: 1342, slotH: 655, alt: "La pantalla «Subir libreta» con los clientes que Sevenz leyó de la foto, cada uno con «Todo cuadra»" },
  { src: "/web-v3/sevenz-paso-3-perfil-cliente.webp", w: 667, h: 1342, slotH: 655, alt: "El perfil de Doña Julia en Sevenz con lo que tiene por cobrar en dólares y en euros" },
];

// Literal class names: Tailwind only generates what it can read in the source.
const COL = ["lg:col-start-1", "lg:col-start-2", "lg:col-start-3"];
// The phones are 24 apart in the frame (a 341 step) while the card columns
// step 333, so centred under their cards the outer two sit 8px too close in.
const PHONE_SHIFT = ["lg:-left-2", "", "lg:left-2"];

export function StepsSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <Container className="flex flex-col gap-4 lg:py-6">
        <div className="mx-auto flex w-full max-w-[309px] flex-col gap-4 lg:max-w-none lg:flex-row lg:items-center">
          <Reveal className="lg:w-[480px] lg:shrink-0">
            <SectionTitle className="text-[44px] leading-[1.05]">Empieza en tres pasos</SectionTitle>
          </Reveal>
          <Reveal delay={100} className="lg:w-[480px]">
            <Body>Y cuando termines: comparte a tus clientes el enlace de su saldo y tu catálogo, y empieza a recibir pedidos.</Body>
          </Reveal>
        </div>

        <ol className="flex flex-col items-center gap-6 lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-6 lg:gap-y-4">
          {STEPS.map((step, i) => (
            <Fragment key={step.n}>
              <Reveal
                as="li"
                delay={150 + i * 120}
                className={cn(
                  "flex w-full max-w-[309px] flex-col gap-3 rounded-[10px] bg-[#f5f5f5] p-7 transition-transform duration-300 hover:-translate-y-1 lg:row-start-1 lg:min-h-[232px] lg:max-w-none",
                  step.phoneMinH && "min-h-[232px]",
                  COL[i],
                )}
              >
                <span className="font-mono text-sm leading-5 text-[#737373]">{step.n}</span>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg leading-7 font-semibold text-[#272727]">{step.title}</h3>
                  <p className="text-lg leading-7 text-[#737373]">
                    <Lines text={step.text} />
                  </p>
                </div>
              </Reveal>
              <Illustration
                src={PHONES[i].src}
                alt={PHONES[i].alt}
                width={PHONES[i].w}
                height={PHONES[i].h}
                slot={{ w: 317, h: PHONES[i].slotH }}
                drawnWidth={333.5}
                delay={200 + i * 150}
                floatDelay={i * 700}
                as="li"
                className={cn("list-none lg:row-start-2 lg:mx-0 lg:w-[317px] lg:self-center lg:justify-self-center", COL[i], PHONE_SHIFT[i])}
              />
            </Fragment>
          ))}
        </ol>
      </Container>
    </section>
  );
}
