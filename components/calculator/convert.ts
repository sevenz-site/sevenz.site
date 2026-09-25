// Standalone conversion math for the public BCV calculator. Deliberately not
// imported from the dashboard app (separate repo, separate deploy) — this is
// a small enough copy of dashboard/lib/exchange-rate/convert.ts's
// convertToAllCurrencies() that duplicating it beats a cross-repo dependency.

export type Currency = "VES" | "USD" | "EUR" | "USDT";

// Bs per 1 unit of each foreign currency.
//
// `usdt` es opcional y las otras dos no, y la diferencia es de fondo: el
// dólar y el euro salen de una tasa OFICIAL publicada por el BCV, y el USDT
// de un mercado P2P que puede no contestar. Sin dólar no hay calculadora;
// sin USDT simplemente no aparece esa pestaña. Tipar los tres igual borraría
// esa diferencia y obligaría a inventarse un cero.
export type Rate = { usd: number; eur: number; usdt?: number };

export const CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: "USD", label: "Dólar (tasa BCV)" },
  { value: "EUR", label: "Euro (tasa BCV)" },
  // "mercado P2P" y no "tasa BCV", porque no lo es. El BCV no publica una
  // tasa de USDT; esto es lo que se paga entre personas en Binance. Llamarlo
  // igual que a los otros dos sería decir que tiene el mismo respaldo.
  { value: "USDT", label: "USDT (mercado P2P)" },
  { value: "VES", label: "Bolívares" },
];

// Bs por una unidad de la moneda pedida. Devuelve 0 para el USDT cuando no
// hay precio de mercado, que es el caso que hace que ni siquiera se dibuje su
// pestaña — aquí solo se evita dividir por undefined.
function bsPorUnidad(currency: Exclude<Currency, "VES">, rate: Rate): number {
  if (currency === "USD") return rate.usd;
  if (currency === "EUR") return rate.eur;
  return rate.usdt ?? 0;
}

export function convert(amount: number, from: Currency, rate: Rate) {
  const ves = from === "VES" ? amount : amount * bsPorUnidad(from, rate);
  return {
    ves,
    usd: rate.usd ? ves / rate.usd : 0,
    eur: rate.eur ? ves / rate.eur : 0,
    usdt: rate.usdt ? ves / rate.usdt : 0,
  };
}
