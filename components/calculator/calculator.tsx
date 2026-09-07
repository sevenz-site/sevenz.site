"use client";

import { type ChangeEvent, useState } from "react";
import { ArrowUpDown, Share2 } from "lucide-react";
import { convert, type Currency, type Rate } from "@/components/calculator/convert";
import { CurrencyFlagIcon } from "@/components/calculator/currency-flag-icon";
import { formatBs, formatBsAmount, formatDisplayCurrency, formatRateEquivalence } from "@/components/calculator/format";
import { useBcvRate } from "@/components/calculator/use-bcv-rate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// PORTED FROM THE DASHBOARD — the RateCalculator inside
// components/dashboard/exchange-rate-strip.tsx. Deliberately a copy, not an
// import: the two repos ship separately (this one is a static export on
// Cloudflare, the dashboard runs on Vercel) and there is no shared package.
//
// The debt that creates is real and worth stating plainly: the BCV date bug
// fixed on 2026-09-07 lived in both repos and had to be fixed twice. If you
// change the layout, the copy, or the conversion behaviour here, the same
// change is almost certainly owed to exchange-rate-strip.tsx, and the reverse.
//
// What is NOT copied, and should not be: the dashboard wraps this in a Popover
// on desktop and a Sheet on a phone, behind a "Calcular" button. Here the
// calculator IS the page, so it renders inline.

const MONTH_ABBR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// "2026-09-04" -> "4 sep 2026". Split on the string rather than parsed into a
// Date: the value is already a Venezuelan calendar day with no instant in it,
// and `new Date()` would read it as UTC midnight and render the day before for
// every visitor west of Greenwich. Same reason rate-history-table.tsx parses
// its dates at explicit local midnight.
function formatRateDate(ymd: string): string {
  const [year, month, day] = ymd.split("-").map(Number);
  if (!year || !month || !day) return ymd;
  return `${day} ${MONTH_ABBR[month - 1]} ${year}`;
}

// Today's date in Venezuela, "YYYY-MM-DD". en-CA is the locale trick that
// yields ISO order; the timeZone is what matters — a visitor in Madrid, or a
// Cloudflare edge running UTC, must not compute a different "today" than the
// shop they are pricing for.
function todayInCaracas(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Caracas",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function RateBanner({
  rate,
  loading,
  error,
}: {
  rate: { usd: number; eur: number } | null;
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

  return (
    <div className="flex flex-col items-center gap-2">
      {/* A label, not a date. The rate's actual day is stated once, on the card
          that carries the result — saying it twice on one screen is how the two
          come to disagree, which is exactly what the old stamp did. */}
      <p className="font-mono text-xs text-muted-foreground">Tasa del día</p>
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
    </div>
  );
}

