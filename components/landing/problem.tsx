import Image from "next/image";
import { Section, SectionHeading } from "@/components/landing/section";
import { NumberedCard, NumberedList } from "@/components/landing/numbered-card";

// Los tres problemas no son secuencia sino inventario: a un tendero le pasa
// uno, otro o los tres, y en cualquier orden. Van numerados igual porque el
// número sirve de ancla para señalarlos —"a mí el que me pasa es el 02"—, no
// porque haya que leerlos por turno.
const PROBLEMAS = [
  "La libreta se moja, se pierde o solo tú la entiendes.",
  "Tu cliente nunca ve su propio saldo — solo tu palabra.",
  "Cobrar significa discutir un número, no recordarlo.",
];

export function Problem() {
  return (
    <Section>
      <div className="flex flex-col gap-10">
        <SectionHeading
          split
          titulo="Así administras el fiado hoy"
          lead="Fiar es parte del negocio, pero perder el capital por culpa de los malas pagas, no debería serlo."
        />

        <NumberedList>
          {PROBLEMAS.map((texto, i) => (
            <NumberedCard key={texto} numero={i + 1}>
              {texto}
            </NumberedCard>
          ))}
        </NumberedList>

        {/* La libreta tachada con la X roja junto a la app. Es la única imagen
            de la portada que enseña el mundo de antes, y por eso va aquí y no
            en las secciones que explican Sevenz: el contraste es el argumento.
            Sin `priority` — está por debajo del primer pantallazo y cargarla
            antes le robaría ancho de banda a la del hero, que es la que mide
            el LCP. */}
        <Image
          src="/screens/sevenz-libreta-balance-cartera-calculadora.png"
          alt="Una libreta de fiado tachada con una X roja junto a la app de Sevenz, con el capital por cobrar y la calculadora del dólar BCV"
          width={1288}
          height={1072}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="mx-auto h-auto w-full max-w-3xl"
        />
      </div>
    </Section>
  );
}
