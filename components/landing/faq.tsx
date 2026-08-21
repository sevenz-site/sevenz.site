const FAQS = [
  {
    q: "¿Qué es el fiado y por qué necesito controlarlo?",
    a: "El fiado es la venta a crédito que muchos negocios en Venezuela hacen de palabra, apuntada en una libreta. El problema no es fiar — es que solo tú ves el número, y con el tiempo se te pierde la cuenta o el cliente la disputa. Sevenz pone ese número frente a los dos, siempre igual.",
  },
  {
    q: "¿Cómo funciono con Sevenz sin re-escribir toda mi libreta?",
    a: "Tomas una foto de tu libreta actual tal como está hoy y Sevenz arma tu cartera digital con esos datos. Desde ahí, cada movimiento nuevo (fiado o abono) lo registras en la app y el saldo se actualiza al instante para ti y tu cliente.",
  },
  {
    q: "¿Es seguro compartir el saldo del fiado por WhatsApp?",
    a: "Tu cliente ve su saldo a través de un link que le compartes por WhatsApp — no necesita instalar nada ni crear una cuenta. El link solo muestra su propio saldo, no el de otros clientes ni el resto de tu cartera.",
  },
  {
    q: "¿Cuánto cuesta usar Sevenz?",
    a: "Sevenz tiene un plan gratis: hasta 5 fotos de libreta al mes, sin costo y sin tarjeta de crédito. Es el punto de partida para probar la app con tu negocio real.",
  },
  {
    q: "¿Qué pasa si un cliente dice que no debe tanto?",
    a: "Como el cliente ve el mismo número que tú — con fecha, monto y detalle de cada movimiento — la disputa se resuelve mirando la app, no discutiendo de memoria.",
  },
];

export function Faq() {
  return (
    <section className="flex flex-col items-center border-b px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
        Preguntas frecuentes
      </p>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
        Todo lo que preguntan antes de fiar con Sevenz
      </h2>

      <div className="mt-10 flex w-full max-w-2xl flex-col border-t">
        {FAQS.map((item) => (
          <div key={item.q} className="border-b py-6 text-left">
            <h3 className="text-lg font-semibold">{item.q}</h3>
            <p className="mt-2 text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
              },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </section>
  );
}
