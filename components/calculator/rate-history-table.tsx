"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getRateHistory, type RateHistoryPoint } from "@/components/calculator/rate-history";
import { cn } from "@/lib/utils";

const HISTORY_DAYS = 90;

// Lazy-loaded: this page is public, unauthenticated SEO content (unlike the
// dashboard, where the calendar sits behind login and page weight has no SEO
// cost). react-day-picker + date-fns/locale only load once a visitor actually
// taps "Filtrar por fecha" instead of on every page load and crawl.
const LazyCalendar = dynamic(() => import("@/components/calculator/lazy-calendar"), {
  ssr: false,
  loading: () => <div className="h-[286px] w-full animate-pulse rounded-lg bg-muted/40" />,
});

const MONTH_ABBR = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

// The API hands back "YYYY-MM-DD" strings; appending the time keeps them
// parsed in local time. Without it they would be read as UTC and every date
// would shift a day back for a Venezuelan or Colombian owner.
function parseYmd(ymd: string): Date {
  return new Date(`${ymd}T00:00:00`);
}

function toYmd(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function formatDate(ymd: string): string {
  const d = parseYmd(ymd);
  return `${d.getDate()} ${MONTH_ABBR[d.getMonth()]} ${d.getFullYear()}`;
}

const bs = new Intl.NumberFormat("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Row = RateHistoryPoint & {
  // Day-over-day change, always computed against the previous day in the
  // FULL series rather than the filtered view — otherwise the first visible
  // row would read as "no change" purely because of where the filter starts.
  deltaUsd: number | null;
  deltaUsdPct: number | null;
};

type State = { status: "loading" } | { status: "error" } | { status: "ready"; rows: Row[] };

function buildRows(data: RateHistoryPoint[]): Row[] {
  return data.map((point, i) => {
    const prev = i > 0 ? data[i - 1] : null;
    if (!prev) return { ...point, deltaUsd: null, deltaUsdPct: null };
    const deltaUsd = point.usd - prev.usd;
    return { ...point, deltaUsd, deltaUsdPct: (deltaUsd / prev.usd) * 100 };
  });
}

function DeltaCell({ row }: { row: Row }) {
  if (row.deltaUsd === null || row.deltaUsdPct === null) {
    return <span className="text-muted-foreground">—</span>;
  }
  // Rounded before comparing: a change of 0.004 Bs. displays as "0,00", and
  // painting that green would claim a rise the number on screen doesn't show.
  const rounded = Number(row.deltaUsd.toFixed(2));
  const sign = rounded > 0 ? "+" : "";
  return (
    <span
      className={cn(
        "tabular-nums",
        rounded > 0 && "text-emerald-600",
        rounded < 0 && "text-destructive",
        rounded === 0 && "text-muted-foreground",
      )}
    >
      {/* The unit is what makes this readable: without it "+2,85" reads as a
          bare number with no currency, since the neighbouring columns all
          carry "Bs." and this one didn't. */}
      {sign}Bs. {bs.format(rounded)}
      {/* Unlike the dashboard, this column never gets the room to also show
          "(+0,36%)" — the page's calculator card above is independently
          capped at max-w-sm on every screen size (not just mobile), so the
          percentage stays out at all widths instead of only below sm:. */}
    </span>
  );
}

export function RateHistoryTable() {
  const [state, setState] = useState<State>({ status: "loading" });
  const [range, setRange] = useState<DateRange | undefined>();
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getRateHistory()
      .then((data) => {
        if (!cancelled) setState({ status: "ready", rows: buildRows(data) });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error" });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Bounds the calendar to the window the data actually covers. Letting a
  // visitor pick March 2019 and land on an empty table is worse than not
  // offering the month at all.
  const { earliest, latest } = useMemo(() => {
    const today = new Date();
    const from = new Date();
    from.setDate(today.getDate() - (HISTORY_DAYS - 1));
    return { earliest: from, latest: today };
  }, []);

  const visible = useMemo(() => {
    if (state.status !== "ready") return [];
    // Newest first — the rate someone came to check is today's, not the one
    // from three months ago.
    const rows = [...state.rows].reverse();
    if (!range?.from) return rows;
    const from = toYmd(range.from);
    const to = toYmd(range.to ?? range.from);
    return rows.filter((r) => r.date >= from && r.date <= to);
  }, [state, range]);

  if (state.status === "loading") {
    return <div className="h-[260px] w-full animate-pulse rounded-lg bg-muted/40" />;
  }

  if (state.status === "error") {
    return (
      <p className="text-xs text-muted-foreground">
        No pudimos cargar el histórico de tasas en este momento.
      </p>
    );
  }

  const filtered = Boolean(range?.from);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs font-medium text-muted-foreground">
          Tasa BCV — {filtered ? `${visible.length} de ${state.rows.length} días` : "últimos 90 días"}
        </p>
        <div className="flex items-center gap-1">
          {filtered ? (
            <Button variant="ghost" size="sm" onClick={() => setRange(undefined)}>
              Limpiar
            </Button>
          ) : null}
          <Button variant="outline" size="sm" onClick={() => setFilterOpen((open) => !open)}>
            <CalendarIcon className="size-4" />
            Filtrar por fecha
            <ChevronDown className={cn("size-4 transition-transform", filterOpen && "rotate-180")} />
          </Button>
        </div>
      </div>

      {/* Inline rather than inside a Popover on purpose — there is no
          Popover/Drawer wrapping the calculator on this page (unlike the
          dashboard), so the nested-overlay problem that motivated that
          workaround there doesn't apply here either. Keeping it inline is
          simpler and there's no benefit to a popover-in-nothing. */}
      <Collapsible open={filterOpen} onOpenChange={setFilterOpen}>
        <CollapsibleContent>
          <div className="flex justify-center rounded-lg border">
            <LazyCalendar range={range} onSelect={setRange} earliest={earliest} latest={latest} />
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* min-w-0 is what actually makes overflow-auto work here: a flex child
          defaults to min-width:auto, so without it the box refuses to shrink
          below the table's natural width and pushes the whole page sideways
          instead of scrolling inside itself. */}
      <div className="max-h-[280px] min-w-0 overflow-auto rounded-lg border">
        <Table className="text-xs [&_td]:px-1.5 [&_td]:py-1.5 [&_th]:px-1.5">
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>Fecha</TableHead>
              <TableHead className="text-right whitespace-nowrap">Dólar BCV</TableHead>
              <TableHead className="text-right whitespace-nowrap">Euro BCV</TableHead>
              <TableHead className="text-right whitespace-nowrap">Var. USD</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visible.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No hay tasas publicadas en esas fechas.
                </TableCell>
              </TableRow>
            ) : (
              visible.map((row) => (
                <TableRow key={row.date}>
                  <TableCell className="whitespace-nowrap">{formatDate(row.date)}</TableCell>
                  <TableCell className="text-right tabular-nums whitespace-nowrap">Bs. {bs.format(row.usd)}</TableCell>
                  <TableCell className="text-right tabular-nums whitespace-nowrap">Bs. {bs.format(row.eur)}</TableCell>
                  <TableCell className="text-right">
                    <DeltaCell row={row} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
