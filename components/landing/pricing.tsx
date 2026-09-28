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
      {/* LA TARJETA OSCURA, desde el 2026-09-27. Antes era blanca con borde, y
          el borde era lo único que la separaba del resto de la portada. La
          inversión hace ese mismo trabajo sin pedir permiso: en una página
          entera en blanco, el único bloque negro es donde va la vista. Sigue
          siendo la única sección con tratamiento propio.

          `bg-primary` (#171717) y no un negro suelto: es el mismo de los
          botones de la portada, así que la tarjeta y el botón del hero se leen
          como el mismo sistema. Y si algún día se enciende el modo oscuro —hoy
          la clase `.dark` existe en globals.css pero no se aplica nunca—, el
          par primary/primary-foreground se invierte junto y la tarjeta seguiría
          contrastando con la página en vez de fundirse con ella. Un `#171717`
          escrito a mano se habría quedado negro sobre negro.

          `max-w-2xl` (672px) y no los 768 de antes: acotada, como el mockup,
          pero no tan estrecha como para dejar las once líneas en una sola
          columna de 800px de alto.

          A LA IZQUIERDA, no centrada. Centrado era una oferta que se mira;
          alineado a la izquierda es una ficha que se lee, y once líneas de
          características son para leer. */}
      <div className="mx-auto flex max-w-2xl flex-col gap-8 rounded-lg bg-primary p-6 text-primary-foreground sm:p-10">
        <div className="flex flex-col gap-1.5">
          {/* El rótulo, con la misma convención que los demás de la página:
              mono, caja normal, y un nivel por debajo del texto. Sobre negro
              ese nivel NO puede ser `--subtle` (#999, calibrado contra
              blanco): se saca del propio color del texto con opacidad, que es
              lo que mantiene la relación si el par de colores cambia. */}
          <p className="font-mono text-eyebrow text-primary-foreground/60">Precio</p>

          {/* El h2 lleva las dos líneas, en el orden en que se leen. La cifra
              va primero y grande —es lo que el visitante viene a buscar— y la
              promesa debajo la explica. Antes era al revés y el precio parecía
              un pie del titular.

              Las dos dentro del MISMO h2 a propósito: son una sola frase
              partida en dos tamaños ("0$, prueba gratis 2 meses"), no un
              titular y un subtítulo. Separarlas en h2 + p dejaría el precio
              fuera del encabezado de la sección. */}
          <h2 className="flex flex-col gap-1.5">
            {/* Un escalón por encima del resto de titulares de la portada.
                En el mockup la tarjeta mide ~350px y la cifra ocupa casi un
                tercio de su ancho; al ensanchar la tarjeta a 672px, los 44px
                de `display-lg` la dejaban de tamaño de subtítulo y la lista
                de once líneas se la comía. `display-xl` le devuelve el peso
                que tiene en el mockup. */}
            <span className="text-display-lg md:text-display-xl">0$</span>
            <span className="text-lg font-semibold">Prueba gratis 2 meses</span>
          </h2>

          {/* "DESDE", y no es un adorno comercial: es lo único cierto.
              Sevenz NO tiene un precio único. `subscriptions.precio_pactado_usd`
              guarda lo que se acordó con cada negocio, y la migración 057 lo
              dice con todas las letras: "el precio se negocia entre 15 y 30 USD
              y el catálogo es solo la plantilla". Medido en dev el 2026-09-28,
              de los que están en Pro hay uno a 20 y otro a 25, y una demo
              pactada en 30.

              Publicar "20 USD al mes" a secas le da a quien acabe pagando 25
              una queja legitima, y los Términos ya dicen que el precio se
              acuerda con cada Comercio — así que la portada contradecía al
              contrato de la propia página.

              El plazo de prueba SÍ se queda: la única demo real dura 60 días
              exactos, o sea que dos meses es la práctica y no una promesa
              inventada. */}
          <p className="mt-1 text-primary-foreground/70 text-pretty">
            Desde 20 USD al mes al finalizar el periodo de prueba.
          </p>
        </div>

        {/* La divisoria separa la tarifa de lo que incluye. Sin ella las once
            líneas se leen como continuación del precio y no como su respaldo.
            `/15` es lo justo para que se vea sobre el negro sin competir con
            el texto. */}
        <hr className="border-primary-foreground/15" />

        {/* Dos columnas desde `sm`: once líneas seguidas dentro de una tarjeta
            acotada la dejarían larguísima y con medio ancho vacío. */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {INCLUIDO.map((item) => (
            <li key={item} className="flex items-start gap-3">
              {/* El círculo, un nivel por debajo del texto que acompaña: en
                  una lista de once, once marcas al mismo peso que la frase se
                  comen el precio que tienen encima. Lo que tiene que resaltar
                  es la cifra. */}
              <CircleCheck
                aria-hidden="true"
                strokeWidth={1.5}
                className="mt-0.5 size-5 shrink-0 text-primary-foreground/50"
              />
              <span className="text-primary-foreground/70 text-pretty">{item}</span>
            </li>
          ))}
        </ul>

        {/* El botón dentro de la tarjeta, no debajo. Es lo que cierra la
            oferta: leer once líneas y no tener dónde tocar obliga a subir al
            hero o a bajar al final de la página, y por el camino se pierde a
            quien ya había decidido.

            `secondary` y no `default`: sobre la tarjeta negra el botón negro
            desaparecería. Esta variante lo deja claro sobre oscuro y se
            mantiene coherente si el par de colores se invierte. A ancho
            completo en las dos anchuras, como el mockup — dentro de una
            tarjeta acotada ya no hay exceso de ancho del que defenderse. */}
        <Button asChild size="lg" variant="secondary" className="h-13 w-full rounded-lg text-base">
          <a href={SIGNUP_URL}>Probar gratis</a>
        </Button>
      </div>
    </Section>
  );
}
