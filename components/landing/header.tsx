"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/config";

const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/calculadora-dolar-bcv", label: "Calculadora BCV" },
  { href: "/soporte", label: "Soporte" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [rutaVista, setRutaVista] = useState(pathname);

  // Cerrar al cambiar de página: sin esto el panel sobrevive a la navegación y
  // el visitante aterriza en la página nueva con el menú encima.
  //
  // Ajustado durante el render y no en un efecto: así React lo resuelve antes
  // de pintar, sin el parpadeo del menú abierto sobre la página nueva. Cubre
  // también atrás y adelante del navegador, que un onClick en los enlaces no
  // alcanzaría.
  if (rutaVista !== pathname) {
    setRutaVista(pathname);
    setOpen(false);
  }

  // Con el panel abierto, el fondo no debe desplazarse detrás.
  useEffect(() => {
    if (!open) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const alEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", alEscape);
    return () => window.removeEventListener("keydown", alEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      {/* En móvil: rejilla de tres columnas — hamburguesa, logo, hueco — para
          que el logo quede centrado de verdad y no desplazado por el ancho del
          botón. Desde md pasa a flex y las columnas dejan de aplicar; los
          elementos que sobran están ocultos, así que no ocupan celda. */}
      <div className="mx-auto grid h-16 w-full max-w-5xl grid-cols-[2.5rem_1fr_2.5rem] items-center px-6 md:flex md:justify-between md:gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="-ml-2 justify-self-start md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </Button>

        <Link
          href="/"
          className="flex shrink-0 items-center justify-self-center md:justify-self-auto"
          aria-label="Sevenz, ir al inicio"
        >
          <Image src="/logo.svg" alt="Sevenz" width={110} height={34} priority />
        </Link>

        {/* Contrapeso del botón: sin él la rejilla centra el logo respecto al
            espacio que queda, no respecto a la pantalla. */}
        <span className="md:hidden" aria-hidden="true" />

        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-colors hover:text-foreground",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Los dos CTA salen de la barra en móvil y viven en el menú: el
            mockup deja arriba solo hamburguesa y logo. En el inicio no se
            pierde nada, porque el hero ya trae su propio "Probar gratis". */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href={LOGIN_URL}
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Iniciar sesión
          </a>
          <Button asChild size="sm">
            <a href={SIGNUP_URL}>Probar gratis</a>
          </Button>
        </div>
      </div>

      {open ? (
        <div id="menu-movil" className="border-t bg-background md:hidden">
          <nav className="mx-auto flex w-full max-w-5xl flex-col px-6 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "flex min-h-11 items-center border-b text-base font-medium",
                  pathname === item.href ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            {/* Los dos CTA, ya no en la barra. "Probar gratis" relleno y
                "Iniciar sesión" no: la acción principal se distingue de la
                secundaria por el peso, no por el orden. */}
            <a
              href={LOGIN_URL}
              className="flex min-h-11 items-center border-b text-base font-medium text-muted-foreground"
            >
              Iniciar sesión
            </a>
            <Button asChild className="my-3 w-full">
              <a href={SIGNUP_URL}>Probar gratis</a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
