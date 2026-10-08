import { FACEBOOK_URL, INSTAGRAM_URL } from "@/lib/config";

// LAS REDES, DEBAJO DE LOS ENLACES DEL PIE.
//
// Archivo propio y no dentro de `footer.tsx` por una razón de lectura: los
// trazados de estos dos iconos ocupan más que todo el pie junto, y ahí dentro
// enterrarían los comentarios que explican por qué el pie mide lo que mide.
//
// ─────────────────────────────────────────────────────────────────────────
// `currentColor`, NO EL #272727 QUE TRAÍAN
//
// Los dos SVG salieron de diseño con el color escrito dentro. Esta web tiene
// un bloque `.dark` en `globals.css`, así que un hex clavado aquí es un glifo
// oscuro sobre fondo oscuro el día que ese tema se use — y el fallo no sería
// "los iconos están mal de color", sería "los iconos no están". Heredando el
// color siguen el mismo camino que el texto que tienen al lado.
//
// Los originales, tal cual los mandó diseño, viven en
// `Illustrations/icons-rrss/`. Si cambian ahí, cambian aquí.
//
// Se quitó el `<clipPath>` que traía el export de Figma: recortaba a un rect
// de 24x24 dentro de un `viewBox` de 24x24, o sea a nada. Lo que sí evita
// quitarlo es que dos iconos con el mismo id de clip acaben pisándose.
function Instagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6">
      <path d="M8.00064 12C8.00064 9.79104 9.79104 7.99968 12 7.99968C14.209 7.99968 16.0003 9.79104 16.0003 12C16.0003 14.209 14.209 16.0003 12 16.0003C9.79104 16.0003 8.00064 14.209 8.00064 12ZM5.83776 12C5.83776 15.4032 8.5968 18.1622 12 18.1622C15.4032 18.1622 18.1622 15.4032 18.1622 12C18.1622 8.5968 15.4032 5.83776 12 5.83776C8.5968 5.83776 5.83776 8.5968 5.83776 12ZM16.9661 5.59392C16.9661 6.3888 17.6102 7.03392 18.4061 7.03392C19.201 7.03392 19.8461 6.3888 19.8461 5.59392C19.8461 4.79904 19.2019 4.15488 18.4061 4.15488C17.6102 4.15488 16.9661 4.79904 16.9661 5.59392ZM7.152 21.768C5.98176 21.7142 5.34624 21.5203 4.92384 21.3552C4.3632 21.1373 3.96384 20.8771 3.54336 20.4576C3.12384 20.0381 2.86272 19.6387 2.64576 19.0781C2.48064 18.6557 2.28576 18.0192 2.23296 16.8499C2.1744 15.5846 2.16288 15.2054 2.16288 12.001C2.16288 8.79648 2.17536 8.41728 2.23296 7.152C2.28672 5.98176 2.4816 5.3472 2.64576 4.92384C2.86368 4.3632 3.12384 3.96384 3.54336 3.54336C3.96288 3.12384 4.36224 2.86272 4.92384 2.64576C5.34624 2.48064 5.98272 2.28576 7.152 2.23296C8.41728 2.1744 8.79648 2.16288 12 2.16288C15.2045 2.16288 15.5837 2.17536 16.849 2.23296C18.0192 2.28672 18.6538 2.4816 19.0771 2.64576C19.6378 2.86272 20.0371 3.12384 20.4576 3.54336C20.8771 3.96288 21.1373 4.3632 21.3552 4.92384C21.5203 5.34624 21.7152 5.98272 21.768 7.152C21.8266 8.41824 21.8381 8.79648 21.8381 12.001C21.8381 15.2045 21.8266 15.5846 21.768 16.8499C21.7142 18.0202 21.5194 18.6557 21.3552 19.0781C21.1373 19.6387 20.8771 20.0381 20.4576 20.4576C20.0381 20.8771 19.6378 21.1373 19.0771 21.3552C18.6547 21.5203 18.0182 21.7152 16.849 21.768C15.5837 21.8266 15.2045 21.8381 12 21.8381C8.79648 21.8371 8.41632 21.8256 7.152 21.768ZM7.05312 0.07296C5.77536 0.13152 4.90368 0.33408 4.14048 0.63072C3.35136 0.93696 2.68224 1.34784 2.01504 2.01504C1.34688 2.68128 0.936 3.34944 0.62976 4.13952C0.33312 4.90272 0.13056 5.7744 0.072 7.05216C0.01344 8.33184 0 8.7408 0 12C0 15.2592 0.01344 15.6682 0.07296 16.9469C0.13152 18.2246 0.33408 19.0963 0.63072 19.8595C0.93696 20.6486 1.34688 21.3187 2.01504 21.985C2.68224 22.6522 3.3504 23.0621 4.14048 23.3693C4.90464 23.6659 5.77536 23.8685 7.05312 23.927C8.33376 23.9856 8.74176 24 12 24C15.2602 24 15.6682 23.9866 16.9469 23.927C18.2246 23.8685 19.0963 23.6659 19.8595 23.3693C20.6486 23.0621 21.3178 22.6522 21.985 21.985C22.6522 21.3178 23.0621 20.6486 23.3693 19.8595C23.6659 19.0963 23.8694 18.2246 23.927 16.9469C23.9856 15.6662 23.999 15.2582 23.999 12C23.999 8.74176 23.9856 8.33184 23.927 7.05312C23.8685 5.77536 23.6659 4.90368 23.3693 4.14048C23.0621 3.35136 22.6522 2.68224 21.985 2.01504C21.3178 1.34784 20.6486 0.93696 19.8605 0.63072C19.0963 0.33408 18.2246 0.13056 16.9478 0.07296C15.6691 0.0144 15.2602 0 12.001 0C8.7408 0 8.3328 0.01344 7.05312 0.07296Z" fill="currentColor"/>
    </svg>
  );
}

