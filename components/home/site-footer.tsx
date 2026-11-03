import Image from "next/image";
import Link from "next/link";
import { FACEBOOK_URL, INSTAGRAM_URL, LOGIN_URL, SIGNUP_URL } from "@/lib/config";

// The footer of the web v3 frame (node 1902:16444): six 14px links centred and
// wrapping, then «© 2026 Sevenz» behind the 16px favicon, then Instagram and
// Facebook at 24px.
//
// The frame's 80 of bottom padding is enough for the floating WhatsApp button
// of the layout, unlike in the previous footer (which needed 112): measured at
// 375px with the page scrolled to the end on 2026-11-03, every link and both
// icons are the topmost element at their centre — the icons are centred and
// the button stays to their right.
const LINKS = [
  { href: "/terminos-y-condiciones", label: "Términos" },
  { href: "/politica-de-privacidad", label: "Privacidad" },
  { href: "/calculadora-dolar-bcv", label: "Calculadora BCV" },
  { href: "/ayuda", label: "Ayuda" },
];

const linkClass = "px-3 py-1.5 text-sm leading-5 text-[#272727] transition-opacity hover:opacity-60";

export function SiteFooter() {
  return (
    <footer className="bg-white px-4 pt-12 pb-20">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col items-center gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
          <a href={LOGIN_URL} className={linkClass}>
            Ingresar
          </a>
          <a href={SIGNUP_URL} className={linkClass}>
            Regístrate
          </a>
        </nav>

        <div className="flex items-start gap-2">
          <Image src="/web-v3/fav-icon.svg" alt="" width={16} height={16} />
          <span className="text-xs leading-4 font-semibold text-[#737373]">© {new Date().getFullYear()} Sevenz</span>
        </div>

        <div className="flex items-start gap-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sevenz en Instagram"
            className="transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Image src="/web-v3/icon-instagram.svg" alt="" width={24} height={24} />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sevenz en Facebook"
            className="transition-transform duration-200 hover:-translate-y-0.5"
          >
            <Image src="/web-v3/icon-facebook.svg" alt="" width={24} height={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
