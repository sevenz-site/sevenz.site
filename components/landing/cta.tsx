import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/lib/config";

export function Cta() {
  return (
    <section className="flex flex-col items-center px-6 py-28 text-center">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
        Empieza hoy
      </p>
      <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
        ¿Quieres tener las cuentas claras con tus clientes?
      </h2>
      <p className="mt-4 max-w-sm text-muted-foreground">
        Gratis para empezar, sin tarjeta de crédito.
      </p>
      <Button asChild size="lg" className="mt-9">
        <a href={SIGNUP_URL}>Regístrate en Sevenz →</a>
      </Button>
      <p className="mt-4 font-mono text-xs text-muted-foreground/70">
        ¡Controla el fiado de tu negocio sin vaina!
      </p>
    </section>
  );
}
