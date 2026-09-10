"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { SearchIcon, XIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GRUPOS, TEMAS, type Grupo, etiquetaDeGrupo, textoBuscable } from "@/lib/soporte";

type Filtro = Grupo | "todos";

// El buscador y los filtros trabajan sobre los nueve temas ya cargados: son
// nueve, caben enteros en el HTML y filtrar en el navegador es instantáneo.
// Nada de esto pide nada al servidor, así que sigue funcionando en la
// exportación estática.
export function ExploradorDeSoporte() {
  const [consulta, setConsulta] = useState("");
  const [filtro, setFiltro] = useState<Filtro>("todos");

  // El texto buscable de cada tema se calcula una vez, no en cada tecla.
  const indexados = useMemo(
    () => TEMAS.map((tema) => ({ tema, texto: textoBuscable(tema) })),
    [],
  );

  const visibles = useMemo(() => {
    const q = consulta.trim().toLowerCase();
    return indexados
      .filter(({ tema }) => filtro === "todos" || tema.grupo === filtro)
      .filter(({ texto }) => q === "" || texto.includes(q))
      .map(({ tema }) => tema);
  }, [indexados, consulta, filtro]);

  const hayFiltro = consulta.trim() !== "" || filtro !== "todos";

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="relative">
        <SearchIcon
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
          placeholder="¿Qué necesitas hacer? Por ejemplo: abono, libreta, link"
          aria-label="Buscar en la guía"
          className="h-12 pl-9 text-base"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium">Temas:</span>
        {([{ id: "todos", label: "Todos" }, ...GRUPOS] as { id: Filtro; label: string }[]).map(
          (g) => {
            const activo = filtro === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setFiltro(g.id)}
                aria-pressed={activo}
                className={cn(
                  "inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                  activo
                    ? "border-foreground bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {g.label}
              </button>
            );
          },
        )}
      </div>

      {visibles.length === 0 ? (
        <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed p-8">
          <p className="text-muted-foreground">
            No encontramos nada con <span className="font-medium text-foreground">{consulta}</span>.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setConsulta("");
              setFiltro("todos");
            }}
          >
            <XIcon className="size-4" />
            Limpiar la búsqueda
          </Button>
        </div>
      ) : (
        <>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {hayFiltro
              ? `${visibles.length} de ${TEMAS.length} temas`
              : `Los ${TEMAS.length} temas, de lo que harás todos los días a lo que harás una sola vez.`}
          </p>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibles.map((tema) => (
              <li key={tema.slug} className="flex">
                <Link
                  href={`/soporte/${tema.slug}`}
                  className="group flex w-full flex-col overflow-hidden rounded-xl border transition-colors hover:border-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  {/* La portada es tipográfica y no una imagen: no existe una
                      ilustración por tema, e inventar fotos de archivo sería
                      meter un lenguaje visual que Sevenz no tiene. */}
                  <span className="flex aspect-[16/9] items-center justify-center bg-muted">
                    <span className="text-5xl font-semibold tracking-tight text-muted-foreground/60 tabular-nums">
                      {String(tema.numero).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="flex flex-1 flex-col gap-1.5 p-4">
                    <span className="text-xs font-medium text-muted-foreground">
                      {etiquetaDeGrupo(tema.grupo)}
                    </span>
                    <span className="text-base font-semibold group-hover:underline">
                      {tema.titulo}
                    </span>
                    <span className="text-sm text-muted-foreground">{tema.resumen}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
