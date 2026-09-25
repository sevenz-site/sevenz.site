import type { Metadata } from "next";
import { ExploradorDeSoporte } from "@/components/soporte/explorador";
import { TEMAS } from "@/lib/soporte";
import { OG_IMAGE, SITE_URL } from "@/lib/config";

// "Ayuda" y ya no "Soporte", en la etiqueta Y EN LA RUTA, desde el 2026-09-25.
//
// La ruta vieja no desaparece sin más: `/soporte` y sus diez temas llevan meses
// indexados y hay enlaces sueltos compartidos por WhatsApp. Quien siga uno
// aterriza igual aquí, por los 301 de `public/_redirects` — que en este sitio
// son la única forma de redirigir, porque `output: "export"` no ejecuta los
// `redirects()` de `next.config.ts`. Si esos dos renglones se pierden, once URLs
// indexadas devuelven 404 y nada en el build se queja.
export const metadata: Metadata = {
  title: "Ayuda — Cómo usar Sevenz",
  description:
    "Guía paso a paso de Sevenz: registrar un fiado, registrar un abono, compartir el saldo por WhatsApp, marcar una mala paga, importar tu libreta con una foto y más.",
  alternates: {
    canonical: "/ayuda",
  },
  // `openGraph` propio, aunque repita el título y la descripción de arriba.
  //
  // Next hereda del layout raíz lo que una página no declare, así que hasta
  // hoy compartir este enlace por WhatsApp enseñaba el título de la PORTADA:
  // el enlace decía una cosa y la vista previa, otra. La imagen sí se hereda a
  // propósito — es la misma para todo el sitio.
  openGraph: {
    title: "Ayuda — Cómo usar Sevenz",
    description:
      "Guía paso a paso de Sevenz: registrar un fiado, un abono, compartir el saldo por WhatsApp, marcar una mala paga o importar tu libreta con una foto.",
    url: "/ayuda",
    images: [OG_IMAGE],
  },
};

export default function AyudaPage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <p className="font-mono text-eyebrow text-subtle">Ayuda</p>
      <h1 className="text-display md:text-display-lg mt-5 text-balance">Cómo usar Sevenz</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Busca lo que necesitas hacer, o mira los temas por qué tan seguido los vas a usar.
      </p>

      <div className="mt-10">
        <ExploradorDeSoporte />
      </div>

      {/* Cada tema es un HowTo con sus pasos. Es lo que permite que una
          búsqueda como "cómo registrar un abono en Sevenz" muestre los pasos
          directamente, en vez de solo el título de la página. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": TEMAS.map((tema) => ({
              "@type": "HowTo",
              name: tema.titulo,
              description: tema.resumen,
              url: `${SITE_URL}/ayuda/${tema.slug}`,
              step: tema.pasos.map((paso, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                text: paso.texto.replace(/\[\[|\]\]/g, ""),
              })),
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
