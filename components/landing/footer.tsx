import Image from "next/image";
import Link from "next/link";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/config";

export function Footer() {
  return (
    // El aire de abajo no es estético: es el hueco del botón flotante de
    // WhatsApp, que se queda quieto en la esquina inferior derecha mientras
    // esta fila es lo último que pasa por debajo. Sin él tapaba "Ingresar" y
    // "Regístrate" —los dos enteros en un teléfono, "Regístrate" al 60% en
    // escritorio— y un enlace tapado no se puede tocar. Son 56px de botón más
    // 16 de margen; pb-24 (96px) deja además algo de holgura.
    //
    // Si el botón cambia de alto o de margen, esto cambia con él. Medido a
    // 375px y a 1280px el 2026-09-20.
    <footer className="border-t px-6 pt-8 pb-24">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <Image src="/icon.svg" alt="" width={20} height={20} className="rounded-sm" />
          <span className="text-sm text-muted-foreground">© {new Date().getFullYear()} Sevenz</span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/terminos-y-condiciones" className="hover:text-foreground">
            Términos
          </Link>
          <Link href="/politica-de-privacidad" className="hover:text-foreground">
            Privacidad
          </Link>
          <Link href="/calculadora-dolar-bcv" className="hover:text-foreground">
            Dólar BCV
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
