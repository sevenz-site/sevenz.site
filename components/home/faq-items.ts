import { FAQS } from "@/components/landing/faq";

// The fifteen questions of the web v3 frame, IN THE FRAME'S ORDER.
//
// THE FRAME ONLY CARRIES ONE ANSWER — the first, open item. The other fourteen
// questions are drawn closed, so their answers come from two places:
//
//   - ten already published on the live site, IMPORTED from
//     `components/landing/faq.tsx` rather than copied: each carries its own
//     verification comment there, and a copy that exists twice drifts;
//   - five written for the unpublished proposals of `CT-154`
//     (`components/proposals/faq.tsx`, never committed), carried over here
//     with the check each one was written against. The first answer of the
//     frame is word for word the live one, which is how the source was chosen.
//
// A question that stops matching the live array fails the build here instead
// of shipping an empty answer.
export type FaqItem = { q: string; a: string; href?: string; hrefLabel?: string };

const NEW: Record<string, FaqItem> = {
  // Checked (2026-10-30): registrarVenta writes the sale, its lines and the
  // payments; what is left unpaid becomes a charge. A sale with no client goes
  // to "Mostrador".
  sells: {
    q: "¿Puedo vender con Sevenz o es solo para fiar?",
    a: "Las dos cosas. Registras la venta en un solo lugar: eliges los productos, cobras lo que te pagan y lo que falte queda como fiado de ese cliente. Si le vendes de contado a alguien que no tiene cuenta, la venta va al mostrador y no le inventas un cliente.",
  },
  // Checked (2026-10-30): /c/[token] and catalog_orders; the order lands in
  // Pedidos and is also shared by WhatsApp (cart-screen.tsx).
  catalog: {
    q: "¿Mis clientes me pueden hacer pedidos?",
    a: "Sí. Tienes un catálogo con un enlace que compartes por WhatsApp. Tu cliente arma su pedido desde su teléfono, te llega a Pedidos dentro de la app y también te lo manda por WhatsApp. Tú lo registras como venta desde ahí.",
  },
  // Checked (2026-10-30): the 'no_consent' cut (MS-41). The answer promises ONLY
  // that no consent means no message, which is what the code enforces. It does
  // not describe how to opt out, because that screen (MS-35) was not confirmed.
  notices: {
    q: "¿Mi cliente recibe avisos por WhatsApp?",
    a: "Solo si él acepta. Con su permiso, le puede llegar el recibo de cada abono y un recordatorio antes de su fecha de pago. Sin su permiso no sale ningún mensaje, y a ti te llega cada semana el resumen de tu cartera.",
  },
  // Checked (2026-10-30): facts.ts sends counts and percentages and NO string
  // from the database; validate.ts rejects a text with a figure that is not in
  // the facts. The free-tier caveat lives in the Privacy Policy.
  assistant: {
    q: "¿Qué hace el asistente con IA? ¿Ve los datos de mis clientes?",
    a: "Cada día te escribe un resumen corto de cómo va tu negocio, con hasta tres recomendaciones: a quién cobrarle primero, qué producto reponer. No hace las cuentas: redacta con las cifras que ya calculó tu app, y cada número que escribe se comprueba contra ellas antes de mostrártelo. Y no ve nombres: ni de tus clientes, ni de tus productos, ni de tu negocio. Es un resumen para orientarte; las cifras de verdad están en Reportes.",
    href: "/politica-de-privacidad",
    hrefLabel: "Leer qué proveedor de IA usamos",
  },
  // Checked (2026-10-30): a Colombian owner resolves to a null ledger currency
  // (the COP ledger) and the app has Colombian owners in production.
  colombia: {
    q: "¿Funciona si mi negocio es colombiano?",
    a: "Sí. Un negocio colombiano lleva sus cuentas en pesos, sin bolívares ni tasas, con las mismas ventas, fiados, abonos y catálogo.",
  },
};

function live(q: string): FaqItem {
  const item = FAQS.find((f) => f.q === q);
  if (!item) throw new Error(`FAQ v3: the live answer for «${q}» no longer exists in components/landing/faq.tsx`);
  return item;
}

export const HOME_FAQ: FaqItem[] = [
  live("¿Qué es el fiado y por qué necesito controlarlo?"),
  live("¿Cómo empiezo con Sevenz sin reescribir toda mi libreta?"),
  NEW.sells,
  NEW.catalog,
  live("¿Es seguro compartir el saldo del fiado por WhatsApp?"),
  NEW.notices,
  live("¿Cuánto cuesta usar Sevenz?"),
  live("¿Qué pasa si un cliente dice que no debe tanto?"),
  NEW.assistant,
  live("¿Sevenz me va a poner lento el teléfono?"),
  live("¿Sevenz está en la Play Store? ¿La puedo descargar?"),
  live("¿Quién puede ver los datos de mis clientes?"),
  live("¿Qué tan seguro es usar Sevenz?"),
  live("¿Qué pasa con lo que me deben si me doy de baja?"),
  NEW.colombia,
];
