import Image from "next/image";
import { Section, SectionHeading } from "@/components/landing/section";
import { NumberedCard, NumberedList } from "@/components/landing/numbered-card";

// Las tres pantallas del recorrido de importar. Los pies venían quemados
// dentro del PNG original —"1. Escanéa", "02, Verifica", "3. Listo": tres
// formatos de numeración distintos y una tilde de más— así que la imagen se
// partió en tres y los pies se escriben aquí. Además de arreglar la errata,
// ahora son texto: se pueden seleccionar, los lee un lector de pantalla y no
// hay que reexportar una imagen para cambiar una palabra.
//
// EL PIE LLEVA NÚMERO Y PALABRA desde el 2026-09-25, porque las tarjetas
// subieron encima de las imágenes y "Escanea" quedaba a centímetros de "Toma
// una foto". El número es lo que ata cada captura con su tarjeta; sin él, dos
// listas de tres cosas seguidas se leen como seis.
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

        {/* Las tarjetas van ANTES de las capturas desde el 2026-09-25. Antes
            iban debajo, así que la secuencia se leía dos veces y al revés:
            primero tres fotos sin explicar y después el texto que las
            explicaba. Ahora se lee en el orden en que se entiende — qué vas a
            hacer, y luego cómo se ve. */}
        <NumberedList>
          {PASOS.map((p, i) => (
            <NumberedCard key={p.titulo} numero={i + 1} titulo={p.titulo}>
              {p.desc}
            </NumberedCard>
          ))}
        </NumberedList>

        {/* APILADAS EN EL TELÉFONO, tres columnas desde `md` — al revés de lo
            que hacía el mockup, y a propósito. En tres columnas a 375px cada
            captura medía 101px: la libreta de Mariangel, las filas rojas que
            no cuadran y el saldo de $270,50 son ilegibles a ese tamaño, así
            que la imagen ocupaba sitio sin enseñar nada. La secuencia la
            cuentan las tarjetas de arriba y los números de los pies, no la
            lectura de izquierda a derecha. `md` es el mismo corte que usa
            `NumberedList`, para que la sección entera cambie de forma de una
            vez y no en dos escalones.

            `max-w-[349px]` es el ancho nativo del PNG: apiladas, el contenedor
            llega a 592px en una tablet y estirar un archivo de 349px hasta ahí
            lo deja borroso. En tres columnas nunca llega a atar —la columna
            más ancha, a 1024px, mide 317px— así que solo actúa apilado. */}
        <ol className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-3">
          {PANTALLAS.map((p, i) => (
            <li key={p.src} className="relative mx-auto w-full max-w-[349px]">
              <Image
                src={p.src}
                alt={p.alt}
                width={349}
                height={680}
                sizes="(min-width: 768px) 320px, 349px"
                className="h-auto w-full"
              />

              {/* El pie ENCIMA de la captura, y no debajo como hasta hoy.
                  Debajo era `text-subtle` (#999) sobre blanco: 2,85:1, que no
                  llega ni al 4,5:1 de AA para texto normal. El rótulo que
                  numera los pasos de la única sección que explica cómo se usa
                  el producto no puede ser lo menos legible de la página. Ahora
                  el texto va sobre la píldora, en #000 y #4C4C4C: 21:1 y 8,9:1.

                  LO QUE DA EL CONTRASTE ES QUE LA PÍLDORA SEA OPACA, no lo que
                  haya detrás. Conviene decirlo porque lo contrario parecía
                  cierto: los tres PNG son mockups de iPhone con el bisel y la
                  barra de estado oscuros arriba, y la primera versión de este
                  comentario daba por hecho que la píldora se apoyaba en esa
                  franja. Medido sobre los píxeles el 2026-09-25, la franja va
                  del 1,8% al 6,2% del alto fuera del notch —no al 10% que
                  parecía a ojo—, así que la píldora la desborda por abajo y
                  pisa contenido claro. Da igual: encima de ella el texto es el
                  mismo. Lo que sí hace falta es lo de abajo.

                  BORDE Y SOMBRA NO SON ADORNO. Donde la píldora cae sobre
                  pantalla blanca, `border-border` (#E5E5E5) contra blanco es
                  1,2:1 y no recorta nada por sí solo. La sombra es el mismo
                  recurso que ya usa el botón flotante de "Soporte" por esta
                  razón exacta. Quitar cualquiera de los dos deja la píldora
                  flotando sin bordes sobre las capturas 2 y 3.

                  `top-[1.8%]`, en porcentaje y no en píxeles: la captura se
                  escala con la columna —de 232px en una tablet a 349px
                  apilada— y un valor fijo se despegaría del borde superior al
                  encogerse. Con 1,8% el canto de la píldora coincide con el
                  arranque de la pantalla del teléfono. */}
              <span className="absolute top-[1.8%] left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 font-mono text-eyebrow whitespace-nowrap shadow-[0_2px_8px_rgb(0_0_0/0.16)]">
                {/* `aria-hidden` igual que en NumberedCard: la lista ya anuncia
                    "elemento 1 de 3", y oír "cero uno" antes solo estorba. */}
                <span aria-hidden="true" className="text-muted-foreground tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground">{p.pie}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
