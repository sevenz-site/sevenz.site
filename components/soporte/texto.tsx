import { Fragment } from "react";

// Convierte `[[Agregar fiado]]` en un chip que se lee como el botón real.
//
// Vive aparte porque lo usan el índice y la página de cada tema, y porque así
// lib/soporte.ts se queda siendo datos planos en vez de JSX.
export function Texto({ children }: { children: string }) {
  const trozos = children.split(/(\[\[[^\]]+\]\])/g);
  return (
    <>
      {trozos.map((trozo, i) =>
        trozo.startsWith("[[") && trozo.endsWith("]]") ? (
          <kbd
            key={i}
            className="rounded-sm border bg-secondary px-1.5 py-0.5 font-sans text-[0.875em] font-medium whitespace-nowrap text-foreground"
          >
            {trozo.slice(2, -2)}
          </kbd>
        ) : (
          <Fragment key={i}>{trozo}</Fragment>
        ),
      )}
    </>
  );
}