function RateConverter({ rate, rateDate }: { rate: Rate; rateDate: string | null }) {
  // Digits-only "cents" mask — the same way a POS amount field works: typing
  // shifts digits in from the right, the last two are always the decimals.
  const [rawDigits, setRawDigits] = useState("");
  // Which side the visitor types into. Starts on bolívares because that is the
  // question actually being asked — "esto cuesta Bs. X, ¿cuánto es en
  // dólares?" — and "Invertir" swaps it.
  const [entry, setEntry] = useState<"VES" | "FOREIGN">("VES");
  const [pair, setPair] = useState<"USD" | "EUR">("USD");
  const [shared, setShared] = useState(false);

  const pairRate = pair === "USD" ? rate.usd : rate.eur;
  const pairName = pair === "USD" ? "Dólar" : "Euro";
  const pairPlural = pair === "USD" ? "Dólares" : "Euros";

  const cents = Number(rawDigits || "0");
  const amount = cents / 100;
  const hasAmount = amount > 0;

  const fromCurrency: Currency = entry === "VES" ? "VES" : pair;
  const converted = hasAmount ? convert(amount, fromCurrency, rate) : null;
  const result = converted
    ? entry === "VES"
      ? pair === "USD"
        ? converted.usd
        : converted.eur
      : converted.ves
    : null;

  // Prefixed, so the field reads the same as its own placeholder and as the
  // result below it. The digits-only mask strips the prefix on every keystroke
  // and re-adds it, so it never reaches the parsed value.
  const putValue = hasAmount
    ? entry === "VES"
      ? `Bs. ${formatBsAmount(amount)}`
      : formatDisplayCurrency(amount, pair)
    : "";
  const putPlaceholder = entry === "VES" ? "Bs. 0,00" : formatDisplayCurrency(0, pair);
  const getText =
    result === null
      ? entry === "VES"
        ? formatDisplayCurrency(0, pair)
        : formatBs(0)
      : entry === "VES"
        ? formatDisplayCurrency(result, pair)
        : formatBs(result);

  const stampLabel = rateDate ? `Tasa BCV del ${formatRateDate(rateDate)}` : "Tasa BCV";
  // This page always asks the provider live, so its rate is by definition the
  // newest published one. A date that is not today therefore has exactly one
  // cause — the BCV did not publish — and saying so is safe here. The dashboard
  // reads a stored copy, has a second possible cause, and has to tell them
  // apart before it can claim either.
  const noPublicationToday = rateDate !== null && rateDate < todayInCaracas();

  function handleAmountChange(e: ChangeEvent<HTMLInputElement>) {
    setRawDigits(e.target.value.replace(/\D/g, "").slice(0, 15));
  }

  async function handleShare() {
    // With nothing typed there is no conversion to send, but the rate itself is
    // still worth sharing — and it is the thing people are most often asked
    // for. Sharing "Bs. 0,00 = $0.00" instead would waste the tap.
    const text = hasAmount
      ? `${putValue} = ${getText}${entry === "VES" ? ` ${pairPlural}` : ""} · ${stampLabel}`
      : `1 ${pairName} = ${formatBs(pairRate)} · ${stampLabel}`;
    try {
      // The native sheet is what gets this into WhatsApp, which is where these
      // quotes actually go. Clipboard is the fallback for desktop, where
      // navigator.share often does not exist.
      if (navigator.share) await navigator.share({ text });
      else {
        await navigator.clipboard.writeText(text);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch {
      // A dismissed share sheet rejects; that is a normal outcome, not an error.
    }
  }

  return (
    // text-left is not decoration. The page section that wraps the calculator
    // is text-center — correct for the hero above it, wrong for a form — and
    // both cards inherited it. The amount field looked left-aligned anyway,
    // because an <input> does not inherit text-align, so the card ended up
    // centred around a left-aligned number. The dashboard's copy of this
    // component has no centred ancestor and never showed the problem, which is
    // exactly the kind of gap that makes "identical" untrue.
    <div className="flex w-full flex-col gap-3 text-left">
      {/* Which pair, not which source currency. A shop converts one foreign
          currency against bolívares, never one against the other. */}
      <div className="flex gap-2">
        {(["USD", "EUR"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setPair(c)}
            aria-pressed={pair === c}
            className={cn(
              "flex h-10 items-center gap-2 rounded-full border px-3 text-sm font-medium transition-colors",
              pair === c
                ? "border-transparent bg-primary text-primary-foreground"
                : "bg-background text-muted-foreground",
            )}
          >
            <CurrencyFlagIcon currency={c} />
            {c === "USD" ? "Dólares" : "Euro"}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-1 rounded-lg border px-3 py-2">
        <label htmlFor="calc-amount" className="text-xs text-muted-foreground">
          Tú pones
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="calc-amount"
            type="text"
            inputMode="numeric"
            placeholder={putPlaceholder}
            value={putValue}
            onChange={handleAmountChange}
            className="h-auto border-0 bg-transparent p-0 text-2xl font-semibold shadow-none focus-visible:ring-0"
          />
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            {entry === "VES" ? "Bolívares" : pairPlural}
            <CurrencyFlagIcon currency={entry === "VES" ? "VES" : pair} />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            // Carry the result across rather than only flipping the labels.
            // Keeping the digits would turn "Bs. 100.000" into "€100.000" — the
            // same number meaning something a thousand times larger, with
            // nothing on screen to say so.
            if (result !== null) setRawDigits(String(Math.round(result * 100)));
            setEntry((e) => (e === "VES" ? "FOREIGN" : "VES"));
          }}
        >
          <ArrowUpDown className="size-4" />
          Invertir
        </Button>
        <span className="h-px flex-1 bg-border" />
        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
          1 {pairName} = {formatBs(pairRate)}
        </span>
      </div>

      <div className="flex flex-col gap-0.5 rounded-lg bg-primary px-3 py-2 text-primary-foreground">
        <span className="text-xs opacity-70">Tú cobras</span>
        <span className="text-2xl font-semibold tabular-nums">
          {getText}
          {entry === "VES" ? ` ${pairPlural}` : ""}
        </span>
        <span className="text-xs opacity-70">{stampLabel}</span>
        {noPublicationToday ? (
          <span className="text-xs opacity-70">
            El BCV no publica sábados, domingos ni festivos. Esta es la última tasa publicada.
          </span>
        ) : null}
      </div>

      <Button type="button" variant="outline" onClick={handleShare}>
        {shared ? "Copiado" : "Compartir"}
        <Share2 className="size-4" />
      </Button>
    </div>
  );
}

export function Calculator() {
  const { rate, loading, error } = useBcvRate();

  return (
    <div className="flex w-full flex-col items-center">
      <RateBanner rate={rate} loading={loading} error={error} />

      <div className="mt-8 w-full max-w-sm rounded-xl border p-6">
        {rate && !error ? (
          <RateConverter rate={rate} rateDate={rate.rateDate} />
        ) : (
          <p className="text-xs text-muted-foreground">
            {error ? "Sin tasa disponible por ahora." : "Cargando la tasa para calcular…"}
          </p>
        )}
      </div>
    </div>
  );
}
