// IS THIS RATE BELIEVABLE? A copy of the app's `lib/exchange-rate/rate-guard.ts`, because the
// two repos share no code. On 2026-11-05 the official euro crossed Bs. 1.000 and the provider
// answered 1,006. The euro has stayed between 0,82 and 1,60 dollars since it exists, so
// anything outside this band is a broken number and not a market move.
//
// The floor is for the day the dollar crosses Bs. 1.000 too: 1,002 and 1,120 make a perfect
// ratio, and this page has no previous row to compare with. With it, the page falls to the
// other source instead of showing $1 = Bs. 1,00.
const MIN_EUR_PER_USD = 0.7;
const MAX_EUR_PER_USD = 1.6;
export const MIN_BS_PER_USD = 100;

export function usdIsPlausible(usd: number): boolean {
  return Number.isFinite(usd) && usd >= MIN_BS_PER_USD;
}

export function eurIsPlausible(usd: number, eur: number): boolean {
  if (!usdIsPlausible(usd) || !Number.isFinite(eur) || eur <= 0) return false;
  const ratio = eur / usd;
  return ratio >= MIN_EUR_PER_USD && ratio <= MAX_EUR_PER_USD;
}
