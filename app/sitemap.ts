import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { TEMAS } from "@/lib/soporte";

export const dynamic = "force-static";

// `lastModified` A MANO, NO `new Date()`.
//
// Hasta hoy las catorce URLs llevaban `new Date()`, así que cada despliegue
// —aunque solo tocara una coma del pie— le decía a Google que el sitio entero
// había cambiado ese día. Un `lastmod` que siempre dice "hoy" no aporta
// información: lo que consigue es que dejen de creerse el campo, y entonces
// tampoco sirve el día que algo cambia de verdad.
//
// La fecha se actualiza a mano cuando el contenido de esa página cambia. Es
// una línea por despliegue y es justo el trabajo que hace que el campo valga
// algo. La calculadora es la excepción legítima: su contenido son las tasas
// del BCV, y esas sí cambian todos los días solas.
const ULTIMA_EDICION = {
  portada: "2026-09-24", // rediseño v2
  legales: "2026-09-23", // MS-13: el resumen por WhatsApp en los legales
  ayuda: "2026-09-25", // /soporte pasó a /ayuda; los diez temas cambiaron de URL
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: ULTIMA_EDICION.portada,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/terminos-y-condiciones`,
      lastModified: ULTIMA_EDICION.legales,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/politica-de-privacidad`,
      lastModified: ULTIMA_EDICION.legales,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      // La única con fecha viva, y con razón: lo que esta página publica son
      // las tasas del día.
      url: `${SITE_URL}/calculadora-dolar-bcv`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ayuda`,
      lastModified: ULTIMA_EDICION.ayuda,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Las diez salen del mismo arreglo que las páginas, así que un tema nuevo
    // entra al sitemap sin que nadie tenga que acordarse de añadirlo.
    ...TEMAS.map((tema) => ({
      url: `${SITE_URL}/ayuda/${tema.slug}`,
      lastModified: ULTIMA_EDICION.ayuda,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
