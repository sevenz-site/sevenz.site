import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { OG_IMAGE, SITE_URL } from "@/lib/config";
import { WhatsappFloat } from "@/components/landing/whatsapp-float";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Sevenz – Controla el Fiado de tu Negocio sin Vaina";

// "bodegas y comercios" entra aquí a propósito.
//
// En la v1 esas palabras estaban en el `<h1>`. El mockup v2 las baja al
// rótulo de encima, que es un `<p>`, y el `<h1>` pasa a ser la pregunta
// ("¿Sabes cuánto te deben del fiado, ahorita mismo?"). Es mejor titular y
// peor ancla: son los términos por los que alguien busca esto. Meterlos de
// vuelta en el `<h1>` estropearía el titular y, leído en voz alta, sonaría a
// dos frases pegadas — así que viven en la descripción, que es donde no
// estorban a nadie y siguen contando.
const DESCRIPTION =
  "Controla el fiado de tu bodega o comercio. Con Sevenz tu cliente ve su saldo por WhatsApp, en tiempo real. Cero libreta, cero peleas.";


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Sevenz",
    locale: "es_VE",
    // Venezuela es el mercado de partida y por eso sigue siendo el principal,
    // pero en producción ya hay dueños colombianos: declarar solo es_VE le
    // dice a quien lo lea que esto no es para ellos.
    alternateLocale: ["es_CO"],
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {/* Fuera de <main>, como la barra de progreso: flota sobre todas las
            páginas y no forma parte del contenido de ninguna. */}
        <WhatsappFloat />
        {/* Dos esquemas en un `@graph`, no dos etiquetas sueltas: así quedan
            enlazados por `@id` y Google entiende que la aplicación la publica
            esa organización, en vez de tratarlos como dos cosas sin relación.

            EL PRECIO TIENE QUE COINCIDIR CON EL QUE SE VE. Hasta hoy esto
            decía `price: "0"` mientras la página decía 30, y ahora la página
            dice 20: un desajuste entre los datos estructurados y el contenido
            visible es motivo de penalización, y además es de las cosas que
            nadie mira porque no se ven en pantalla. Si el precio de
            `pricing.tsx` vuelve a cambiar, cambia aquí en el mismo commit. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organizacion`,
                  name: "Sevenz",
                  url: SITE_URL,
                  logo: `${SITE_URL}/icon-512.png`,
                  description: DESCRIPTION,
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": `${SITE_URL}/#app`,
                  name: "Sevenz",
                  applicationCategory: "FinanceApplication",
                  operatingSystem: "Web",
                  url: SITE_URL,
                  description: DESCRIPTION,
                  publisher: { "@id": `${SITE_URL}/#organizacion` },
                  offers: {
                    "@type": "Offer",
                    price: "20",
                    priceCurrency: "USD",
                    description: "Prueba gratis 2 meses. Después, 20 USD al mes.",
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: "20",
                      priceCurrency: "USD",
                      // Un mes, en el código de unidad de la ONU que espera
                      // schema.org. Sin esto, "20 USD" no dice cada cuánto.
                      referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: 1,
                        unitCode: "MON",
                      },
                    },
                  },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "y535d4fru1");`}
        </Script>
      </body>
    </html>
  );
}
