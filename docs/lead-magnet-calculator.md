# Calculadora de dólar BCV — spec de implementación

Status: **approved, not yet built**. Decisions below were confirmed with the
founder on 2026-08-29; this doc is the implementation reference — build
from this, don't re-derive the product decisions.

## 1. What this is and why

A free, no-login currency calculator (USD/EUR → Bs at the official BCV
rate) living at its own URL on `sevenz.site`, acting as an SEO lead magnet.
Venezuelans search "precio del dólar hoy", "calculadora dólar bcv", etc.
daily — a page that answers that exact query can rank and pull in visitors
who've never heard of Sevenz, then convert a fraction of them via a CTA to
sign up. This is a standard content-marketing pattern (Wise, XE.com, and
every "dólar hoy Venezuela" site work this way).

## 2. Decisions already made (don't re-litigate)

| Question | Decision | Why |
|---|---|---|
| Placement | **Dedicated page**, not a homepage-only widget | A homepage widget only reaches people who already know Sevenz. A dedicated, indexable URL with its own title/meta can rank independently in Google — that's the entire point of a lead magnet: reaching people who don't know Sevenz yet. A small teaser link from the homepage/footer is a cheap add-on (§7), not a replacement. |
| Lead capture | **No gate** — free tool + a CTA below the result | Gating behind an email/WhatsApp form adds friction that hurts exactly the organic/shareable traffic this page exists to capture, and this site has no backend today (static export, §3) — a gate means standing up a Worker or a Supabase write path just to store submissions. Skip it; the CTA button is the conversion mechanism. |
| Rate scope | **BCV official rate only** (USD + EUR), no parallel/paralelo rate | Matches exactly what the Sevenz app itself shows customers today — no new "which number is right" inconsistency between the marketing site and the product. Reuses the app's already-proven data sources with zero new risk. |

## 3. Technical constraints (read before writing code)

- `Web/` is a **static export** (`next.config.ts`: `output: "export"`) served
  as plain files from Cloudflare Pages (`wrangler.jsonc` → `assets.directory:
  "./out"`, no Pages Functions/Workers configured). **There is no server at
  request time** — nothing can run per-visitor on the backend. Any live rate
  has to be fetched **client-side**, in the browser, after the static HTML
  loads.
- The dashboard app (`Sevenz/dashboard`) already solved "get the BCV rate"
  with two public, no-auth, CORS-friendly JSON APIs (`lib/exchange-rate/
  dolar-api-provider.ts` and `currency-api-provider.ts`). Reuse the same
  two sources here — **do not** point this site at the dashboard's Supabase
  project or any dashboard-internal endpoint; the two repos are and should
  stay independent (this site needs zero auth, zero database).

### Data sources (primary + fallback, same as the app)

1. **Primary**: `https://ve.dolarapi.com/v1/dolares/oficial` and
   `https://ve.dolarapi.com/v1/euros/oficial` — no auth, returns
   `{"promedio": <number>, "fechaActualizacion": "<ISO date>"}`.
2. **Fallback** (if primary fails/times out): `https://cdn.jsdelivr.net/npm/
   @fawazahmed0/currency-api@latest/v1/currencies/usd.json` and `.../eur.json`
   → read `data.usd.ves` / `data.eur.ves`.

**Before writing code**, confirm both actually send permissive CORS headers
for a browser `fetch()` from the `sevenz.site` origin (the dashboard calls
these server-side today, where CORS doesn't apply — this is the first
time either gets called from a browser). A one-line check:

```bash
curl -sI https://ve.dolarapi.com/v1/dolares/oficial | grep -i access-control
```

jsDelivr (the fallback) is a public CDN built for browser consumption and
will have permissive CORS; dolarapi.com is very likely fine too (it's a
public API already used by third-party frontends) but hasn't been verified
from a browser context yet — confirm before relying on it as primary.

## 4. Route, file layout, and SEO metadata

