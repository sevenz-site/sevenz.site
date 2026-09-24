// La tarjeta gris numerada. Sale dos veces en la portada: los tres problemas
// de "Así administras el fiado hoy" y los tres pasos de "Tres pasos y tu
// cartera de fiado queda al día".
//
// LA NUMERACIÓN DICE ALGO, NO DECORA. En los pasos es una secuencia real —
// primero la foto, después la verificación, después confirmar— y saltarse el
// orden no funciona. En los problemas no es secuencia sino inventario, y aun
// así el mockup los numera: ahí el número hace de ancla para poder decir "el
// 02 es el que me pasa a mí". Las dos lecturas justifican el número; lo que no
// lo justificaría es ponerlo porque queda bien.
//
// Por eso el número va en `aria-hidden`: quien escucha la página ya recibe la
// secuencia de la lista, y oír "cero uno" antes de cada punto solo estorba.

export function NumberedCard({
  numero,
  titulo,
  children,
}: {
  numero: number;
  // Opcional: en "Así administras" la tarjeta es una sola frase sin título; en
  // los pasos lleva título en negrita y descripción debajo.
  titulo?: string;
  children: React.ReactNode;
}) {
  return (
    // `rounded-lg` (10px), medido sobre las esquinas del mockup a resolución
    // nativa: el radio sale ~10% del alto tanto en las tarjetas como en los
    // botones. Que coincidan no es casualidad del archivo de diseño, es lo
    // que hace que la página se lea como una sola pieza y no como dos
    // sistemas pegados — así que si un día cambia uno, cambian los dos.
    // En columna a partir de `md`: el número deja de ir al lado del texto y
    // pasa a ir encima. Al lado funciona en un teléfono, donde la tarjeta es
    // ancha y baja; en una columna de 330px robaría un tercio del ancho a una
    // frase que ya va justa.
    //
    // `h-full` para que las tres tarjetas de una fila midan lo mismo aunque su
    // texto ocupe dos líneas o tres. Sin esto, tres cajas grises de alturas
    // distintas se leen como tres cosas de importancia distinta.
    <li className="flex h-full gap-5 rounded-lg bg-muted p-6 sm:gap-6 sm:p-7 md:flex-col md:gap-3">
      <span
        aria-hidden="true"
        className="font-mono text-lg font-medium text-subtle tabular-nums"
      >
        {String(numero).padStart(2, "0")}
      </span>

      <div className="flex flex-col gap-1">
        {titulo ? <h3 className="text-lg font-semibold">{titulo}</h3> : null}
        <p className="text-lg text-pretty">{children}</p>
      </div>
    </li>
  );
}

export function NumberedList({ children }: { children: React.ReactNode }) {
  // Lista de verdad, no `div`s: son tres puntos enumerados y un lector de
  // pantalla debe anunciar "lista de 3 elementos". `gap` en el contenedor y no
  // márgenes en las tarjetas, para que no se sumen ni se colapsen.
  //
  // Apiladas en el teléfono, como el mockup; en tres columnas desde `md`.
  // Estiradas a lo ancho de 1024px cada tarjeta es una tira con una frase
  // corta a la izquierda y ochocientos píxeles de gris vacío detrás: la caja
  // deja de agrupar nada y solo pinta una banda.
  return <ul className="grid gap-3 md:grid-cols-3">{children}</ul>;
}
