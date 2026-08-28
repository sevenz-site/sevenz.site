import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/lib/config";

const INCLUDED = [
  "Toma una foto de tu libreta y arma tu cartera de fiado",
  "Comparte el saldo por WhatsApp con tus clientes",
  "Tú y tu cliente ven el mismo número, siempre",
  "Hasta 5 fotos de libreta al mes, sin costo",
];

const COMING_SOON = ["Notificaciones automatizadas de cobros", "Reportes automatizados del fiado"];

export function Pricing() {
  return (
    <section className="flex flex-col items-center border-b px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">Precio</p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        Sevenz cuesta $0 USD
      </h2>
      <p className="mt-4 max-w-sm text-muted-foreground">
        Sin tarjeta de crédito, sin letra pequeña. Así de simple.
      </p>

      <div className="mt-10 w-full max-w-sm rounded-xl border p-8 text-left">
        <div className="flex flex-col items-center border-b pb-6 text-center">
          <span className="font-mono text-5xl font-semibold sm:text-6xl">$0</span>
          <span className="mt-1 font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
            USD / mes
          </span>
          <p className="mt-3 text-sm text-muted-foreground">
            Plan Free — hasta 5 fotos de libreta al mes.
          </p>
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {INCLUDED.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-foreground" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t pt-6">
          <Badge variant="outline">Próximamente</Badge>
          <ul className="mt-3 flex flex-col gap-3">
            {COMING_SOON.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button asChild size="lg" className="mt-8 w-full">
          <a href={SIGNUP_URL}>Probar gratis →</a>
        </Button>
      </div>
    </section>
  );
}