New route: **`/calculadora-dolar-bcv`** (matches how people actually search
— "calculadora dólar bcv" / "precio dólar bcv hoy" — more specific than a
generic `/calculadora` and less likely to collide with a future parallel-
rate page if one gets built later).

```
app/calculadora-dolar-bcv/
  page.tsx              # Server Component: metadata + static shell + <Calculator />
components/calculator/
  calculator.tsx         # "use client" — the interactive widget itself
  use-bcv-rate.ts        # client-side fetch hook (primary + fallback + loading/error state)
  convert.ts             # standalone conversion math (VES/USD/EUR), no dashboard import
lib/
  format.ts              # (may already have a currency formatter in lib/utils.ts — check first)
```

Follow the exact metadata pattern already used in `app/politica-de-
privacidad/page.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Calculadora de Dólar BCV Hoy — Convierte USD y EUR a Bolívares | Sevenz",
  description:
    "Calculadora gratuita del dólar BCV: convierte dólares y euros a bolívares con la tasa oficial del Banco Central de Venezuela, actualizada en tiempo real.",
  alternates: { canonical: "/calculadora-dolar-bcv" },
  openGraph: {
    title: "Calculadora de Dólar BCV Hoy",
    description: "Convierte USD y EUR a bolívares con la tasa oficial BCV, actualizada en tiempo real.",
    url: "https://sevenz.site/calculadora-dolar-bcv",
  },
};
```

