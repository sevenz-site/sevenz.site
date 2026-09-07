// Copy que aparece en más de una página, escrito una sola vez.
//
// El titular y el párrafo de abajo estaban duplicados palabra por palabra entre
// el hero de la landing y el CTA de la calculadora. Eso no es un problema de
// estilo: es la clase de duplicado que se descubre meses después, cuando
// alguien mejora el titular en un sitio y el otro se queda con el viejo sin que
// nadie lo note. El mismo día que se escribió este archivo, un bug de fechas
// vivía en dos repos y hubo que arreglarlo dos veces.
//
// Se comparte el TEXTO, no el marcado. La landing lo pinta como <h1> a
// text-4xl/6xl porque es lo primero de la página; la calculadora lo pinta como
// <h2> más pequeño porque llega después de la herramienta. Esa diferencia es
// correcta y forzar un componente común la habría convertido en una pelea de
// props.

export const FIADO_HEADLINE = "¿Sabes cuánto te deben del fiado, ahorita mismo?";

export const FIADO_SUBHEAD =
  "Tu libreta lo sabe. Tu cliente no — y ahí empieza el peo. Sevenz pone el mismo número frente a los dos, sin tanta vaina y sin pelea.";
