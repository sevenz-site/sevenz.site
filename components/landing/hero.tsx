import { Button } from "@/components/ui/button";
import { ProductShot } from "@/components/landing/product-shot";
import { SIGNUP_URL } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center gap-10 overflow-hidden border-b px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 43px, var(--border) 43px, var(--border) 44px)",
        }}
      />

      <div className="relative flex max-w-2xl flex-col items-center gap-8">
        <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
          Crédito a clientes de pymes
        </p>

        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
          <span className="text-lg text-muted-foreground line-through decoration-1">
            debe 102.5...
          </span>
          <span className="font-mono text-lg text-muted-foreground sm:rotate-0">→</span>
          <span className="border-b-2 border-foreground pb-0.5 font-mono text-lg font-semibold">
            $102.500
          </span>
        </div>

        <h1 className="text-4xl leading-[1.06] font-bold tracking-tight text-balance sm:text-6xl">
          ¿Sabes cuánto te deben, ahora mismo?
        </h1>
        <p className="max-w-lg text-lg text-muted-foreground">
          Tu libreta lo sabe. Tu cliente no. Sevenz pone el mismo número frente a los dos.
        </p>

        <Button asChild size="lg">
          <a href={SIGNUP_URL}>Probar gratis →</a>
        </Button>
      </div>

      <div className="relative w-full max-w-4xl">
        <ProductShot src="/screens/dashboard.png" alt="Cartera del negocio en Sevenz" width={1183} height={561} />
      </div>

      <div className="relative flex flex-col items-center gap-1.5 pt-2">
        <span className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground">SEGUIR</span>
        <span className="h-6 w-px animate-pulse bg-muted-foreground" />
      </div>
    </section>
  );
}
