import type { Metadata } from "next";
import { ExploradorDeSoporte } from "@/components/soporte/explorador";
import { TEMAS } from "@/lib/soporte";
import { SITE_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Soporte — Cómo usar Sevenz",
  description:
    "Guía paso a paso de Sevenz: registrar un fiado, registrar un abono, compartir el saldo por WhatsApp, marcar una mala paga, importar tu libreta con una foto y más.",
  alternates: {
    canonical: "/soporte",
  },
};

export default function SoportePage() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-16">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">Soporte</p>
      <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">Cómo usar Sevenz</h1>
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
              url: `${SITE_URL}/soporte/${tema.slug}`,
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
