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
  //
  // Seeded at 1.00 with dollars on top: someone arriving from a search for
  // "dólar BCV hoy" wants to see what one dollar is worth, and an empty field
  // makes them work for it.
  const [rawDigits, setRawDigits] = useState("100");
  // Which currency sits in the TOP field. FOREIGN means the pair (USD/EUR) is
  // on top and bolívares below.
  const [entry, setEntry] = useState<"VES" | "FOREIGN">("FOREIGN");
  const [pair, setPair] = useState<"USD" | "EUR">("USD");
  // Which of the two fields holds the number actually typed. Both are editable,
  // so this is what keeps the conversion from feeding on its own output: typing
  // 5 in the bolívares field must mean five bolívares, not "convert 5 up, round
  // it, then convert that back down".
  const [source, setSource] = useState<"put" | "get">("put");
  // True until the first edit. The seeded 1.00 is an example, not something the
  // visitor entered, so the first tap clears it — otherwise the digits mask
  // would push a typed 5 onto the existing 1.00 and produce $10.05. Only the
  // untouched seed clears: once they have typed, tapping away and back keeps
  // their number.
  const [pristine, setPristine] = useState(true);
  const [shared, setShared] = useState(false);

  const pairRate = pair === "USD" ? rate.usd : rate.eur;
  const pairName = pair === "USD" ? "Dólar" : "Euro";

  const putCurrency: Currency = entry === "VES" ? "VES" : pair;
  const getCurrency: Currency = entry === "VES" ? pair : "VES";
  const labelFor = (c: Currency) => (c === "VES" ? "Bolívares" : c === "USD" ? "Dólares" : "Euros");

  const cents = Number(rawDigits || "0");
  const typed = cents / 100;
  const hasAmount = typed > 0;

  const convertBetween = (amount: number, from: Currency, to: Currency) => {
    const all = convert(amount, from, rate);
    return to === "VES" ? all.ves : to === "USD" ? all.usd : all.eur;
  };
  const putAmount = source === "put" ? typed : convertBetween(typed, getCurrency, putCurrency);
  const getAmount = source === "get" ? typed : convertBetween(typed, putCurrency, getCurrency);

  const money = (amount: number, currency: Currency) =>
    currency === "VES" ? `Bs. ${formatBsAmount(amount)}` : formatDisplayCurrency(amount, currency);

  // An empty field stays empty rather than snapping back to 0,00 — the visitor
  // is mid-edit and a number reappearing under the cursor is its own bug.
  const putValue = rawDigits === "" && source === "put" ? "" : money(putAmount, putCurrency);
  const getValue = rawDigits === "" && source === "get" ? "" : money(getAmount, getCurrency);
  const putPlaceholder = money(0, putCurrency);
  const getPlaceholder = money(0, getCurrency);

  const stampLabel = rateDate ? `Tasa BCV del ${formatRateDate(rateDate)}` : "Tasa BCV";
  // This page always asks the provider live, so its rate is by definition the
  // newest published one. A date that is not today therefore has exactly one
  // cause — the BCV did not publish — and saying so is safe here. The dashboard
  // reads a stored copy, has a second possible cause, and has to tell them
  // apart before it can claim either.
  const noPublicationToday = rateDate !== null && rateDate < todayInCaracas();

  function editHandler(field: "put" | "get") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setSource(field);
      setPristine(false);
      setRawDigits(e.target.value.replace(/[^0-9]/g, "").slice(0, 15));
    };
  }

  // Focus only ever clears the seeded example. It deliberately does NOT change
  // which field is authoritative — typing does that.
  //
  // Making focus set `source` looked equivalent and was not: with Bs. 0,50 in
  // the bottom card, merely tapping the top field reinterpreted those same
  // digits as dollars and the card jumped to Bs. 406,87. Tapping a field is not
  // a statement about what the number means, and a converter that changes its
  // answer because you looked at it is worse than one that is hard to use.
  function focusHandler(field: "put" | "get") {
    return () => {
      if (!pristine) return;
      setSource(field);
      setRawDigits("");
      setPristine(false);
    };
  }

  async function handleShare() {
    // With nothing typed there is no conversion to send, but the rate itself is
    // still worth sharing — and it is the thing people are most often asked
    // for. Sharing "Bs. 0,00 = $0.00" instead would waste the tap.
    const text = hasAmount
      ? `${money(putAmount, putCurrency)} ${labelFor(putCurrency)} = ${money(getAmount, getCurrency)} ${labelFor(getCurrency)} · ${stampLabel}`
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
    // text-left is not decoration. The page section wrapping the calculator is
    // text-center — right for the hero above it, wrong for a form.
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
        <label htmlFor="calc-put" className="text-xs text-muted-foreground">
          Tú pones
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="calc-put"
            type="text"
            inputMode="numeric"
            placeholder={putPlaceholder}
            value={putValue}
            onChange={editHandler("put")}
            onFocus={focusHandler("put")}
            // md:text-2xl no es redundante. El Input de shadcn trae md:text-sm
            // en su clase base, tailwind-merge no lo quita porque es otro
            // grupo de variante, y Tailwind emite las responsive DESPUÉS de
            // las utilidades base — así que a partir de 768px ganaba y el
            // monto se renderizaba a 14px. En móvil siempre midió 24, que es
            // por lo que pasó desapercibido.
            className="h-auto border-0 bg-transparent p-0 text-2xl font-semibold shadow-none focus-visible:ring-0 md:text-2xl"
          />
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            {labelFor(putCurrency)}
            <CurrencyFlagIcon currency={putCurrency} />
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            // Carry the equivalence across rather than only flipping the
            // labels. Keeping the digits would turn "Bs. 100.000" into
            // "€100.000" — the same number meaning something a thousand times
            // larger, with nothing on screen to say so.
            setRawDigits(String(Math.round(getAmount * 100)));
            setSource("put");
            setPristine(false);
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

      {/* Editable too, in both directions: typing here sets the equivalent
          above. The label sits right after the amount so the card reads the
          same whichever currency is in it — before this, bolívares showed a
          bare "Bs. 813,74" while dollars showed "$1.00 Dólares". */}
      <div className="flex flex-col gap-0.5 rounded-lg bg-primary px-3 py-2 text-primary-foreground">
        <label htmlFor="calc-get" className="text-xs opacity-70">
          Tú cobras
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="calc-get"
            type="text"
            inputMode="numeric"
            placeholder={getPlaceholder}
            value={getValue}
            onChange={editHandler("get")}
            onFocus={focusHandler("get")}
            className="h-auto border-0 bg-transparent p-0 text-2xl font-semibold tabular-nums shadow-none placeholder:text-primary-foreground/50 focus-visible:ring-0 md:text-2xl"
          />
          {/* Label and flag together on the right, exactly as in "Tú pones".
              They were split apart for a while — label glued to the amount,
              flag at the edge — which needed a sized input to make the field
              hug its text, and truncated the label at 375px. Grouping them
              makes the two cards read the same and removes that whole trick. */}
          <span className="flex shrink-0 items-center gap-1.5 text-xs opacity-70">
            {labelFor(getCurrency)}
            <CurrencyFlagIcon currency={getCurrency} />
          </span>
        </div>
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
