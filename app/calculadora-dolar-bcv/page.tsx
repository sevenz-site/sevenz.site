import type { Metadata } from "next";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Calculator } from "@/components/calculator/calculator";
import { RateHistoryTable } from "@/components/calculator/rate-history-table";
import { SIGNUP_URL, SITE_URL } from "@/lib/config";
import { FIADO_HEADLINE, FIADO_SUBHEAD } from "@/lib/copy";
import { ProductShot } from "@/components/landing/product-shot";

export const metadata: Metadata = {
  title: "Calculadora de Dólar BCV Hoy — Convierte USD y EUR a Bolívares | Sevenz",
  description:
    "Calculadora gratuita del dólar BCV: convierte dólares y euros a bolívares con la tasa oficial del Banco Central de Venezuela, actualizada en tiempo real.",
  alternates: { canonical: "/calculadora-dolar-bcv" },
  openGraph: {
    title: "Calculadora de Dólar BCV Hoy",
    description: "Convierte USD y EUR a bolívares con la tasa oficial BCV, actualizada en tiempo real.",
    url: "/calculadora-dolar-bcv",
  },
};

export default function CalculadoraDolarBcvPage() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-col items-center border-b px-6 py-24 text-center">
          <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
            Tasa BCV
          </p>
          <h1 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-balance sm:text-4xl">
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

          <p className="mt-8 max-w-md text-xs text-muted-foreground">
            Las tasas de cambio mostradas en Sevenz provienen de fuentes públicas (Banco Central de
            Venezuela, vía proveedores externos). Sevenz no está afiliado a ninguna entidad
            gubernamental ni fija tasas oficiales.
          </p>
        </section>

        <section className="flex flex-col items-center px-6 py-28 text-center">
          {/* Mismo titular y párrafo que el hero de la landing, leídos de
              lib/copy.ts para que no puedan separarse. Aquí es un h2 y más
              pequeño: en la landing es lo primero que se ve, aquí llega después
              de la calculadora, que es a lo que vino la visita. */}
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {FIADO_HEADLINE}
          </h2>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">{FIADO_SUBHEAD}</p>

          <div className="mt-12 flex w-full max-w-2xl flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Así pueden ver tus clientes sus cuentas del fiado
            </p>
            <ProductShot
              src="/screens/asi-ven-tus-clientes-sus-cuentas-de-fiado-en-sevenz.png"
              alt="Así ven tus clientes sus cuentas del fiado en Sevenz"
              width={1920}
              height={1080}
            />
            {/* Ancho completo dentro del mismo contenedor que la imagen, para
                que botón y captura compartan borde izquierdo y derecho. */}
            <Button asChild size="lg" className="mt-5 w-full">
              <a href={SIGNUP_URL}>Regístrate gratis</a>
            </Button>
          </div>
          {/* Secondary on purpose: someone who landed here from a Google search
              for the BCV rate may not be ready to sign up, and sending them to
              the home page is a better second option than losing them. Plain
              underlined link rather than a second button, so it never competes
              with "Regístrate gratis" for the same glance. */}
          <a
            href={SITE_URL}
            className="mt-8 text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
          >
            Conocer más
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
