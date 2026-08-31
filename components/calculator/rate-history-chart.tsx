"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { getRateHistory, type RateHistoryPoint } from "@/components/calculator/rate-history";
import { formatBs } from "@/components/calculator/format";

// Two independent rates, not parts of a whole — plain lines, never a
// stacked area (stacking would render EUR on top of USD, i.e. their sum,
// not EUR's own value).
const chartConfig = {
  usd: { label: "Dólar (tasa BCV)", color: "var(--color-blue-500)" },
  eur: { label: "Euro (tasa BCV)", color: "var(--color-amber-500)" },
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

// Each point carries its own "Bs. X,XX" label now, so a separate numeric
// scale would be redundant — but the YAxis stays mounted (just hidden)
// instead of being removed outright: with no axis at all, recharts
// defaults to a 0-anchored domain, which would squeeze USD (~795) and EUR
// (~923) into a narrow band near the top of the chart with no room for
// their labels. Padding the domain to the data's own min/max spreads the
// two lines across the full chart height instead.

// Seven "Bs. X,XX" labels at 60px apart run into each other on a narrow
// mobile card (measured overlap: adjacent labels touching with 0px gap).
// Staggering alternate points to a farther offset lets them overlap
// horizontally without visually colliding, instead of shortening the
// format the calculator uses everywhere else on this page.
type LabelContentProps = {
  x?: string | number;
  y?: string | number;
  value?: string | number | (string | number)[];
  index?: number;
};
function renderStaggeredLabel({ x, y, value, index }: LabelContentProps) {
  if (x === undefined || y === undefined || value === undefined || index === undefined) return null;
  const dy = index % 2 === 0 ? -8 : -30;
  return (
    <text x={x} y={y} dy={dy} textAnchor="middle" className="fill-foreground" fontSize={11}>
      {formatBs(Number(value))}
    </text>
  );
}

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
    return <div className="h-[220px] w-full animate-pulse rounded-lg bg-muted/40" />;
  }

  if (state.status === "error") {
    return (
      <p className="text-xs text-muted-foreground">No pudimos cargar el histórico de tasas en este momento.</p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground">Tasa BCV — últimos 7 días</p>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <LineChart data={state.data} margin={{ top: 34, left: 12, right: 12 }}>
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
          <YAxis hide domain={["dataMin - 20", "dataMax + 20"]} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent labelFormatter={tickFormatter} indicator="line" />}
          />
          <Line
            dataKey="usd"
            type="natural"
            stroke="var(--color-usd)"
            strokeWidth={2}
            dot={{ fill: "var(--color-usd)", r: 3 }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          >
            <LabelList content={renderStaggeredLabel} />
          </Line>
          <Line
            dataKey="eur"
            type="natural"
            stroke="var(--color-eur)"
            strokeWidth={2}
            dot={{ fill: "var(--color-eur)", r: 3 }}
            activeDot={{ r: 6 }}
            isAnimationActive={false}
          >
            <LabelList content={renderStaggeredLabel} />
          </Line>
          <ChartLegend content={<ChartLegendContent />} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
