"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/config";

// The header of the web v3 frame (node 1856:14835): 60 tall, white, a 1px
// #E5E5E5 rule below; logo 78×28 and four 14px links on the left, «Ingresar»
// (outlined, 17px) and «Regístrate» (filled) on the right.
//
// Sticky, which the frame cannot show and the previous header already was: the
// page is 8,800px long and «Regístrate» is the action it exists for.
//
// BELOW `md` THE FRAME HAS NOTHING TO SAY. Logo, «Ingresar» and the four links
// plus «Regístrate» do not fit in 343px, so the links move into the same side
// sheet the previous header used, and «Ingresar» stays outside it: it is the
// one thing an owner with an account comes to the website for.
const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/calculadora-dolar-bcv", label: "Calculadora BCV" },
  { href: "/#precio", label: "Precio" },
  { href: "/ayuda", label: "Ayuda" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  // The in-page anchor picked in the sheet, scrolled to once the sheet is gone.
  const pendingAnchor = useRef<string | null>(null);

  return (
    <header className="home-header-in sticky top-0 z-40 h-[60px] border-b border-[#e5e5e5] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-full w-full max-w-[1024px] items-center justify-between px-4 lg:px-0">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Sevenz, ir al inicio" className="shrink-0">
            <Image src="/web-v3/logo-primary.svg" alt="Sevenz" width={78} height={28} priority />
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-3 py-1.5 text-sm leading-5 text-[#272727] after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-[#272727] after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={LOGIN_URL}
            className="rounded-lg border border-[#c3c3c3] px-2.5 py-2 text-[17px] leading-[22px] text-black transition-colors hover:border-[#272727]"
          >
            Ingresar
          </a>
          <a
            href={SIGNUP_URL}
            className="hidden h-10 items-center rounded-lg bg-[#272727] p-2.5 text-base leading-6 font-semibold text-[#dadada] transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-[#1c1c1c] active:scale-[0.98] md:inline-flex"
          >
            Regístrate
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menú"
                className="-mr-2 inline-flex size-10 items-center justify-center rounded-lg text-[#272727] md:hidden"
              >
                <MenuIcon className="size-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-4/5 max-w-xs gap-0 p-0"
              onCloseAutoFocus={(event) => {
                // Radix fires this once the close animation is over. The jump
                // is INSTANT on purpose: a smooth scroll started here was
                // silently dropped in Chrome at 390px on 2026-11-03 (hash set,
                // page did not move), while an instant one landed «Precio»
                // exactly under the header. Deferred one tick so the scroll
                // lock is gone; focus stays put instead of jumping back to the
                // menu button at the top.
                const id = pendingAnchor.current;
                if (!id) return;
                pendingAnchor.current = null;
                event.preventDefault();
                history.replaceState(null, "", `#${id}`);
                window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
              }}
            >
              <SheetHeader className="border-b p-6">
                <SheetTitle className="text-left">
                  <Image src="/web-v3/logo-primary.svg" alt="Sevenz" width={78} height={28} />
                </SheetTitle>
                <SheetDescription className="sr-only">Navegación principal de Sevenz</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col p-6">
                {NAV.map((item) =>
                  item.href.startsWith("/#") ? (
                    // An in-page anchor is scrolled to AFTER the sheet closes
                    // (see `onCloseAutoFocus` above). Followed while the sheet
                    // still locked the page's scroll, it landed 262px past
                    // «Precio» at 375px (measured 2026-11-03), with the top of
                    // the card off screen; a fixed timeout raced the animation.
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        pendingAnchor.current = item.href.slice(2);
                        setOpen(false);
                      }}
                      className="flex min-h-11 items-center border-b text-base text-[#272727]"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <SheetClose asChild key={item.href}>
                      <Link href={item.href} className="flex min-h-11 items-center border-b text-base text-[#272727]">
                        {item.label}
                      </Link>
                    </SheetClose>
                  ),
                )}
                <a
                  href={SIGNUP_URL}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-[#272727] text-base font-semibold text-[#dadada]"
                >
                  Regístrate
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
