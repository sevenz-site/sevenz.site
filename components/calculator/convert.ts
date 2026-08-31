// Standalone conversion math for the public BCV calculator. Deliberately not
// imported from the dashboard app (separate repo, separate deploy) — this is
// a small enough copy of dashboard/lib/exchange-rate/convert.ts's
// convertToAllCurrencies() that duplicating it beats a cross-repo dependency.

export type Currency = "VES" | "USD" | "EUR";

// Bs per 1 unit of each foreign currency.
export type Rate = { usd: number; eur: number };

export const CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
  { value: "USD", label: "Dólar (tasa BCV)" },
  { value: "EUR", label: "Euro (tasa BCV)" },
  { value: "VES", label: "Bolívares" },
];

export function convert(amount: number, from: Currency, rate: Rate) {
  const ves = from === "VES" ? amount : amount * (from === "USD" ? rate.usd : rate.eur);
  return {
    ves,
    usd: rate.usd ? ves / rate.usd : 0,
    eur: rate.eur ? ves / rate.eur : 0,
  };
}
