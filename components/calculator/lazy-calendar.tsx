"use client";

import { es } from "date-fns/locale";
import type { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

// Split into its own module so react-day-picker + date-fns/locale only load
// when this is dynamically imported — this page is public SEO content, so
// every visitor and crawler otherwise pays for a calendar most never open.
export default function LazyCalendar({
  range,
  onSelect,
  earliest,
  latest,
}: {
  range: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  earliest: Date;
  latest: Date;
}) {
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={onSelect}
      locale={es}
      defaultMonth={latest}
      startMonth={earliest}
      endMonth={latest}
      disabled={{ before: earliest, after: latest }}
    />
  );
}
