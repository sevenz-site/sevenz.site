import Link from "next/link";
import { Section, SectionHeading } from "@/components/landing/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS: { q: string; a: string; href?: string; hrefLabel?: string }[] = [
  {
    q: "¿Qué es el fiado y por qué necesito controlarlo?",
    a: "El fiado es la venta a crédito que muchos negocios en Venezuela hacen de palabra, apuntada en una libreta. El problema no es fiar — es que solo tú ves el número, y con el tiempo se te pierde la cuenta o el cliente la disputa. Sevenz pone ese número frente a los dos, siempre igual.",
  },
  {
    q: "¿Cómo funciono con Sevenz sin re-escribir toda mi libreta?",
    a: "Tomas una foto de tu libreta actual tal como está hoy y Sevenz arma tu cartera digital con esos datos. Desde ahí, cada movimiento nuevo (fiado o abono) lo registras en la app y el saldo se actualiza al instante para ti y tu cliente.",
  },
  {
    q: "¿Es seguro compartir el saldo del fiado por WhatsApp?",
    a: "Tu cliente ve su saldo a través de un link que le compartes por WhatsApp — no necesita instalar nada ni crear una cuenta. El link solo muestra su propio saldo, no el de otros clientes ni el resto de tu cartera.",
  },
  {
    // Actualizada el 2026-09-24 con el precio del mockup v2. Antes decía "vale
    // 30 USD al mes" y la sección de precio ya dice 20: dos cifras para lo
    // mismo en la misma página es peor que no dar ninguna. La promesa de
    // avisar antes de cobrar se mantiene palabra por palabra — es lo único de
    // esta respuesta que es un compromiso y no un dato.
    q: "¿Cuánto cuesta usar Sevenz?",
    a: "Lo pruebas gratis dos meses, completo, con hasta 5 fotos de libreta al mes y sin tarjeta de crédito. Después vale 20 USD al mes. Si empezamos a cobrarte, te avisamos antes — nunca te vamos a cobrar algo que no sepas.",
  },
  {
    q: "¿Qué pasa si un cliente dice que no debe tanto?",
    a: "Como el cliente ve el mismo número que tú — con fecha, monto y detalle de cada movimiento — la disputa se resuelve mirando la app, no discutiendo de memoria.",
  },
  {
    q: "¿Sevenz me va a poner lento el teléfono?",
    a: "No. Sevenz se abre en el navegador, como cualquier página, y tu cartera vive en la nube: no se te llena la memoria con los datos de tus clientes ni con las fotos de la libreta. Si la instalas en tu pantalla de inicio ocupa apenas el icono — tampoco ahí baja nada pesado.",
  },
  {
    // La pregunta que los tenderos hacen de verdad, con sus palabras. Sevenz es
    // instalable desde agosto y ninguno se había enterado: Android enseña su
    // propio aviso, discreto, y en iPhone no aparece nunca. Preguntar por la
    // tienda no es querer la tienda, es no saber que ya se puede.
    q: "¿Sevenz está en la Play Store? ¿La puedo descargar?",
    a: "En la tienda todavía no, pero sí la puedes tener en tu pantalla de inicio, con su icono y abriendo a pantalla completa como cualquier otra app. Se instala desde el mismo navegador, en dos toques, sin descargar nada. En Android se hace desde Chrome, donde la app te lo ofrece sola; en iPhone, desde el botón de compartir de Safari. Te dejamos los pasos en Ayuda.",
    href: "/ayuda/instalar-la-app-en-tu-telefono",
    hrefLabel: "Ver cómo instalarla",
  },
  {
    // "Anónima" no se dice: la app guarda nombres, cédulas y teléfonos de
    // personas reales, y afirmar lo contrario contradiría la Política de
    // Privacidad de este mismo sitio. Lo que sí se afirma es exactamente lo
    // que esa política sostiene — cifrado en tránsito y separación por cuenta
    // a nivel de fila — sin prometer de más.
    q: "¿Quién puede ver los datos de mis clientes?",
    a: "Solo tú. Los datos viajan cifrados entre tu teléfono y Sevenz, y cada cuenta está separada de las demás dentro de la base de datos: ningún otro negocio puede ver tu cartera, ni tú la suya. Tu cliente solo ve su propio saldo, a través del link que tú le mandas. Guardamos nombres y teléfonos reales porque sin eso no hay fiado que valga — por eso están protegidos, y por eso puedes leer en la Política de Privacidad qué guardamos y por cuánto tiempo.",
  },
  {
    // Novena pregunta, nueva en el mockup v2. La anterior contesta QUIÉN ve la
    // cartera; esta contesta qué pasa con ella, que es la duda de quien lleva
    // años dependiendo de un cuaderno físico. Por eso la respuesta empieza por
    // perder el teléfono y no por la criptografía: es el riesgo que esa
    // persona ha vivido de verdad.
    //
    // No dice "totalmente seguro" ni nombra certificaciones que Sevenz no
    // tiene. Afirma lo mismo que la Política de Privacidad de este sitio
    // sostiene, ni una palabra más.
    q: "¿Qué tan seguro es usar Sevenz?",
    a: "Tu cartera no vive en el teléfono: vive en la nube, cifrada mientras viaja y separada de la de cualquier otro negocio dentro de la base de datos. Si el teléfono se pierde, se moja o se daña, tus cuentas siguen completas — entras desde otro y están ahí, que es justamente lo que una libreta no te da. El link que le mandas a un cliente abre su propio saldo y nada más: ni el de otro cliente, ni el resto de tu cartera.",
  },
  {
    // "Darse de baja" significa dos cosas distintas para quien pregunta —
    // dejar de pagar, o querer que se borre todo— y la respuesta cubre las
    // dos, porque el que la hace no está distinguiendo: está preguntando
    // "¿pierdo lo que anoté?".
    //
    // CADA FRASE SALE DE ALGO COMPROBADO, no de lo que sería razonable:
    //
    //   - "no se borra nada" y "solo lectura" → §7 de la Política de
    //     Privacidad de este mismo sitio, palabra por palabra.
    //   - "los links siguen funcionando" → comprobado en el código, no
    //     supuesto: `get_shared_balance` es SECURITY DEFINER y no pasa por
    //     las políticas que bloquean al dueño (migración 061 del dashboard,
    //     que lo dice explícitamente). Ni la página pública consulta el
    //     bloqueo.
    //   - el correo es el mismo que ya aparece en la §7.
    //
    // LO QUE ESTA RESPUESTA NO DICE, Y ES DELIBERADO: los avisos por WhatsApp
    // SIGUEN llegándole a una cuenta bloqueada. Una versión anterior de esta
    // frase decía que se detenían, y se quitó al decidirse lo contrario el
    // 2026-09-25 — el dueño sigue recibiendo el valor del producto, y eso
    // puede empujarle a ponerse al día. No se menciona aquí porque la
    // pregunta es qué pasa con la CARTERA; explicar que le siguen llegando
    // avisos que no puede atender abriría una duda que nadie hizo.
    q: "¿Qué pasa con mi cartera si me doy de baja?",
    a: "No se borra nada. Si terminas la prueba sin contratar o dejas de pagar, tu cuenta pasa a solo lectura: sigues entrando y viendo toda tu cartera y todo el historial, pero no puedes registrar movimientos nuevos. Los links que ya le compartiste a tus clientes siguen funcionando, así que ellos también siguen viendo su saldo. Y si lo que quieres es que borremos tus datos de verdad, lo pides por correo y lo hacemos.",
    href: "/politica-de-privacidad",
    hrefLabel: "Leer qué guardamos y por cuánto tiempo",
  },
];

