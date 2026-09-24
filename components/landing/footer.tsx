import Image from "next/image";
import Link from "next/link";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/config";

export function Footer() {
  return (
    // Sin regla arriba, a diferencia de la v1. La sección que va justo encima
    // es la llamada final —titular grande y botón negro a ancho completo— y ya
    // se cierra sola; una línea ahí dentro parte en dos lo que se lee como un
    // solo bloque. Quien necesita separación es el contenido largo de soporte
    // y legales, y esos traen la suya.
    //
    // El aire de abajo no es estético: es el hueco del botón flotante de
    // WhatsApp, que se queda quieto en la esquina inferior derecha mientras
    // esta fila es lo último que pasa por debajo. Sin él tapaba "Ingresar" y
    // "Regístrate" —los dos enteros en un teléfono, "Regístrate" al 60% en
    // escritorio— y un enlace tapado no se puede tocar.
    //
    // Recalculado el 2026-09-24: el botón pasó a decir "Soporte" en blanco con
    // borde, y creció a 58px de alto y 157 de ancho. Con `pb-24` quedaban 22px
    // de holgura sobre los enlaces —no se tapaban, pero por poco—, así que
    // sube a `pb-28` (112px) y quedan 38. Medido en el navegador a 375px, con
    // la página al final del todo, que es la única posición en la que el botón
    // y el pie coinciden en pantalla.
    //
    // Si el botón vuelve a cambiar de alto o de margen, esto cambia con él.
    <footer className="px-6 pt-12 pb-28">
      {/* Todo centrado, en las dos anchuras. La v1 separaba copyright a la
          izquierda y enlaces a la derecha desde sm; el mockup v2 los apila
          centrados y esa forma aguanta igual de bien en escritorio, así que no
          hay motivo para mantener dos maquetaciones distintas. */}
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="" width={20} height={20} className="rounded-sm" />
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sevenz</span>
        </div>

        {/* `flex-wrap` y no una rejilla: en un teléfono caben cuatro y
            "Regístrate" baja sola a la segunda línea, que es exactamente lo
            que hace el mockup. Con columnas fijas habría que elegir el corte a
            mano y volver a elegirlo cada vez que cambie una etiqueta. */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          <Link href="/terminos-y-condiciones" className="hover:text-foreground">
            Términos
          </Link>
          <Link href="/politica-de-privacidad" className="hover:text-foreground">
            Privacidad
          </Link>
          {/* "Calculadora BCV", como en la cabecera y como en el mockup. Antes
              decía "Dólar BCV" aquí y "Calculadora BCV" arriba: el mismo
              destino con dos nombres, que obliga a comprobar si son lo mismo.
              Y es la página que más tráfico de búsqueda trae, así que su
              nombre conviene que sea uno solo. */}
          <Link href="/calculadora-dolar-bcv" className="hover:text-foreground">
            Calculadora BCV
          </Link>
          <a href={LOGIN_URL} className="hover:text-foreground">
            Ingresar
          </a>
          <a href={SIGNUP_URL} className="hover:text-foreground">
            Regístrate
          </a>
        </nav>
      </div>
    </footer>
  );
}
