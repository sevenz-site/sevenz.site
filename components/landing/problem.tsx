const PROBLEMS = [
  {
    num: "01",
    text: (
      <>
        La libreta se moja, se pierde o <b className="font-semibold">solo tú la entiendes.</b>
      </>
    ),
  },
  {
    num: "02",
    text: (
      <>
        Tu cliente <b className="font-semibold">nunca ve su propio saldo</b> — solo tu palabra.
      </>
    ),
  },
  {
    num: "03",
    text: (
      <>
        Cobrar significa <b className="font-semibold">discutir un número</b>, no recordarlo.
      </>
    ),
  },
];

export function Problem() {
  return (
    <section className="flex flex-col items-center border-b px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">Hoy</p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        Así administras el fiado
      </h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        Fiar es parte del negocio. Perder la cuenta, no debería serlo.
      </p>

      <div className="mt-10 flex w-full max-w-xl flex-col border-t">
        {PROBLEMS.map((p) => (
          <div key={p.num} className="flex items-baseline gap-4 border-b py-5 text-left">
            <span className="w-6 shrink-0 font-mono text-sm text-muted-foreground/60">{p.num}</span>
            <span className="text-lg font-medium sm:text-xl">{p.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
