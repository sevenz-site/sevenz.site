import type { Metadata } from "next";
import Image from "next/image";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Calculator } from "@/components/calculator/calculator";
import { RateHistoryTable } from "@/components/calculator/rate-history-table";
import { OG_IMAGE, SIGNUP_URL, SITE_URL } from "@/lib/config";
import { FIADO_HEADLINE, FIADO_SUBHEAD } from "@/lib/copy";

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
          <h2 className="text-display md:text-display-lg max-w-2xl text-balance">
            {FIADO_HEADLINE}
          </h2>
          <p className="mt-5 max-w-lg text-lg text-muted-foreground">{FIADO_SUBHEAD}</p>

          <div className="mt-12 flex w-full max-w-3xl flex-col items-center gap-4">
            {/* El pie cambió con la imagen, y tenía que cambiar: el anterior
                decía "Así pueden ver tus clientes sus cuentas del fiado" y
                enseñaba la vista del cliente. Esta captura enseña la del
                dueño. Dejar el pie viejo describiría una pantalla que ya no
                está — que es peor que no poner pie.

                Y dice lo que a esta visita le importa: quien llega aquí buscó
                la tasa del BCV en Google, no Sevenz. El argumento es que la
                tasa que acaba de consultar vive dentro del producto, al lado
                de lo que le deben. */}
            <p className="text-sm text-muted-foreground">
              La misma tasa, dentro de Sevenz y al lado de tu cartera
            </p>
            {/* Sin marco: es un recorte de teléfonos sobre transparencia, y un
                borde con sombra dibujaría una caja rectangular donde no hay
                ninguna. Mismo criterio que en el hero de la portada. */}
            <Image
              src="/screens/sevenz-calculadora-balance-cartera-puntaje-credito.png"
              alt="La app de Sevenz en tres teléfonos: la calculadora del dólar BCV, el capital por cobrar en dólares y euros, y el puntaje de crédito de un cliente"
              width={1208}
              height={1072}
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-auto w-full"
            />
            <Button asChild size="lg" className="mt-5 h-13 rounded-lg text-base">
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
