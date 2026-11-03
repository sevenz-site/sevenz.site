import type { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { ClosingCallToAction } from "@/components/home/notebook";
import { RevealRoot } from "@/components/home/reveal";
import { Calculator } from "@/components/calculator/calculator";
import { RateHistoryTable } from "@/components/calculator/rate-history-table";
import { OG_IMAGE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Calculadora de Dólar BCV Hoy — Convierte USD y EUR a Bolívares | Sevenz",
  description:
    "Calculadora gratuita del dólar BCV: convierte dólares y euros a bolívares con la tasa oficial del Banco Central de Venezuela, actualizada en tiempo real.",
  alternates: { canonical: "/calculadora-dolar-bcv" },
  openGraph: {
    title: "Calculadora de Dólar BCV Hoy",
    description: "Convierte USD y EUR a bolívares con la tasa oficial BCV, actualizada en tiempo real.",
    url: "/calculadora-dolar-bcv",
    images: [OG_IMAGE],
  },
};

export default function CalculadoraDolarBcvPage() {
  return (
    <>
      <RevealRoot />
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center border-b px-6 py-24 text-center">
          <p className="font-mono text-eyebrow text-subtle">
            Tasa BCV
          </p>
          <h1 className="text-display md:text-display-lg mt-5 max-w-2xl text-balance">
            Calculadora de Dólar BCV Hoy
          </h1>
          <p className="mt-4 max-w-sm text-muted-foreground">
            Convierte dólares y euros a bolívares con la tasa oficial del Banco Central de
            Venezuela.
          </p>

          <div className="mt-10 w-full">
            <Calculator />
          </div>

          <div className="mt-6 w-full max-w-sm">
            <RateHistoryTable />
          </div>

          {/* Menciona el USDT sin condición, a diferencia del aviso del
              dashboard, que lo hace solo si hay precio.
              Aquí el párrafo está en el HTML estático —esta web es un export—
              y el precio llega después, desde el navegador. Condicionarlo
              haría que el aviso legal apareciera y desapareciera bajo el
              visitante, y un texto legal que parpadea es peor que uno que
              nombra una pestaña que hoy no cargó. */}
          <p className="mt-8 max-w-md text-xs text-muted-foreground">
            Las tasas de cambio mostradas en Sevenz provienen de fuentes públicas (Banco Central de
            Venezuela, vía proveedores externos), salvo el precio del USDT, que es el del mercado
            P2P de Binance y no una tasa oficial. Sevenz no está afiliado a ninguna entidad
            gubernamental ni fija tasas oficiales.
          </p>
        </section>

        {/* The home page's closing block, the same component (owner's request,
            2026-11-03: «cambia la sección "¿Sabes cuánto te deben del fiado,
            ahorita mismo?" por "¡Cuentas claras sin tanta vaina!" misma de la
            web que está antes del footer»). It replaced the fiado headline,
            the three-phone capture and the «Conocer más» link: one component,
            so the two pages cannot drift apart. */}
        <ClosingCallToAction />
      </main>
      <Footer />
    </>
  );
}
