import { cn } from "@/lib/utils";

// La anatomía que el mockup v2 repite en las siete secciones de la portada:
// un rótulo opcional en mono, un titular grande en negro y un párrafo gris.
//
// Vive en un componente y no copiado siete veces porque el ritmo de la página
// ES esa repetición: si una sección se queda con el titular un punto más
// pequeño o el párrafo un gris más claro, no se lee como un descuido en esa
// sección, se lee como que la página está mal armada. Y siete copias es
// exactamente el número a partir del cual nadie las cambia todas.

export function Section({
  children,
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section className={cn("px-6 py-20 md:py-28", className)} {...props}>
      {/* max-w-5xl es el mismo de la cabecera y el pie: el contenido de la
          portada no puede ir más ancho que la barra que lleva encima. */}
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  titulo,
  lead,
  align = "left",
  split = false,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  titulo: React.ReactNode;
  lead?: React.ReactNode;
  // El mockup alinea a la izquierda las secciones que explican algo y centra
  // las que piden algo (precio, preguntas, llamada final). No es decorativo:
  // un titular centrado corta la lectura y pide una decisión; uno a la
  // izquierda invita a seguir leyendo la línea siguiente.
  align?: "left" | "center";
  // Solo de `lg` para arriba, y solo con `align="left"`: el párrafo pasa de
  // ir debajo del titular a ir a su lado.
  //
  // POR QUÉ. El mockup es de teléfono, donde apilar es la única opción. En
  // 1280px ese mismo apilado deja el titular arrinconado arriba a la
  // izquierda y media pantalla en blanco al lado — no es "aire", es que la
  // cabecera de sección pesa la mitad de lo que debería justo antes de las
  // tarjetas. Partirla en dos columnas le devuelve el ancho sin cambiar una
  // palabra ni el orden de lectura.
  split?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  const centrado = align === "center";
  const partido = split && !centrado;

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centrado ? "items-center text-center" : "items-start text-left",
        // `items-end` alinea los dos bloques por abajo, así que el párrafo
        // queda apoyado en la misma línea que la última del titular en vez de
        // flotando a media altura.
        partido && "lg:grid lg:grid-cols-2 lg:items-end lg:gap-12",
        className,
      )}
    >
      {eyebrow ? (
        // Caja normal, no mayúsculas. La v1 lo ponía en `uppercase` y el
        // mockup no: en mono y con tracking ya se lee como rótulo, y en
        // mayúsculas una frase de seis palabras se vuelve un bloque que hay
        // que descifrar antes del titular que viene debajo.
        <p className={cn("font-mono text-eyebrow text-subtle", partido && "lg:col-span-2")}>
          {eyebrow}
        </p>
      ) : null}

      <Tag
        className={cn(
          "text-display md:text-display-lg lg:text-display-xl text-balance",
          // El titular es lo único negro puro de la sección. El contraste
          // contra el párrafo gris de debajo es lo que sostiene la jerarquía,
          // así que no lleva color: hereda `foreground`.
          centrado ? "max-w-3xl" : "max-w-2xl",
          // Dentro de una columna el ancho ya lo pone la rejilla; dejar el
          // `max-w` lo estrecharía una segunda vez.
          partido && "lg:max-w-none",
        )}
      >
        {titulo}
      </Tag>

      {lead ? (
        <p
          className={cn(
            "text-lg text-muted-foreground text-pretty",
            centrado ? "max-w-xl" : "max-w-2xl",
            partido && "lg:max-w-none lg:pb-2",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
