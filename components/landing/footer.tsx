import Image from "next/image";
import Link from "next/link";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t px-6 py-8">
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
