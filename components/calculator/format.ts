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

export function formatDisplayCurrency(amount: number, currency: "USD" | "EUR"): string {
  return displayCurrencyFormatters[currency].format(amount);
}

// "$1 = Bs. 779,95" — the rate always shown as a full equivalence.
export function formatRateEquivalence(currency: "USD" | "EUR", rate: number): string {
  return `${currency === "USD" ? "$" : "€"}1 = ${formatBs(rate)}`;
}
