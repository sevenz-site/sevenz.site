"use client";

import { type ChangeEvent, useState } from "react";
import { CURRENCY_OPTIONS, convert, type Currency } from "@/components/calculator/convert";
import { CurrencyFlagIcon } from "@/components/calculator/currency-flag-icon";
import { formatBs, formatBsAmount, formatDisplayCurrency, formatRateEquivalence } from "@/components/calculator/format";
import { useBcvRate } from "@/components/calculator/use-bcv-rate";

const MONTH_ABBR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// "2026-09-04" -> "4 sep 2026". Split on the string rather than parsed into a
// Date: the API's date is already Venezuela's, and re-reading it in the
// visitor's timezone is precisely what would slide it a day. Same reason
// rate-history-table.tsx parses its dates with an explicit local time.
function formatRateDate(ymd: string): string {
  const [year, month, day] = ymd.split("-").map(Number);
  return `${day} ${MONTH_ABBR[month - 1]} ${year}`;
}

// Today's date in Venezuela, "YYYY-MM-DD". en-CA is the locale trick that
// yields ISO order; the timeZone is what matters — a visitor in Madrid or a
// Cloudflare edge in UTC must not compute a different "today" than the shop
// they are pricing for.
function todayInCaracas(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Caracas",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function minutesAgo(date: Date): number {
  return Math.max(0, Math.round((Date.now() - date.getTime()) / 60_000));
}

function RateBanner({
  rate,
  loading,
  error,
}: {
  rate: { usd: number; eur: number; rateDate: string | null; fetchedAt: Date } | null;
  loading: boolean;
  error: boolean;
}) {
  if (error) {
    return (
      <p className="text-sm text-muted-foreground">
        No pudimos cargar la tasa en este momento — intenta de nuevo en unos minutos.
      </p>
    );
  }

  if (loading || !rate) {
    return (
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6" aria-hidden>
        <span className="h-7 w-32 animate-pulse rounded bg-muted" />
        <span className="h-7 w-32 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  // The rate's own publication date, not when we asked for it. The BCV does
  // not publish on weekends or holidays, so "actualizado hace 2 min" was true
  // of our request and misleading about the number: on a Sunday it described
  // Friday's rate. Falls back to the old wording only for the currency-api
  // source, which publishes no date.
  const stamp =
    rate.rateDate !== null
      ? `Tasa BCV del ${formatRateDate(rate.rateDate)}`
      : (() => {
          const mins = minutesAgo(rate.fetchedAt);
          return mins === 0 ? "Actualizado justo ahora" : `Actualizado hace ${mins} min`;
        })();

  // This page always asks the provider live, so its rate is by definition the
  // newest published one. A date that is not today therefore has exactly one
  // cause — the BCV did not publish — and saying so is safe here. The
  // dashboard, which reads a stored copy, has a second possible cause and
  // needs to tell them apart before it can claim either.
  const noPublicationToday = rate.rateDate !== null && rate.rateDate < todayInCaracas();

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-2 font-mono text-lg font-semibold sm:flex-row sm:gap-6">
        <span className="flex items-center gap-2 [word-spacing:-0.3em]">
          <CurrencyFlagIcon currency="USD" />
          {formatRateEquivalence("USD", rate.usd)}
        </span>
        <span className="flex items-center gap-2 [word-spacing:-0.3em]">
          <CurrencyFlagIcon currency="EUR" />
          {formatRateEquivalence("EUR", rate.eur)}
        </span>
      </div>
      <p className="font-mono text-xs text-muted-foreground">{stamp}</p>
      {noPublicationToday ? (
        <p className="max-w-xs text-center text-xs text-muted-foreground">
          El BCV no publica sábados, domingos ni festivos. Esta es la última tasa publicada.
        </p>
      ) : null}
    </div>
  );
}

export function Calculator() {
  const { rate, loading, error } = useBcvRate();
  const [rawDigits, setRawDigits] = useState("100");
  const [fromCurrency, setFromCurrency] = useState<Currency>("USD");

  const cents = Number(rawDigits || "0");
  const amount = cents / 100;
  const hasRate = Boolean(rate) && !error;
  const result = hasRate && rate ? convert(amount, fromCurrency, rate) : null;

  function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
    setRawDigits(e.target.value.replace(/\D/g, "").slice(0, 15));
  }

  return (
    <div className="flex w-full flex-col items-center">
      <RateBanner rate={rate} loading={loading} error={error} />

      <div className="mt-8 w-full max-w-sm rounded-xl border p-6">
        <div className="flex gap-2">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value as Currency)}
            disabled={!hasRate}
            className="rounded-lg border bg-background px-2 text-sm disabled:opacity-50"
            aria-label="Convertir desde"
          >
            {CURRENCY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            inputMode="numeric"
            placeholder="Monto"
            value={formatBsAmount(amount)}
            onChange={handleAmountChange}
            disabled={!hasRate}
            className="w-full rounded-lg border bg-background px-3 py-1.5 text-right font-mono text-sm tabular-nums disabled:opacity-50"
            aria-label="Monto a convertir"
          />
        </div>

        {result ? (
          <dl className="mt-4 flex flex-col gap-2 text-sm">
            {fromCurrency !== "VES" ? (
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-muted-foreground">
                  <CurrencyFlagIcon currency="VES" /> Bolívares
                </dt>
                <dd className="font-mono tabular-nums">{formatBs(result.ves)}</dd>
              </div>
            ) : null}
            {fromCurrency !== "USD" ? (
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-muted-foreground">
                  <CurrencyFlagIcon currency="USD" /> Dólar (tasa BCV)
                </dt>
                <dd className="font-mono tabular-nums">{formatDisplayCurrency(result.usd, "USD")}</dd>
              </div>
            ) : null}
            {fromCurrency !== "EUR" ? (
              <div className="flex items-center justify-between">
                <dt className="flex items-center gap-1.5 text-muted-foreground">
                  <CurrencyFlagIcon currency="EUR" /> Euro (tasa BCV)
                </dt>
                <dd className="font-mono tabular-nums">{formatDisplayCurrency(result.eur, "EUR")}</dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <p className="mt-4 text-xs text-muted-foreground">
            {error ? "Sin tasa disponible por ahora." : "Cargando la tasa para calcular…"}
          </p>
        )}
      </div>
    </div>
  );
}
