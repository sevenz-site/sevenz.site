import type { Metadata } from "next";
import Script from "next/script";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Calculator } from "@/components/calculator/calculator";
import { SIGNUP_URL } from "@/lib/config";

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

          <p className="mt-8 max-w-md text-xs text-muted-foreground">
            Las tasas de cambio mostradas en Sevenz provienen de fuentes públicas (Banco Central de
            Venezuela, vía proveedores externos). Sevenz no está afiliado a ninguna entidad
            gubernamental ni fija tasas oficiales.
          </p>
        </section>

        <section className="flex flex-col items-center px-6 py-28 text-center">
          <p className="font-mono text-xs tracking-[0.14em] text-muted-foreground uppercase">
            Y en tu negocio
          </p>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            ¿Quieres llevar así de claras las cuentas de tu negocio con tus clientes?
          </h2>
          <Button asChild size="lg" className="mt-9">
            <a href={SIGNUP_URL}>Regístrate gratis en Sevenz →</a>
          </Button>
          <p className="mt-4 font-mono text-xs text-muted-foreground/70">
            ¡Controla el fiado de tu negocio sin vaina!
          </p>
        </section>
      </main>
      <Footer />
      <Script id="microsoft-clarity-calculadora" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "qnrsa90xy5");`}
      </Script>
    </>
  );
}
