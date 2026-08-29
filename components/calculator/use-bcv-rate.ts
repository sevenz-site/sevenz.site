"use client";

import { useEffect, useState } from "react";
import type { Rate } from "@/components/calculator/convert";

// This site is a static export — nothing runs per-request on the server, so
// the rate has to be fetched client-side, in the browser, after the static
// HTML loads. Same two public, no-auth, CORS-confirmed sources the
// dashboard app already uses (lib/exchange-rate/dolar-api-provider.ts and
// currency-api-provider.ts), reimplemented standalone — no cross-repo import.

export type BcvRate = Rate & { fetchedAt: Date; source: "dolarapi" | "currency-api" };

const TIMEOUT_MS = 8_000;

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

type DolarApiResponse = { promedio: number; fechaActualizacion: string };

async function fetchFromDolarApi(): Promise<BcvRate> {
  const [usdRes, eurRes] = await Promise.all([
    fetchWithTimeout("https://ve.dolarapi.com/v1/dolares/oficial"),
    fetchWithTimeout("https://ve.dolarapi.com/v1/euros/oficial"),
  ]);
  if (!usdRes.ok || !eurRes.ok) throw new Error("dolarapi respondió con error.");
  const [usdData, eurData] = (await Promise.all([usdRes.json(), eurRes.json()])) as DolarApiResponse[];
  if (!usdData.promedio || !eurData.promedio) {
    throw new Error("dolarapi no devolvió un promedio válido.");
  }
  return { usd: usdData.promedio, eur: eurData.promedio, fetchedAt: new Date(), source: "dolarapi" };
}

async function fetchVesFromCurrencyApi(base: "usd" | "eur"): Promise<number> {
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base}.json`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error(`currency-api respondió con error para ${base}.`);
  const data = (await res.json()) as Record<string, Record<string, number>>;
  const ves = data[base]?.ves;
  if (!ves) throw new Error(`currency-api no incluyó VES para ${base}.`);
  return ves;
}

async function fetchFromCurrencyApi(): Promise<BcvRate> {
  const [usd, eur] = await Promise.all([fetchVesFromCurrencyApi("usd"), fetchVesFromCurrencyApi("eur")]);
  return { usd, eur, fetchedAt: new Date(), source: "currency-api" };
}

export function useBcvRate() {
  const [rate, setRate] = useState<BcvRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const result = await fetchFromDolarApi();
        if (!cancelled) setRate(result);
      } catch {
        try {
          const result = await fetchFromCurrencyApi();
          if (!cancelled) setRate(result);
        } catch {
          if (!cancelled) setError(true);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { rate, loading, error };
}