function Facebook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-6">
      <path fillRule="evenodd" clipRule="evenodd" d="M12.5417 23.9883C12.5012 23.9901 12.4606 23.992 12.4219 23.9938C12.4624 23.992 12.503 23.9901 12.5417 23.9883Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.3596 23.9961C12.3171 23.9979 12.2729 23.9979 12.2305 23.9998C12.2729 23.9979 12.3153 23.9979 12.3596 23.9961Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.7399 23.9766C12.6938 23.9803 12.6477 23.9821 12.6016 23.9839C12.6477 23.9821 12.6938 23.9784 12.7399 23.9766Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.9317 23.9648C12.9096 23.9667 12.8893 23.9685 12.8672 23.9685C12.8893 23.9667 12.9114 23.9648 12.9317 23.9648Z" fill="currentColor"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37206 0 0 5.37206 0 12C0 18.5265 5.20793 23.834 11.6957 23.9963C10.9949 23.9779 10.3071 23.9004 9.64131 23.7676V14.6298H7.68465V11.3675H9.64131V9.40894C9.64131 6.74781 10.7478 5.16551 13.8866 5.16551H16.5016V8.42785H14.8677C13.645 8.42785 13.5639 8.8852 13.5639 9.73536L13.5602 11.3675H16.5201L16.1734 14.6298H13.5602V23.8986C19.4504 23.1332 24 18.0987 24 12C24 5.37206 18.6279 0 12 0Z" fill="currentColor"/>
    </svg>
  );
}

export function SocialLinks() {
  return (
    // `text-foreground` y no `text-muted-foreground`: en el mockup los iconos
    // son del negro del texto principal, más oscuros que los enlaces de
    // encima. El hover baja la opacidad en vez de aclarar el color, porque un
    // enlace que ya está en el tono más oscuro no tiene a dónde oscurecerse.
    <div className="flex items-center justify-center gap-3">
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        // El nombre de la red va en el `aria-label` y no en pantalla: el icono
        // dice cuál es a quien lo ve, y quien no lo ve necesita oírlo.
        aria-label="Sevenz en Instagram"
        className="rounded-sm p-1 text-foreground transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Instagram />
      </a>
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Sevenz en Facebook"
        className="rounded-sm p-1 text-foreground transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        <Facebook />
      </a>
    </div>
  );
}
