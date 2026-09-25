// Ported verbatim from dashboard/lib/exchange-rate/format.ts — same "es-VE"
// formatting rules and the same literal "Bs. " prefix (not ICU's "VES"
// currency code, which renders inconsistently across environments).

const bsNumberFormatter = new Intl.NumberFormat("es-VE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatBs(amount: number): string {
  return `Bs. ${bsNumberFormatter.format(amount)}`;
}

// Same formatting as formatBs, without the "Bs. " prefix — for an amount
// input that shows the number on its own.
export function formatBsAmount(amount: number): string {
  return bsNumberFormatter.format(amount);
}

// El USDT NO entra aquí. Intl no conoce "USDT" —no es una moneda ISO— y
// pedírselo lanza. Se formatea aparte, abajo.
const displayCurrencyFormatters: Record<"USD" | "EUR", Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
  EUR: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }),
};

// Mismo formato de dos decimales que los otros dos, pero con el código
// detrás en vez de un símbolo delante: el USDT no tiene símbolo propio y
// usar "$" lo haría indistinguible del dólar, que es justo la confusión que
// esta pestaña existe para evitar.
const usdtFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatDisplayCurrency(amount: number, currency: "USD" | "EUR" | "USDT"): string {
  if (currency === "USDT") return `${usdtFormatter.format(amount)} USDT`;
  return displayCurrencyFormatters[currency].format(amount);
}

// "$1 = Bs. 779,95" — the rate always shown as a full equivalence.
export function formatRateEquivalence(currency: "USD" | "EUR" | "USDT", rate: number): string {
  if (currency === "USDT") return `1 USDT = ${formatBs(rate)}`;
  return `${currency === "USD" ? "$" : "€"}1 = ${formatBs(rate)}`;
}
