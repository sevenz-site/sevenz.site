import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/landing/section";
import { SIGNUP_URL } from "@/lib/config";

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
      {/* EL MARCO. Es la única sección de la portada que lo lleva, y eso es
          lo que hace: la separa de las que explican y la convierte en una
          oferta que se mira entera de una vez. El resto de la página no
          compite con ella porque el resto no tiene borde.

          `rounded-lg` (10px) como los botones y las tarjetas numeradas —el
          radio medido sobre el mockup— para que no parezca de otro sistema. */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 rounded-lg border p-6 text-center sm:p-10">
        <div className="flex flex-col items-center gap-3">
          {/* El rótulo, con la misma convención que los demás de la página:
              mono, caja normal, en el gris claro. Lo que aporta es orientar
              —"esto es el precio"— antes de que el titular diga "gratis", que
              leído solo puede parecer otra promesa más y no una tarifa. */}
          <p className="font-mono text-eyebrow text-subtle">Precio</p>

          <h2 className="text-display md:text-display-lg max-w-2xl text-balance">
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
            porque once líneas en una sola columna dentro del marco dejarían
            medio ancho vacío y una tarjeta larguísima. */}
        <ul className="grid w-full gap-4 text-left sm:grid-cols-2">
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

        {/* El botón dentro del marco, no debajo. Es lo que cierra la oferta:
            leer once líneas y no tener dónde tocar obliga a subir al hero o a
            bajar hasta el final de la página, y por el camino se pierde a
            quien ya había decidido.

            A ancho completo en el teléfono y acotado en escritorio, con el
            mismo alto y el mismo radio que los otros dos de la portada — uno
            distinto aquí se leería como otro tipo de acción. */}
        <Button asChild size="lg" className="h-13 w-full rounded-lg text-base sm:w-auto sm:min-w-64">
          <a href={SIGNUP_URL}>Probar gratis</a>
        </Button>
      </div>
    </Section>
  );
}
