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

// Un solo arreglo para las dos navegaciones —la de escritorio y la del panel
// del teléfono—, así que cambiar una etiqueta aquí las cambia en las dos.
const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/calculadora-dolar-bcv", label: "Calculadora BCV" },
  // "Ayuda" y no "Soporte" desde el 2026-09-25. LA RUTA NO CAMBIA, a
  // propósito: `/soporte` y sus diez temas llevan meses indexados, están en
  // el sitemap y hay un enlace a uno de ellos dentro del FAQ. Renombrar la
  // URL por una etiqueta costaría ese posicionamiento y no compra nada — el
  // visitante lee la palabra, no la barra de direcciones.
  { href: "/soporte", label: "Ayuda" },
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
      {/* Logo a la izquierda y todo lo demás a la derecha, en las dos anchuras.
          Antes el logo iba centrado en móvil con una rejilla de tres columnas;
          el mockup v2 lo saca del centro, así que la rejilla y su celda de
          contrapeso sobran y una sola fila flex sirve para los dos tamaños. */}
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center gap-4 px-6">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Sevenz, ir al inicio">
          <Image src="/logo.svg" alt="Sevenz" width={110} height={34} priority />
        </Link>

        {/* Los enlaces solo aparecen en escritorio. El mockup es de móvil y ahí
            no enseña ninguno —van todos dentro del panel—, pero esconder la
            navegación de una web detrás de una hamburguesa en una pantalla de
            1280px es esconderla sin motivo: hay sitio de sobra. */}
        <nav className="ml-6 hidden items-center gap-6 md:flex">
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

        <div className="ml-auto flex items-center gap-2">
          {/* "Ingresar", no "Iniciar sesión": es como lo llama el mockup y como
              ya lo llamaba el pie. Dos nombres para la misma puerta obligan a
              decidir si son la misma. */}
          <Button asChild variant="outline" size="sm">
            <a href={LOGIN_URL}>Ingresar</a>
          </Button>

          {/* En móvil la barra no lleva "Probar gratis": el botón grande del
              hero está a un dedo de distancia y repetirlo aquí le quitaría
              sitio a "Ingresar", que es la única acción que un dueño que ya
              tiene cuenta viene a buscar. En escritorio sí cabe. */}
          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href={SIGNUP_URL}>Probar gratis</a>
          </Button>

          {/* El Sheet trae de fábrica lo que antes estaba escrito a mano: foco
              atrapado dentro del panel, cierre con Escape, bloqueo del scroll
              de fondo, overlay y aria-modal. Entra por la derecha porque ahí
              está ahora su botón; que el panel salga del lado contrario al
              dedo que lo abrió se lee como otra cosa distinta. */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="-mr-2 md:hidden"
                aria-label="Abrir menú"
              >
                <MenuIcon className="size-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-4/5 max-w-xs gap-0 p-0">
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
                    <a href={LOGIN_URL}>Ingresar</a>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
