import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/config";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="Sevenz" width={110} height={34} priority />
        </Link>
        <nav className="flex items-center gap-4">
          <a href={LOGIN_URL} className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Ingresar
          </a>
          <Button asChild size="sm">
            <a href={SIGNUP_URL}>Probar gratis</a>
          </Button>
        </nav>
      </div>
    </header>
  );
}
