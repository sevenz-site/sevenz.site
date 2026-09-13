import Link from "next/link";
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
    q: "¿Cuánto cuesta usar Sevenz?",
    a: "Sevenz vale 30 USD al mes, pero mientras arrancamos no cuesta nada: lo usas completo, con hasta 5 fotos de libreta al mes, sin costo y sin tarjeta de crédito. Si algún día empezamos a cobrar, te avisamos antes — nunca te vamos a cobrar algo que no sepas.",
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
    a: "En la tienda todavía no, pero sí la puedes tener en tu pantalla de inicio, con su icono y abriendo a pantalla completa como cualquier otra app. Se instala desde el mismo navegador, en dos toques, sin descargar nada. En Android la app te lo ofrece sola; en iPhone se hace desde el botón de compartir de Safari. Te dejamos los pasos en Soporte.",
    href: "/soporte/instalar-la-app-en-tu-telefono",
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
];

export function Faq() {
  return (
    <section className="flex flex-col items-center border-b px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
        Preguntas frecuentes
      </p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        Todo lo que preguntan antes de fiar con Sevenz
      </h2>

      {/* La primera abierta a propósito: enseña que las demás se abren. Con
          todas cerradas, cinco títulos seguidos se leen como un menú y no como
          respuestas. `collapsible` deja cerrarla también, así que nadie queda
          obligado a mirar una respuesta que no le interesa.

          El JSON-LD de abajo sigue saliendo del mismo arreglo, así que Google
          ve las cinco respuestas completas aunque cuatro estén plegadas. */}
      <Accordion
        type="single"
        collapsible
        defaultValue="faq-0"
        className="mt-10 w-full max-w-2xl border-t text-left"
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
    </section>
  );
}
