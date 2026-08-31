# BCV rate history chart — spec de implementación

Status: **approved, not yet built**. Ports an already-shipped, already-
verified dashboard feature onto this site's calculator — build from this,
don't redesign it. The dashboard's version is the source of truth; if
anything here is unclear, read the real files at the paths cited below.

## 1. What this is and why

The dashboard app (`Sevenz/dashboard`) just shipped a small chart inside
its "Calcular" popover: a 7-day line chart of the BCV USD and EUR rates,
so an owner can see the trend instead of just today's number. This doc
ports the same chart onto `sevenz.site/calculadora-dolar-bcv`'s calculator
(`components/calculator/calculator.tsx`), which already renders the
current rate + conversion (built from `Web/docs/lead-magnet-calculator.md`).

Reference implementation (read these before writing anything — this spec
summarizes them, it doesn't replace them):

- `Sevenz/dashboard/lib/exchange-rate/rate-history.ts` — data fetching
- `Sevenz/dashboard/components/dashboard/rate-history-chart.tsx` — the chart

## 2. What's different here vs. the dashboard

The dashboard mounts its chart inside a Popover/Drawer that only exists
while open (Radix unmounts it on close), so "fetch on mount" naturally
means "fetch only when the owner opens the calculator." **This page has
no such gating** — `Calculator` is just a section on a static page, always
mounted the moment someone lands here. So: the history fetch simply fires
on page load, same as the current-rate fetch `useBcvRate()` already does.
No lazy-loading logic to port — that part of the dashboard's design doesn't
apply here, don't reproduce it.

Everything else — the 7-day window, the merge-by-date logic, the module-
scoped cache, the two-line (not stacked) chart, the day+month axis labels —
carries over directly.

## 3. New dependency: recharts + shadcn's chart wrapper

Neither exists in this repo yet (`Web/package.json` has no `recharts`;
`Web/components/ui/` only has `badge.tsx` and `button.tsx`). Two steps:

```bash
npm install recharts
npx shadcn@latest add chart
```

The second command uses this repo's existing `components.json` (already
configured, `style: "radix-nova"`, same as the rest of the site) to drop a
standard `components/ui/chart.tsx` in place — the same generic
`ChartContainer`/`ChartTooltip`/`ChartLegend` wrapper the dashboard uses,
not custom Sevenz code. Don't hand-copy the dashboard's `chart.tsx` file;
regenerate it fresh via the CLI so it matches this repo's own shadcn config
and stays independently updatable.

## 4. Data fetching: `components/calculator/rate-history.ts`

Direct port of `dashboard/lib/exchange-rate/rate-history.ts`, same file
name, same directory convention as this site's existing
`components/calculator/{convert,format,use-bcv-rate}.ts` (each already an
independent reimplementation of a dashboard equivalent — same pattern,
one more file):

```ts
export type RateHistoryPoint = {
  date: string; // YYYY-MM-DD
  usd: number;
  eur: number;
};

type HistoricoEntry = { promedio: number; fecha: string };

const HISTORY_DAYS = 7;

async function fetchHistorico(url: string): Promise<HistoricoEntry[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} respondió ${response.status}`);
  return (await response.json()) as HistoricoEntry[];
}

let cachedHistory: Promise<RateHistoryPoint[]> | null = null;

// ve.dolarapi.com's historicos endpoints return a currency's FULL daily
// series since Jan 2023 in one call — there's no "last N days" param, so
// the 7-day window is applied client-side after fetching both currencies.
// Kept short — Venezuela's rate moves fast enough that a longer window
// reads as noise rather than signal for a "what's the trend" glance.
export function getRateHistory(): Promise<RateHistoryPoint[]> {
  if (!cachedHistory) {
    cachedHistory = Promise.all([
      fetchHistorico("https://ve.dolarapi.com/v1/historicos/dolares/oficial"),
      fetchHistorico("https://ve.dolarapi.com/v1/historicos/euros/oficial"),
    ])
      .then(([usdHistory, eurHistory]) => {
        const eurByDate = new Map(eurHistory.map((entry) => [entry.fecha, entry.promedio]));
        const merged = usdHistory
          .filter((entry) => eurByDate.has(entry.fecha))
          .map((entry) => ({
            date: entry.fecha,
            usd: entry.promedio,
            eur: eurByDate.get(entry.fecha)!,
          }));
        return merged.slice(-HISTORY_DAYS);
      })
      .catch((err) => {
        cachedHistory = null; // let the next mount retry instead of caching a failure
        throw err;
      });
  }
  return cachedHistory;
}
```

CORS on `ve.dolarapi.com`'s historicos endpoint was already confirmed
permissive (`Access-Control-Allow-Origin: *`) when this was built for the
dashboard — no server involved, this fetches straight from the browser
same as `use-bcv-rate.ts` already does.

## 5. Chart component: `components/calculator/rate-history-chart.tsx`

Direct port of `dashboard/components/dashboard/rate-history-chart.tsx`,
adjusted only for local import paths:

```tsx
"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getRateHistory, type RateHistoryPoint } from "@/components/calculator/rate-history";

