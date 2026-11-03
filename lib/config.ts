export const APP_URL = "https://app.sevenz.site";
export const SIGNUP_URL = `${APP_URL}/signup`;
export const LOGIN_URL = `${APP_URL}/login`;

export const SITE_URL = "https://sevenz.site";

// Las redes de Sevenz, enlazadas desde el pie.
//
// Facebook va por la URL larga con el id numérico porque es la que la propia
// página devuelve: no hay nombre de usuario corto reservado, y un /Sevenz a
// secas lleva a otra cuenta.
export const INSTAGRAM_URL = "https://www.instagram.com/sevenz.site";
export const FACEBOOK_URL = "https://www.facebook.com/people/Sevenz/61594903977079/";

// El WhatsApp de Sevenz para quien llega a la web y quiere saber más. Solo
// dígitos, que es lo que `wa.me` acepta: ni "+", ni espacios, ni guiones.
export const SUPPORT_WHATSAPP = "573238130265";

// El mensaje ya escrito. No es adorno: sin él llega un "Hola" suelto y hay
// que preguntar de dónde sale la persona; con él, el primer mensaje ya dice
// qué quiere y desde dónde escribe.
export const SUPPORT_WHATSAPP_MESSAGE = "Hola, vi Sevenz en la web y quiero saber más.";

// La imagen que se ve cuando alguien comparte un enlace de sevenz.site.
//
// VIVE AQUÍ Y NO EN EL LAYOUT porque hay que repetirla en cada página que
// declare su propio `openGraph`. Y hay que repetirla por una razón que no es
// evidente: **Next NO hereda `images` del layout cuando una página declara
// `openGraph`**. Declara el bloque y pierdes la imagen entera, en silencio —
// no falla el build, no lo dice el navegador, solo desaparece la vista previa.
//
// Así llevaba la calculadora desde que se escribió: con `openGraph` propio y
// sin imagen. Es la página que más tráfico de buscadores trae, y cada vez que
// alguien compartía la tasa del BCV por WhatsApp salía un enlace pelado.
// Descubierto el 2026-09-24 comprobando el HTML servido, no leyendo el código.
//
// 1200×630 es lo que recortan las vistas previas sociales.
//
// Since web v3 (2026-11-03) this is the home hero itself, captured at 1200×630
// with the header links and the floating «Soporte» hidden: the previous image
// showed the calculator, the portfolio and the score, none of which is what the
// new home leads with. PNG and not WebP: not every link-preview crawler reads
// WebP. The old file stays in `public/og/` so links already cached by WhatsApp
// do not break.
export const OG_IMAGE = {
  url: "/og/sevenz-portada.png",
  width: 1200,
  height: 630,
  alt: "Sevenz: lo que vendes y lo que te deben en una sola app, en bolívares, dólares, USDT y euros",
} as const;
