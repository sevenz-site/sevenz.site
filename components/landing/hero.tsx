import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/lib/config";
import { FIADO_HEADLINE, FIADO_SUBHEAD } from "@/lib/copy";

// Las cuatro monedas con las que trabaja un negocio venezolano, como insignias
// encadenadas. No es una bandera por país: es una por unidad de cuenta, que es
// lo que el tendero tiene en la cabeza cuando fía — bolívares, dólares, USDT y
// euros.
//
// El `alt` va vacío a propósito y la fila entera lleva una etiqueta: cuatro
// imágenes decorativas seguidas anunciadas una a una ("bandera de Venezuela,
// bandera de Estados Unidos…") le dan a quien escucha cuatro interrupciones
// para decir una sola cosa.
const MONEDAS = [
  { src: "/flags/ves.svg", nombre: "bolívares" },
  { src: "/flags/usd.svg", nombre: "dólares" },
  { src: "/flags/usdt.svg", nombre: "USDT" },
  { src: "/flags/eur.svg", nombre: "euros" },
];

export function Hero() {
  return (
    <section className="flex flex-col items-center gap-10 px-6 pt-16 pb-20 text-center md:pt-24 md:pb-28">
      <div className="flex w-full max-w-3xl flex-col items-center gap-6">
        {/* Caja normal y no mayúsculas, como el mockup. Y "del fiado", no "de
            fiado": es el control del fiado que ya existe, no una modalidad de
            control llamada fiado. */}
        <p className="font-mono text-eyebrow text-subtle text-balance">
          Control del fiado para bodegas y comercios
        </p>

        <ul className="flex items-center" aria-label="Bolívares, dólares, USDT y euros">
          {MONEDAS.map((m, i) => (
            <li key={m.src} className={i === 0 ? "" : "-ml-3"}>
              {/* El anillo del color del fondo es lo que separa una insignia de
                  la siguiente cuando se solapan. Si el fondo de la sección
                  cambiara, este anillo tiene que cambiar con él — por eso es
                  `ring-background` y no `ring-white`. */}
              <span className="flex size-10 items-center justify-center overflow-hidden rounded-full ring-2 ring-background">
                <Image src={m.src} alt="" width={40} height={40} className="size-full object-cover" />
              </span>
            </li>
          ))}
        </ul>

        <h1 className="text-display md:text-display-lg lg:text-display-xl text-balance">
          {FIADO_HEADLINE}
        </h1>

        <p className="max-w-xl text-lg text-muted-foreground text-pretty">{FIADO_SUBHEAD}</p>

        {/* A ancho completo en el teléfono, como el mockup: es la única acción
            de la pantalla y no compite con nada. En escritorio se acota — un
            botón de 700px de ancho deja de leerse como botón. */}
        <Button asChild size="lg" className="h-13 w-full rounded-lg text-base sm:w-auto sm:min-w-64">
          <a href={SIGNUP_URL}>Probar gratis</a>
        </Button>
      </div>

      {/* Sin marco: estas capturas son recortes de teléfonos sobre
          transparencia, así que un borde y una sombra alrededor dibujarían una
          caja rectangular donde no hay ninguna.
          `priority` porque es la imagen grande del primer pantallazo y es la
          que mide el LCP. */}
      <Image
        src="/screens/sevenz-calculadora-balance-cartera-puntaje-credito.png"
        alt="La app de Sevenz en tres teléfonos: la calculadora del dólar BCV, el capital por cobrar en dólares y euros, y el puntaje de crédito de un cliente"
        width={1208}
        height={1072}
        priority
        sizes="(min-width: 1024px) 960px, 100vw"
        className="h-auto w-full max-w-4xl"
      />
    </section>
  );
}