Add the route to `app/sitemap.ts` (there's already a sitemap generator in
this repo — extend it, don't hardcode a second sitemap).

## 5. Conversion math (standalone, do not import across repos)

Reimplement a small, self-contained version of the dashboard's
`convertToAllCurrencies()` (`dashboard/lib/exchange-rate/convert.ts`) —
same logic, ~15 lines, but living in `Web/components/calculator/convert.ts`
with zero dependency on the dashboard package (these are two separate
repos/deploys; don't create a cross-repo import or a shared npm package for
something this small):

```ts
export type Currency = "VES" | "USD" | "EUR";
export type Rate = { usd: number; eur: number }; // Bs per 1 unit

export function convert(amount: number, from: Currency, rate: Rate) {
  const ves = from === "VES" ? amount : amount * (from === "USD" ? rate.usd : rate.eur);
  return {
    ves,
    usd: rate.usd ? ves / rate.usd : 0,
    eur: rate.eur ? ves / rate.eur : 0,
  };
}
```

Checked — `Web/lib/utils.ts` has no currency formatter today (just `cn()`).
Port the dashboard's `lib/exchange-rate/format.ts` formatters verbatim
(`formatBs`, `formatDisplayCurrency`) into the new `components/calculator/`
folder — same `Intl.NumberFormat("es-VE", …)` config, same literal `"Bs. "`
prefix (deliberately not the ICU `"VES"` currency code — see that file's
own comment on why).

## 6. UX spec

Mirrors the dashboard's existing "Calcular" widget
(`dashboard/components/dashboard/exchange-rate-strip.tsx`'s `RateCalculator`)
closely enough to feel like the same product, but as a full page section
instead of a popover/drawer:

- **Rate banner** at the top: `$1 = Bs. X` and `€1 = Bs. Y`, plus "Actualizado
  hace N minutos" (or the API's own `fechaActualizacion`).
- **Amount input** (digits-only mask, same pattern as `RateCalculator` —
  type digits, last two are always decimals) with a currency selector
  (VES / USD / EUR) for "convert **from**".
- **Live result**: the same amount shown in the other two currencies,
  updating on every keystroke — pure client-side arithmetic via `convert()`
  above, no network call per keystroke (only the rate itself is fetched,
  once, on page load).
- **Loading state**: skeleton/placeholder for the rate banner while the
  fetch is in flight; a short client-side timeout + fallback source per §3.
- **Error state**: if both sources fail, show a plain message ("No pudimos
  cargar la tasa en este momento — intenta de nuevo en unos minutos") rather
  than a broken/zero calculation.
- **Disclaimer**: reuse the exact wording from `dashboard/components/
  exchange-rate-legal-disclaimer.tsx` (the BCV-sourcing disclaimer already
  finalized this week) — same legal text, adapted only if needed since this
  page has no logged-in owner/business context:

  > Las tasas de cambio mostradas en Sevenz provienen de fuentes públicas
  > (Banco Central de Venezuela, vía proveedores externos). Sevenz no está
  > afiliado a ninguna entidad gubernamental ni fija tasas oficiales.

- **CTA section below the calculator**, same visual pattern as the existing
  `components/landing/cta.tsx`:

  > ¿Quieres llevar así de claras las cuentas de tu negocio con tus
  > clientes? [Regístrate gratis en Sevenz →]

## 7. Cheap homepage/footer teaser (optional, low cost)

Since a dedicated page only helps if people can also find it *from* the
site, not just from Google:
- Add a link to `/calculadora-dolar-bcv` in `components/landing/footer.tsx`'s
  nav row (same pattern as the existing Términos/Privacidad links).
- Optionally, one line in the `Hero` or `Header` ("Tasa BCV hoy: $1 = Bs. X
  →") — skip this for v1 unless you want to invest in it; the footer link
  alone is enough to not orphan the page from internal navigation.

## 8. Analytics (this site has none today — worth a minimal add)

`Web/` currently has **zero analytics wired up** (no Mixpanel, no GA,
nothing — confirmed by grep). For a page whose entire purpose is measuring
lead-magnet conversion, at minimum track:
- A page-view event on load.
- A click event on the CTA button.

Simplest option: reuse the same Mixpanel project the dashboard app already
uses (same product, same funnel — a visitor converting from this page into
a signup is one continuous journey worth seeing in one place), added as a
lightweight client-side snippet on just this page (not the whole site) to
avoid the cookie-consent-banner scope creop noted in the Privacy Policy
(`app/politica-de-privacidad/page.tsx` §6: Meta Pixel and paid-ads trackers
explicitly wait on a consent banner — first-party product analytics like
Mixpanel does not need to wait on that per the same policy's existing
carve-out for `app.sevenz.site`, but confirm that reasoning extends to the
public site before shipping, since §6 currently only mentions Mixpanel
"dentro de la aplicación").

## 9. Testing checklist before launch

- [ ] Confirm CORS on both rate APIs from an actual browser (§3), not curl.
- [ ] Load the page with JS disabled / view-source — confirm it doesn't show
      a broken/empty calculator (should at least show the disclaimer, CTA,
      and a "cargando tasa..." placeholder, not a crash).
- [ ] Fetch failure test: block both API domains (browser devtools request
      blocking) and confirm the error state (§6) renders instead of `NaN`/
      `Bs. undefined`.
- [ ] Mobile viewport check (this is the primary device for the target
      audience).
- [ ] `npm run build` succeeds with `output: "export"` (a client-fetched
      rate is fine at build time — nothing here needs server-side data
      fetching, unlike the optional enhancement in §10).
- [ ] New route appears in `app/sitemap.ts`'s output.

## 10. Optional future enhancement: build-time-baked initial rate

Not required for v1 (adds real complexity), flagging for later: because
this is a static export, the rate shown to a crawler or a JS-disabled
visitor is whatever the client-side fetch resolves to — there's no
server-rendered number in the initial HTML. A page like this could instead
fetch the rate **once at build time** (in the Server Component, since
`next build` still executes server-side data fetching once during the
build even with `output: "export"` — it's just never re-run per-request
afterward) to bake a real number into the static HTML, then hydrate and
refresh it client-side on load for freshness.

The catch: this site isn't on a rebuild schedule today — a baked-in rate
would go stale between deploys (could be weeks). This only makes sense
paired with a scheduled rebuild (e.g. a daily GitHub Action hitting
Cloudflare's deploy hook). Worth doing once the page is live and you want
to invest in its SEO durability — not a blocker for shipping v1.
