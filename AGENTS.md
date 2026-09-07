<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Componentes duplicados con el dashboard

La calculadora de esta página es una **copia** del `RateCalculator` que vive en
`components/dashboard/exchange-rate-strip.tsx` del repo `Sevenz/dashboard`. No
es un import: los dos repos se despliegan por separado (esta web es un export
estático en Cloudflare, el dashboard corre en Vercel) y no hay paquete
compartido entre ellos.

Archivos que hoy existen dos veces, uno aquí y otro allá:

| Aquí | Allá |
|---|---|
| `components/calculator/calculator.tsx` (`RateConverter`) | `components/dashboard/exchange-rate-strip.tsx` (`RateCalculator`) |
| `components/ui/input.tsx` | `components/ui/input.tsx` |
| `components/calculator/convert.ts` (`convert`) | `lib/exchange-rate/convert.ts` (`convertToAllCurrencies`) |
| `components/calculator/format.ts` | `lib/exchange-rate/format.ts` |
| `components/calculator/use-bcv-rate.ts` | `lib/exchange-rate/dolar-api-provider.ts` |

**Si tocas cualquiera de estos, el mismo cambio casi seguro se debe allá.** Esto
no es teórico: el 2026-09-07 la calculadora etiquetaba la tasa con la hora en
que se consultó en vez de con el día al que pertenece — *"Tasa BCV del 6 sept."*
para una tasa del viernes 4, un día en el que el BCV no publicó nada. El bug
vivía en los dos repos y hubo que arreglarlo dos veces.

Lo que **no** se copia, y no debe copiarse: el dashboard envuelve su calculadora
en un Popover (escritorio) o un Sheet (teléfono) detrás de un botón "Calcular".
Aquí la calculadora *es* la página y va en línea.

Diferencia real de comportamiento, no un descuido: esta página siempre pide la
tasa en vivo, así que la suya es por definición la más reciente publicada y una
fecha que no es la de hoy solo puede significar que el BCV no publicó. El
dashboard lee una copia guardada, tiene una segunda causa posible (que su propia
consulta falle) y tiene que distinguirlas antes de afirmar cualquiera de las dos.
