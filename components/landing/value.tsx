import { ProductShot } from "@/components/landing/product-shot";

export function Value() {
  return (
    <section className="flex flex-col items-center border-b px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
        El cambio real
      </p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        El mismo número.
        <br />
        Las dos partes. Siempre.
      </h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        Se acabó el &ldquo;yo no debía tanto&rdquo; — el número lo dice la app, no tú.
      </p>

      <div className="mt-10 flex w-full max-w-xl border-t">
        <div className="flex flex-1 flex-col items-center gap-2 border-r py-8 pr-4">
          <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
            Tú ves
          </span>
          <span className="font-mono text-3xl font-semibold sm:text-4xl">$102.500</span>
          <p className="text-xs text-muted-foreground">
            Toda tu cartera, ordenada por quién debe hace más tiempo.
          </p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-2 py-8 pl-4">
          <span className="font-mono text-xs tracking-[0.1em] text-muted-foreground uppercase">
            Tu cliente ve
          </span>
          <span className="font-mono text-3xl font-semibold sm:text-4xl">$102.500</span>
          <p className="text-xs text-muted-foreground">
            Su propio saldo. Sin preguntarte. Sin discutirlo.
          </p>
        </div>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        <ProductShot
          src="/screens/puntaje-de-credito-de-clientes-por-fiado-en-sevenz.png"
          alt="Puntaje de crédito de clientes por fiado en Sevenz"
          width={1344}
          height={756}
        />
      </div>
    </section>
  );
}