export function Faq() {
  return (
    <Section className="flex flex-col items-center">
      <SectionHeading
        eyebrow="Preguntas frecuentes"
        titulo="Todo lo que preguntan antes de fiar con Sevenz"
        align="center"
        className="mx-auto"
      />

      {/* La primera abierta a propósito: enseña que las demás se abren. Con
          todas cerradas, nueve títulos seguidos se leen como un menú y no como
          respuestas. `collapsible` deja cerrarla también, así que nadie queda
          obligado a mirar una respuesta que no le interesa.

          El JSON-LD de abajo sigue saliendo del mismo arreglo, así que Google
          ve las nueve respuestas completas aunque ocho estén plegadas. */}
      <Accordion
        type="single"
        collapsible
        defaultValue="faq-0"
        className="mx-auto mt-12 w-full max-w-2xl border-t text-left"
      >
        {FAQS.map((item, i) => (
          <AccordionItem key={item.q} value={`faq-${i}`}>
            <AccordionTrigger className="text-lg font-semibold">{item.q}</AccordionTrigger>
            <AccordionContent className="text-base text-muted-foreground">
              {item.a}
              {/* El enlace va fuera de `a` y no dentro: ese texto también
                  alimenta el JSON-LD de abajo, y Google no quiere etiquetas
                  ahí. Así la respuesta se lee igual en los dos sitios. */}
              {item.href ? (
                <>
                  {" "}
                  <Link href={item.href} className="font-medium text-foreground underline underline-offset-4">
                    {item.hrefLabel}
                  </Link>
                </>
              ) : null}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </Section>
  );
}
