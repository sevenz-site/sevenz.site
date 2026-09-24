import { CircleCheck } from "lucide-react";
import { Section } from "@/components/landing/section";

// TODO LO QUE ENTRA, SIN SEPARAR LO QUE YA EXISTE DE LO QUE NO.
//
// Decisión del usuario el 2026-09-24, después de que se le señalara que tres
// de estas once líneas describen cosas que la app todavía no hace: el USDT de
// la calculadora (pendiente CT-6), los reportes (CT-7, plan escrito sin
// construir) y las notificaciones automáticas al CLIENTE (MS-3, bloqueada por
// MS-4, MS-7, MS-9 y la constitución de la sociedad). Lo que sale el 2026-09-28
// son los avisos al DUEÑO, no al cliente.
//
// Queda escrito aquí y como pendiente abierto en PENDIENTES.md porque es
// exactamente la clase de frase que nadie recuerda haber escrito el día que un
// dueño que paga veinte dólares no encuentra los reportes.
const INCLUIDO = [
  // El mockup decía "vís WhatsApp".
  "Recordatorios de cobro vía WhatsApp.",
  "Hasta 5 fotos de libreta al mes, sin costo.",
  "Envío automatizado de notificaciones de cobro y abonos vía WhatsApp.",
  "Importación autónoma de libreta.",
  // El mockup decía "historial de abonos, fiados e historial", con la palabra
  // repetida. Se quita la repetición sin inventar una tercera cosa que la app
  // no prometa: una lista de características es justo donde no se improvisa.
  "Perfil de cliente con historial de abonos y fiados.",
  "Balance de fiado vs. abonos, en dólares y en euros.",
  "Puntaje de puntualidad: sabe quién paga a tiempo y quién no.",
  "Lista de morosos y malas pagas, sin tener que recordarlo tú.",
  "Calculadora de tasa de cambio: dólar, USDT y euro, siempre actualizada.",
  "Reportes de fiado y cartera.",
  "Acceso garantizado a nuevas funcionalidades.",
];

export function Pricing() {
  return (
    <Section>
      <div className="flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-display md:text-display-lg lg:text-display-xl max-w-2xl text-balance">
            Prueba gratis 2 meses
            {/* El precio en su propia línea y a la misma escala que el titular,
                como el mockup: es la mitad del mensaje, no un pie. */}
            <span className="block">0$</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            USD 20 por mes al finalizar período de prueba
          </p>
        </div>

        {/* Una columna en el teléfono, como el mockup; dos en escritorio,
            porque once líneas en una sola columna de 900px dejan medio ancho
            vacío y obligan a recorrer la página entera para leerlas. */}
        <ul className="grid w-full max-w-3xl gap-4 text-left sm:grid-cols-2">
          {INCLUIDO.map((item) => (
            <li key={item} className="flex items-start gap-4">
              {/* El círculo va en gris, no en verde ni en negro: en una lista
                  de once, once marcas de color se comen el titular que tienen
                  encima. Lo que tiene que resaltar es el precio. */}
              <CircleCheck
                aria-hidden="true"
                strokeWidth={1.5}
                className="mt-0.5 size-6 shrink-0 text-subtle"
              />
              <span className="text-lg text-pretty">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