// Two independent rates, not parts of a whole — plain lines, never a
// stacked area (stacking would render EUR on top of USD, i.e. their sum,
// not EUR's own value).
const chartConfig = {
  usd: { label: "USD", color: "var(--color-blue-500)" },
  eur: { label: "EUR", color: "var(--color-amber-500)" },
} satisfies ChartConfig;

const tickFormatter = (value: string) =>
  new Intl.DateTimeFormat("es-CO", { day: "2-digit", month: "short" }).format(new Date(`${value}T00:00:00`));

// Short "25 ago" form, built manually rather than via Intl — the ICU
// short-month format adds a trailing period ("ago."), which only widens
// seven already-tight axis labels for no benefit.
const MONTH_ABBR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
const xAxisFormatter = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  return `${date.getDate()} ${MONTH_ABBR[date.getMonth()]}`;
};

// Whole bolívares, no decimals — an axis tick is a scale reference, not a
// precise figure (the tooltip already shows the exact value on hover).
const yAxisFormatter = (value: number) => Math.round(value).toLocaleString("es-VE");

type State = { status: "loading" } | { status: "error" } | { status: "ready"; data: RateHistoryPoint[] };

// Fetches on mount — unlike the dashboard's version, there's no
// Popover/Drawer gating this page's Calculator, so mounting IS the
// "opened" moment. getRateHistory() still caches at module scope so a
// client-side re-render doesn't refetch.
export function RateHistoryChart() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    getRateHistory()
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <div className="h-[160px] w-full animate-pulse rounded-lg bg-muted/40" />;
  }

  if (state.status === "error") {
    return (
      <p className="text-xs text-muted-foreground">No pudimos cargar el histórico de tasas en este momento.</p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Tasa BCV — últimos 7 días</p>
      <ChartContainer config={chartConfig} className="h-[160px] w-full">
        <LineChart data={state.data} margin={{ left: 12, right: 12 }}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={11}
            interval={0}
            tickFormatter={xAxisFormatter}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={11}
            width={44}
            tickFormatter={yAxisFormatter}
          />
          <ChartTooltip content={<ChartTooltipContent labelFormatter={tickFormatter} />} />
          <Line dataKey="usd" type="monotone" stroke="var(--color-usd)" strokeWidth={2} dot={false} />
          <Line dataKey="eur" type="monotone" stroke="var(--color-eur)" strokeWidth={2} dot={false} />
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
```

## 6. Placement in the page

In `app/calculadora-dolar-bcv/page.tsx`, insert it between `<Calculator />`
and the disclaimer paragraph — same "below the prices, above the
disclaimer" position it has in the dashboard:

```tsx
<div className="mt-10 w-full">
  <Calculator />
</div>

<div className="mt-6 w-full max-w-sm">
  <RateHistoryChart />
</div>

<p className="mt-8 max-w-md text-xs text-muted-foreground">
  Las tasas de cambio mostradas en Sevenz provienen de fuentes públicas ...
</p>
```

(The `max-w-sm` wrapper matches the calculator card's own width right
above it — the chart shouldn't suddenly go full-page-width when
everything around it is centered and narrow.)

## 7. Testing checklist

- [ ] `npm run build` succeeds with `output: "export"` (client-side fetch
      only, nothing here needs server-side data fetching).
- [ ] Chart renders with real data on first load — both lines visible,
      correctly colored (blue USD, amber EUR), legend present.
- [ ] All 7 day labels show on the X axis without overlapping (this took
      an `interval={0}` + day-only-then-day+month iteration on the
      dashboard version — start from the tuned version above, don't
      re-derive it from scratch).
- [ ] Tooltip on hover shows the full date + both values.
- [ ] Loading skeleton shows briefly on a fresh page load; error state
      renders (not a crash) if both `ve.dolarapi.com` and the jsDelivr
      fallback are blocked (test via browser devtools request blocking).
- [ ] Mobile viewport: chart fits within the `max-w-sm` card width without
      horizontal scroll.
