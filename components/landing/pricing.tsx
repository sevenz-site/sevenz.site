import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SIGNUP_URL } from "@/lib/config";

const INCLUDED = [
  "Toma una foto de tu libreta y arma tu cartera de fiado, sin re-escribir nada.",
  "Comparte el saldo por WhatsApp — tu cliente lo ve sin que tengas que decírselo.",
  "Tú y tu cliente ven el mismo número, siempre.",
  "Balance de fiado vs. abonos, en dólares y en euros.",
  "Puntaje de puntualidad: sabe quién paga a tiempo y quién no.",
  "Lista de morosos y malas pagas, sin tener que recordarlo tú.",
  "Calculadora de tasa de cambio: dólar y euro, siempre actualizada.",
  "Hasta 5 fotos de libreta al mes, sin costo.",
];

const COMING_SOON = ["Recordatorios de cobro que se mandan solos.", "Reportes del fiado, listos sin mover un dedo."];

export function Pricing() {
  return (
    <section className="flex flex-col items-center border-b px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">Precio</p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        Sevenz cuesta $0 USD. En serio.
      </h2>
      <p className="mt-4 max-w-sm text-muted-foreground">
        Vale 30 USD al mes. Mientras arrancamos, no cuesta nada — sin tarjeta, sin tanta vaina,
        sin letra pequeña.
      </p>

      <div className="mt-10 w-full max-w-md rounded-xl border p-8 text-left">
        <div className="flex flex-col items-center border-b pb-6 text-center">
          {/* Two numbers, and only one of them is what you pay. A struck-through
              price reads as decoration to a screen reader unless the roles are
              said out loud, so each carries its own sr-only label instead of
              relying on the line through it to carry the meaning. */}
          <span className="flex items-baseline gap-3">
            <s className="font-mono text-2xl font-medium text-muted-foreground sm:text-3xl">
              <span className="sr-only">Precio normal: </span>$30
            </s>
            <span className="font-mono text-5xl font-semibold sm:text-6xl">
              <span className="sr-only">Precio hoy: </span>$0
            </span>
          </span>
          <span className="mt-1 font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
            USD / mes
          </span>
          <Badge variant="outline" className="mt-4">
            Precio de lanzamiento
          </Badge>
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
