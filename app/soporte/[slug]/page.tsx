import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Texto } from "@/components/soporte/texto";
import { TEMAS, etiquetaDeGrupo, temaPorSlug } from "@/lib/soporte";
import { SIGNUP_URL } from "@/lib/config";

// El sitio se exporta estático, así que las nueve rutas se generan en el build.
export function generateStaticParams() {
  return TEMAS.map((tema) => ({ slug: tema.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tema = temaPorSlug(slug);
  if (!tema) return {};
  return {
    title: `${tema.titulo} — Soporte de Sevenz`,
    description: tema.resumen,
    alternates: { canonical: `/soporte/${tema.slug}` },
  };
}

export default async function TemaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tema = temaPorSlug(slug);
  if (!tema) notFound();

  const posicion = TEMAS.findIndex((t) => t.slug === tema.slug);
  const siguiente = TEMAS[posicion + 1];

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
      <Button variant="ghost" size="sm" asChild className="-ml-2.5">
        <Link href="/soporte">
          <ChevronLeftIcon className="size-4" />
          Todos los temas
        </Link>
      </Button>

      <p className="mt-8 text-xs font-medium text-muted-foreground">
        {etiquetaDeGrupo(tema.grupo)}
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{tema.titulo}</h1>
      <p className="mt-3 text-lg text-muted-foreground">{tema.resumen}</p>

      <ol className="mt-10 flex flex-col gap-5">
        {tema.pasos.map((paso, i) => (
          <li key={i} className="grid grid-cols-[1.75rem_1fr] items-start gap-x-4">
            <span className="flex size-7 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground tabular-nums">
              {i + 1}
            </span>
            <div>
              <p className="leading-relaxed">
                <Texto>{paso.texto}</Texto>
              </p>
              {paso.pista ? (
                <p className="mt-1.5 text-sm text-muted-foreground">
                  <Texto>{paso.pista}</Texto>
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {tema.cierre?.map((parrafo, i) => (
        <p key={i} className="mt-6 leading-relaxed">
          <Texto>{parrafo}</Texto>
        </p>
      ))}

      {tema.notas.map((nota, i) => (
        <div
          key={i}
          className={
            // Sevenz no tiene color de aviso: la nota normal es --muted y
            // --destructive queda para lo único que no se puede deshacer.
            nota.cuidado
              ? "mt-8 rounded-lg border border-destructive p-4"
              : "mt-8 rounded-lg bg-muted p-4"
          }
        >
          <p
            className={
              nota.cuidado ? "font-semibold text-destructive" : "font-semibold text-foreground"
            }
          >
            {nota.titulo}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            <Texto>{nota.texto}</Texto>
          </p>
        </div>
      ))}

      <div className="mt-14 flex flex-col gap-4 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
        {siguiente ? (
          <Link href={`/soporte/${siguiente.slug}`} className="group">
            <span className="text-xs font-medium text-muted-foreground">Siguiente</span>
            <span className="block font-medium group-hover:underline">{siguiente.titulo}</span>
          </Link>
        ) : (
          <span />
        )}
        <Button asChild>
          <a href={SIGNUP_URL}>Probar gratis →</a>
        </Button>
      </div>
    </main>
  );
}
