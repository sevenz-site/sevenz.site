// The commercial offer, written ONCE.
//
// WHY THIS FILE EXISTS. Before the proposals, the price lived in four places
// that had to agree and were never checked against each other: the pricing
// card, the FAQ answer, the JSON-LD in `app/layout.tsx` (what Google may show
// as THE price) and the Terms. They have already drifted twice -- the FAQ said
// 30 while the card said 20, and the JSON-LD said 0 -- and every time it was
// found by accident. The proposals read their numbers from here, so the day
// the offer changes it changes in one file.
//
// ---------------------------------------------------------------------------
// DECIDED BY THE OWNER ON 2026-10-31, and now read by the LIVE site too
//
// The figures come from the November flyer (`VE-Nov-2026-5.pdf`, last
// modified 2026-10-22): "3 meses gratis. Después: ~~35 USD~~ 19.50 USD
// mensuales". Asked as a straight choice between keeping «desde 20 USD» and
// this, the owner chose «19,50 USD fijo (antes 35)». The 3 months were already
// decided the same day, and the app enforces them (dashboard migration 171).
//
// So `components/landing/pricing.tsx`, `faq.tsx` and the JSON-LD of
// `app/layout.tsx` import from here instead of writing the numbers by hand.
//
// WHAT IT DISPLACES: the site used to say «desde» because the price was
// negotiated per business (`subscriptions.precio_pactado_usd`, "entre 15 y
// 30 USD" in migration 057; Pro accounts at 20 and 25 in dev on 2026-09-28).
// A published fixed price is a tariff. How the businesses that already agreed
// a different price are treated is written in the Terms, not here.
//
// ---------------------------------------------------------------------------
// WHAT IS DELIBERATELY NOT HERE: A DISCOUNT PERCENTAGE
//
// The flyer prints "Ahorra 45%". 35 -> 19,50 is a 44,3% reduction, so the
// figure is a rounding up of one point on a price page. The proposals show the
// two prices and let the reader do the sum.
export const OFFER = {
  freeMonths: 3,
  listPriceUsd: 35,
  monthlyPriceUsd: 19.5,
} as const;

/** "19,50" -- comma decimal, no thousands separator, deterministic on server and client. */
export function formatUsd(amount: number): string {
  return amount.toFixed(2).replace(".", ",");
}
