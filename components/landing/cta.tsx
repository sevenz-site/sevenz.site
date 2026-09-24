import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/lib/config";

export function Cta() {
  return (
    <section className="px-6 pt-20 pb-16 md:pt-28">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
        {/* El logotipo cierra la página igual que la abre. `alt` vacío porque
            no aporta nada nuevo: el nombre ya está en el titular que sigue y
            en el pie, y repetirlo tres veces seguidas a quien escucha la
            página es ruido. */}
        <Image src="/logo.svg" alt="" width={120} height={37} />

        <h2 className="text-display md:text-display-lg lg:text-display-xl max-w-2xl text-balance">
          ¿Quieres tener las cuentas claras con tus clientes?
        </h2>

        {/* El eslogan va DEBAJO del titular, no encima como en la v1. Encima
            hacía de rótulo de sección; aquí es lo último que se lee antes de
            tocar el botón, que es donde una frase de marca hace algo. */}
        <p className="font-mono text-eyebrow text-subtle text-balance">
          ¡Controla el fiado de tu negocio sin vaina!
        </p>

        <Button asChild size="lg" className="h-13 w-full rounded-lg text-base sm:w-auto sm:min-w-64">
          <a href={SIGNUP_URL}>Probar gratis</a>
        </Button>
      </div>
    </section>
  );
}
