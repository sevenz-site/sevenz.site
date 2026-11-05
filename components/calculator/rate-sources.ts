import { eurIsPlausible, usdIsPlausible } from "@/components/calculator/rate-guard";

// TWO MIRRORS OF THE BCV FOR THE BROWSER. The app's server reads three (DolarApi, DolarVZLA and
// the BCV's own page, see dashboard lib/exchange-rate/resolve-rates.ts); this static site
// runs in the visitor's browser, and the BCV's page sends no CORS header, so here there are
// two. A copy on purpose: the two repos share no code.
//
// A reading carries the day it is valid for, never the day we asked: on a Friday afternoon
// DolarVZLA already carries Monday's rate, and comparing it with DolarApi's Friday would be
// comparing two different days.
export type RateSource = "dolarapi" | "dolarvzla" | "currency-api";

export type DatedRate = { date: string; usd: number; eur: number; source: RateSource };

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIMEOUT_MS = 8_000;
// Sources copy the BCV to eight decimals; DolarApi rounds the dollar to four. Anything past
// this is not rounding, it is a different number.
const AGREEMENT_TOLERANCE = 0.001;

export function todayInCaracas(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Caracas", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
}

// rates.dolarvzla.com/bcv/current.json: `current` is the newest PUBLISHED rate, which from
// the afternoon before is tomorrow's; `previous` is the one before it. Both go to the
// resolver dated and it decides which one is in force today.
export async function readDolarVzla(): Promise<DatedRate[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("https://rates.dolarvzla.com/bcv/current.json", { signal: controller.signal, cache: "no-store" });
    if (!res.ok) throw new Error(`dolarvzla respondió ${res.status}`);
    const data = (await res.json()) as { current?: { date: string; usd: number; eur: number }; previous?: { date: string; usd: number; eur: number } };
    const readings: DatedRate[] = [];
    for (const entry of [data.current, data.previous]) {
      if (entry && DATE_RE.test(entry.date) && typeof entry.usd === "number" && typeof entry.eur === "number") {
        readings.push({ date: entry.date, usd: entry.usd, eur: entry.eur, source: "dolarvzla" });
      }
    }
    if (readings.length === 0) throw new Error("dolarvzla no devolvió una tasa con fecha.");
    return readings;
  } finally {
    clearTimeout(timeout);
  }
}

export type CalculatorResolution = { date: string | null; usd: number | null; eur: number | null; witnesses: RateSource[] };

function agree(a: number, b: number): boolean {
  return Math.abs(a - b) / b <= AGREEMENT_TOLERANCE;
}

// Per currency, the same table as the app minus what the app has and this page does not: a
// stored last good value to hold, and the BCV as arbiter. So: two agree, that value; they
// disagree, DolarVZLA (it copies the BCV with no transformation, and DolarApi is the one that
// broke on 2026-11-05); one believable, that one; none, null and the caller falls back.
function pick(candidates: { source: RateSource; value: number }[]): { value: number | null; witnesses: RateSource[] } {
  const groups: { value: number; sources: RateSource[] }[] = [];
  for (const c of candidates) {
    const g = groups.find((g) => agree(c.value, g.value));
    if (g) g.sources.push(c.source);
    else groups.push({ value: c.value, sources: [c.source] });
  }
  if (groups.length === 0) return { value: null, witnesses: [] };
  const agreed = groups.find((g) => g.sources.length >= 2);
  if (agreed) return { value: agreed.value, witnesses: agreed.sources };
  const preferred = groups.find((g) => g.sources.includes("dolarvzla")) ?? groups[0];
  return { value: preferred.value, witnesses: preferred.sources };
}

export function resolveForCalculator(readings: DatedRate[], today: string): CalculatorResolution {
  const current = readings.filter((r) => DATE_RE.test(r.date) && r.date <= today);
  const date = current.length ? current.map((r) => r.date).sort().at(-1)! : null;
  const ofDay = current.filter((r) => r.date === date);
  const usd = pick(ofDay.filter((r) => usdIsPlausible(r.usd)).map((r) => ({ source: r.source, value: r.usd })));
  const referenceUsd = usd.value;
  const eur = pick(
    ofDay
      .filter((r) => {
        const ref = usdIsPlausible(r.usd) ? r.usd : referenceUsd;
        return ref !== null && eurIsPlausible(ref, r.eur);
      })
      .map((r) => ({ source: r.source, value: r.eur })),
  );
  return { date, usd: usd.value, eur: eur.value, witnesses: [...new Set([...usd.witnesses, ...eur.witnesses])] };
}
