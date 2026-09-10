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
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Sevenz, ir al inicio">
          <Image src="/logo.svg" alt="Sevenz" width={110} height={34} priority />
        </Link>

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

        <div className="flex items-center gap-2">
          <a
            href={LOGIN_URL}
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block"
          >
            Iniciar sesión
          </a>
          <Button asChild size="sm">
            <a href={SIGNUP_URL}>Probar gratis</a>
          </Button>
          {/* Los tres enlaces más los dos botones no caben en 375px, así que
              debajo de md se pliegan aquí. size="icon" es cuadrado y no lleva
              etiqueta con la que alinearse, de ahí el aria-label. */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <XIcon className="size-5" /> : <MenuIcon className="size-5" />}
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
            {/* Desde sm el enlace de arriba ya se ve; aquí solo aparece cuando
                está oculto, para no repetirlo. */}
            <a
              href={LOGIN_URL}
              className="flex min-h-11 items-center text-base font-medium text-muted-foreground sm:hidden"
            >
              Iniciar sesión
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
