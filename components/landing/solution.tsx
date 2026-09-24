import Image from "next/image";
import { Section, SectionHeading } from "@/components/landing/section";
import { NumberedCard, NumberedList } from "@/components/landing/numbered-card";

// Las tres pantallas del recorrido de importar. Los pies venían quemados
// dentro del PNG original —"1. Escanéa", "02, Verifica", "3. Listo": tres
// formatos de numeración distintos y una tilde de más— así que la imagen se
// partió en tres y los pies se escriben aquí. Además de arreglar la errata,
// ahora son texto: se pueden seleccionar, los lee un lector de pantalla y no
// hay que reexportar una imagen para cambiar una palabra.
const PANTALLAS = [
  {
    src: "/screens/sevenz-importar-1-escanea.png",
    pie: "Escanea",
    alt: "La cámara del teléfono enfocando una libreta de fiado abierta",
  },
  {
    src: "/screens/sevenz-importar-2-verifica.png",
    pie: "Verifica",
    alt: "La pantalla de importar cartera de Sevenz, con las filas leídas de la libreta y los avisos de las que no cuadran",
  },
  {
    src: "/screens/sevenz-importar-3-listo.png",
    pie: "Listo",
    alt: "La ficha de un cliente en Sevenz con su cartera pendiente en dólares y euros",
  },
];

const PASOS = [
  {
    titulo: "Toma una foto",
    desc: "Toma una foto de tu libreta actual, tal como está hoy. Nada que re-escribir.",
  },
  {
    titulo: "Verifica",
    desc: "Verifica la información analizada por Sevenz (saldos, deudores, etc).",
  },
  {
    titulo: "Confirma y listo",
    desc: "Toda tu cartera, ordenada por quién debe hace más tiempo.",
  },
];

export function Solution() {
  return (
    <Section>
      <div className="flex flex-col gap-10">
        <SectionHeading
          split
          titulo="Tres pasos y tu cartera de fiado queda al día"
          lead="Tu información se protege completamente con protocolos avanzados de seguridad en la nube, garantizando privacidad total."
        />

        {/* Tres columnas en todas las anchuras, como el mockup: apilarlas en el
            teléfono rompería la lectura de izquierda a derecha, que es la que
            cuenta la secuencia. Caben porque son recortes verticales y
            estrechos. */}
        <ol className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-3">
          {PANTALLAS.map((p) => (
            <li key={p.src} className="flex flex-col items-center gap-3">
              <Image
                src={p.src}
                alt={p.alt}
                width={349}
                height={680}
                sizes="(min-width: 1024px) 300px, 32vw"
                className="h-auto w-full"
              />
              <span className="font-mono text-eyebrow text-subtle">{p.pie}</span>
            </li>
          ))}
        </ol>

        <NumberedList>
          {PASOS.map((p, i) => (
            <NumberedCard key={p.titulo} numero={i + 1} titulo={p.titulo}>
              {p.desc}
            </NumberedCard>
          ))}
        </NumberedList>

        {/* La frase del mockup decía "Así ve tu cliente ve su propio saldo",
            con el verbo repetido. Corregida. */}
        <p className="mx-auto max-w-2xl text-center text-xl font-semibold text-balance">
          Así ve tu cliente su propio saldo e historial. Sin preguntarte. Sin discutirlo. Sin tanta
          vaina.
        </p>

        <Image
          src="/screens/sevenz-perfil-cliente.png"
          alt="La vista que recibe el cliente: lo que debe en dólares, lo que tiene a favor en euros y el historial de cada fiado y cada abono"
          width={1288}
          height={1140}
          sizes="(min-width: 1024px) 768px, 100vw"
          className="mx-auto h-auto w-full max-w-3xl"
        />
      </div>
    </Section>
  );
}
