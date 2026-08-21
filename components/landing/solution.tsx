import type { ReactNode } from "react";
import { ProductShot } from "@/components/landing/product-shot";

function Step({
  num,
  title,
  desc,
  shot,
}: {
  num: string;
  title: string;
  desc: string;
  shot: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-4">
      <span className="font-mono text-4xl font-semibold text-muted-foreground/40">{num}</span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-52 text-sm text-muted-foreground">{desc}</p>
      <div className="mt-2 w-full">{shot}</div>
    </div>
  );
}

export function Solution() {
  return (
    <section className="flex flex-col items-center border-b px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">Sevenz</p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        Dos pasos y tu cartera de fiado queda al día
      </h2>

      <div className="mt-14 flex w-full max-w-4xl flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-6">
        <Step
          num="1"
          title="Toma una foto"
          desc="De tu libreta actual, tal como está hoy. Nada que re-escribir."
          shot={
            <ProductShot
              src="/screens/importar-cartera.png"
              alt="Revisión de movimientos importados en Sevenz"
              width={1165}
              height={763}
            />
          }
        />
        <span className="hidden pt-16 font-mono text-2xl text-muted-foreground/40 sm:block">→</span>
        <span className="font-mono text-2xl text-muted-foreground/40 sm:hidden">↓</span>
        <Step
          num="2"
          title="Comparte el link"
          desc="Tu cliente ve su saldo por WhatsApp. En tiempo real, siempre."
          shot={
            <ProductShot
              src="/screens/saldo-cliente.png"
              alt="Saldo del cliente visto desde su celular"
              width={1176}
              height={622}
            />
          }
        />
      </div>
    </section>
  );
}
