"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

  // Cerrar al navegar. SheetClose se encarga de los enlaces del panel, pero no
  // de atrás y adelante del navegador; esto sí. Ajustado durante el render y
  // no en un efecto, para que React lo resuelva antes de pintar.
  if (rutaVista !== pathname) {
    setRutaVista(pathname);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      {/* En móvil: rejilla de tres columnas — botón, logo, hueco — para que el
          logo quede centrado respecto a la pantalla y no desplazado por el
          ancho del botón. Desde md pasa a flex y las columnas dejan de
          aplicar, porque lo que sobra está oculto y no ocupa celda. */}
      <div className="mx-auto grid h-16 w-full max-w-5xl grid-cols-[2.5rem_1fr_2.5rem] items-center px-6 md:flex md:justify-between md:gap-4">
        {/* El Sheet trae de fábrica lo que antes estaba escrito a mano: foco
            atrapado dentro del panel, cierre con Escape, bloqueo del scroll de
            fondo, overlay y aria-modal. Es la misma pieza que usa el menú
            móvil del dashboard, y por eso entra por la izquierda igual que
            allá. */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="-ml-2 justify-self-start md:hidden"
              aria-label="Abrir menú"
            >
              <MenuIcon className="size-5" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className="w-4/5 max-w-xs gap-0 p-0">
            <SheetHeader className="border-b p-6">
              <SheetTitle className="text-left">
                <Image src="/logo.svg" alt="Sevenz" width={100} height={31} />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navegación principal de Sevenz
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col p-6">
              {NAV.map((item) => (
                <SheetClose asChild key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center border-b text-base font-medium",
                      pathname === item.href ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}

              {/* Los dos a ancho completo: relleno el principal, delineado el
                  secundario. Se distinguen por el peso, no por el tamaño. */}
              <div className="mt-6 flex flex-col gap-2">
                <Button asChild className="w-full">
                  <a href={SIGNUP_URL}>Probar gratis</a>
                </Button>
                <Button asChild variant="outline" className="w-full">
                  <a href={LOGIN_URL}>Iniciar sesión</a>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>

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
    </header>
  );
}
