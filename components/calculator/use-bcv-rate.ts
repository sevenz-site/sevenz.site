"use client";

import { useEffect, useState } from "react";
import type { Rate } from "@/components/calculator/convert";

// This site is a static export — nothing runs per-request on the server, so
// the rate has to be fetched client-side, in the browser, after the static
// HTML loads. Same two public, no-auth, CORS-confirmed sources the
// dashboard app already uses (lib/exchange-rate/dolar-api-provider.ts and
// currency-api-provider.ts), reimplemented standalone — no cross-repo import.

// rateDate is the day the BCV rate itself belongs to ("2026-09-04"), which is
// NOT the same as when we asked for it. The BCV does not publish on weekends
// or holidays, so a visitor on Sunday night is looking at Friday's number.
// Labelling that with the fetch time told them it was from Sunday, and no such
// rate ever existed — the history table right below has no row for it.
//
// Null only from the currency-api fallback, which publishes no date of its own.
export type BcvRate = Rate & {
  rateDate: string | null;
  fetchedAt: Date;
  source: "dolarapi" | "currency-api";
};

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

// "2026-09-07T00:00:00-04:00" -> "2026-09-07". Sliced rather than parsed
// through Date: the string already carries Venezuela's offset, so building a
// Date and reading it back in the visitor's timezone is what would shift the
// day — the exact bug this function exists to avoid.
function rateDateOf(iso: string | undefined): string | null {
  if (!iso || iso.length < 10) return null;
  const ymd = iso.slice(0, 10);
  return /^\d{4}-\d{2}-\d{2}$/.test(ymd) ? ymd : null;
}

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
  return {
    usd: usdData.promedio,
    eur: eurData.promedio,
    rateDate: rateDateOf(usdData.fechaActualizacion),
    fetchedAt: new Date(),
    source: "dolarapi",
  };
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
  return { usd, eur, rateDate: null, fetchedAt: new Date(), source: "currency-api" };
}

// El precio del USDT en bolívares. Binance P2P, vía CriptoYa.
//
// BINANCE Y NO LA MEDIANA DEL MERCADO. Cuando un tendero venezolano dice "el
// USDT" quiere decir Binance, que es donde mira. Si aquí sale 971 y él abre
// Binance y lee 967,88, no concluye que está viendo una mediana: concluye que
// Sevenz está mal. Las otras casas que devuelve CriptoYa se ignoran a
// propósito — en el dashboard se usan como control, pero aquí no hay dónde
// enseñar un control.
//
// LA VENTA (`ask`) y no la compra. Es lo que cuesta comprar 1 USDT, que es el
// número que los rastreadores de tasas venezolanos citan como "el Binance".
// Hoy la diferencia con la compra es del 0,09 %, así que la elección importa
// menos por la cifra que por ser una sola y estar escrita en un sitio.
//
// DEVUELVE null SIN RUIDO. Si CriptoYa no contesta, la calculadora se dibuja
// sin la pestaña de USDT y nadie se entera de que iba a haber una. Es un
// extra, no una dependencia.
async function fetchUsdtP2p(): Promise<number | null> {
  try {
    const res = await fetchWithTimeout("https://criptoya.com/api/usdt/ves/1");
    if (!res.ok) throw new Error(`criptoya respondió ${res.status}`);
    const data = (await res.json()) as Record<string, { ask?: number }>;
    const ask = data.binancep2p?.ask;
    // Sin Binance no hay dato: no se sustituye por otra casa, porque sería
    // enseñar un número que el visitante no va a poder comprobar donde mira.
    return typeof ask === "number" && ask > 0 ? ask : null;
  } catch {
    return null;
  }
}

export function useBcvRate() {
  const [rate, setRate] = useState<BcvRate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [usdt, setUsdt] = useState<number | null>(null);

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

    // EN SU PROPIO EFECTO, no encadenado al de arriba. El USDT es un extra:
    // si falla, la calculadora tiene que seguir funcionando con dólar y euro
    // exactamente igual que antes, y si el BCV falla, el USDT no tiene por
    // qué caer con él. Encadenarlos ataría el destino de los dos.
    (async () => {
      const precio = await fetchUsdtP2p();
      if (!cancelled) setUsdt(precio);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { rate, loading, error, usdt };
}
