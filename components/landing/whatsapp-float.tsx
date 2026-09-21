import { SUPPORT_WHATSAPP, SUPPORT_WHATSAPP_MESSAGE } from "@/lib/config";

// El botón flotante de "Más info" por WhatsApp, abajo a la derecha.
//
// PARA QUÉ ESTÁ. Quien llega a sevenz.site y quiere saber más hoy solo puede
// registrarse o leer. Registrarse es mucho pedir antes de entender qué es
// esto, y leer no resuelve la duda concreta de un tendero. WhatsApp sí: es
// donde ya está, y es donde el producto entero vive.
//
// ─────────────────────────────────────────────────────────────────────────
// LO QUE NO ES: no es un chat. Es un enlace `wa.me` que abre la aplicación
// del visitante con un mensaje escrito. No hay widget, no hay script de
// terceros, no se carga nada y no se mide nada aquí — el peso en la página es
// el de un <a> y un <svg>.
//
// VA EN EL LAYOUT, NO EN LA LANDING. Sale también en la calculadora del BCV,
// en Soporte y en los legales. La calculadora es la que más visitas trae de
// buscadores y es justo tráfico que no conoce Sevenz; Soporte es literalmente
// gente con una pregunta. Dejarlo solo en la portada lo escondería de las dos.

// El aire de abajo se mide contra la barra del iPhone, no contra cero.
// `env(safe-area-inset-bottom)` vale 0 en un escritorio y 34px en un iPhone
// con el indicador de inicio, y sin esto el botón se le monta encima: se
// puede ver y no se puede tocar, que es la peor de las dos.
const POSICION = {
  bottom: "max(1rem, env(safe-area-inset-bottom, 0px))",
  right: "max(1rem, env(safe-area-inset-right, 0px))",
} as const;

export function WhatsappFloat() {
  return (
    <a
      href={`https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(SUPPORT_WHATSAPP_MESSAGE)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Más info por WhatsApp"
      style={POSICION}
      // z-40, el mismo que la cabecera pegajosa: nunca coinciden en pantalla
      // —una arriba y otro abajo— y así ninguno de los dos tapa la barra de
      // progreso de lectura, que va en z-50.
      //
      // `focus-visible` con dos anillos: el botón es casi negro y sobre un
      // fondo claro un anillo oscuro no se distingue del propio botón. El
      // blanco de dentro lo separa.
      className="fixed z-40 inline-flex items-center gap-3 rounded-full bg-[#272727] py-2 pr-2 pl-5 text-white shadow-lg transition-transform hover:scale-[1.03] focus-visible:ring-2 focus-visible:ring-[#272727] focus-visible:ring-offset-2 focus-visible:outline-none motion-reduce:transition-none motion-reduce:hover:scale-100"
    >
      <span className="text-base font-medium">Más info</span>
      {/* El círculo verde es de WhatsApp, así que su verde es el de WhatsApp
          (#25D366) y no un token de Sevenz: aquí el color ES la señal de a
          dónde lleva el botón, no decoración de marca. Por lo mismo el dibujo
          va en blanco fijo y no en `currentColor` como el de la app — allí el
          icono acompaña a un texto verde sobre fondo claro; aquí vive dentro
          de un círculo verde que no cambia con nada. */}
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
        {/* 21×24 es el lienzo del archivo de diseño y no se cuadra: con
            `size-5` la caja mide 20×20 y el dibujo entra centrado sin
            deformarse, porque `preserveAspectRatio` vale `xMidYMid meet`. */}
        <svg viewBox="0 0 21 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="size-5">
          <path
            d="M17.8547 4.55156C15.8906 2.58281 13.275 1.5 10.4953 1.5C4.75781 1.5 0.0890625 6.16875 0.0890625 11.9062C0.0890625 13.7391 0.567188 15.5297 1.47656 17.1094L0 22.5L5.51719 21.0516C7.03594 21.8813 8.74687 22.3172 10.4906 22.3172H10.4953C16.2281 22.3172 21 17.6484 21 11.9109C21 9.13125 19.8188 6.52031 17.8547 4.55156ZM10.4953 20.5641C8.93906 20.5641 7.41562 20.1469 6.08906 19.3594L5.775 19.1719L2.50313 20.0297L3.375 16.8375L3.16875 16.5094C2.30156 15.1313 1.84688 13.5422 1.84688 11.9062C1.84688 7.13906 5.72812 3.25781 10.5 3.25781C12.8109 3.25781 14.9812 4.15781 16.6125 5.79375C18.2437 7.42969 19.2469 9.6 19.2422 11.9109C19.2422 16.6828 15.2625 20.5641 10.4953 20.5641ZM15.2391 14.0859C14.9813 13.9547 13.7016 13.3266 13.4625 13.2422C13.2234 13.1531 13.05 13.1109 12.8766 13.3734C12.7031 13.6359 12.2063 14.2172 12.0516 14.3953C11.9016 14.5688 11.7469 14.5922 11.4891 14.4609C9.96094 13.6969 8.95781 13.0969 7.95 11.3672C7.68281 10.9078 8.21719 10.9406 8.71406 9.94687C8.79844 9.77344 8.75625 9.62344 8.69062 9.49219C8.625 9.36094 8.10469 8.08125 7.88906 7.56094C7.67813 7.05469 7.4625 7.125 7.30313 7.11563C7.15313 7.10625 6.97969 7.10625 6.80625 7.10625C6.63281 7.10625 6.35156 7.17188 6.1125 7.42969C5.87344 7.69219 5.20312 8.32031 5.20312 9.6C5.20312 10.8797 6.13594 12.1172 6.2625 12.2906C6.39375 12.4641 8.09531 15.0891 10.7062 16.2188C12.3562 16.9312 13.0031 16.9922 13.8281 16.8703C14.3297 16.7953 15.3656 16.2422 15.5812 15.6328C15.7969 15.0234 15.7969 14.5031 15.7313 14.3953C15.6703 14.2781 15.4969 14.2125 15.2391 14.0859Z"
            fill="#FFFFFF"
          />
        </svg>
      </span>
    </a>
  );
}
