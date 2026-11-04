// Los catorce temas de la guía, escritos una sola vez.
//
// El índice y la página de cada tema salen de aquí, así que no pueden
// separarse: si mañana cambia un paso, cambia en los dos sitios a la vez.
//
// En los textos, `[[Agregar fiado]]` marca un botón o un campo tal como se lee
// en pantalla. Se guarda así, y no como JSX, para que este archivo siga siendo
// datos: se puede recorrer, buscar y contar sin renderizar nada.
//
// Rewritten against the app as it is on 2026-11-03 (owner's request: «no veo
// la sección de catálogo ni reportes»). Every label below was READ off the dev
// app, step by step, with the demo business — not carried over from the old
// guide, which still described the payment form before it became its own
// screen, and the share button as «Mensaje copiado», which is only the desktop
// fallback. Slugs of the old topics are kept so links already indexed by
// Google keep working, even where the title changed.
//
// `imagen` is a capture in `public/ayuda/<slug>/<n>.webp`, taken by
// `dashboard/scripts/ayuda/temas/*.mjs` on a 375px phone with a ring on the control
// the step talks about. A step without one is a step that could not be
// captured, and says why in a comment next to it.

export type Grupo = "diario" | "ocasional" | "una-vez";

export const GRUPOS: { id: Grupo; label: string }[] = [
  { id: "diario", label: "Todos los días" },
  { id: "ocasional", label: "De vez en cuando" },
  { id: "una-vez", label: "Una vez, o casi" },
];

export type Paso = { texto: string; pista?: string; imagen?: string };
export type Nota = { titulo: string; texto: string; cuidado?: boolean };

export type Tema = {
  slug: string;
  numero: number;
  grupo: Grupo;
  titulo: string;
  resumen: string;
  pasos: Paso[];
  cierre?: string[];
  notas: Nota[];
};

export const TEMAS: Tema[] = [
  {
    // Slug of the old «Registrar un fiado», kept for its inbound links.
    slug: "registrar-un-fiado",
    numero: 1,
    grupo: "diario",
    titulo: "Registrar una venta o un fiado",
    resumen:
      "Una venta de contado y un fiado se registran igual: eliges lo que se lleva, dices cuánto te paga ahora y, al final, de quién es. Si el cliente es nuevo, lo creas en ese último paso.",
    pasos: [
      { texto: "Pulsa [[Registrar]], el botón oscuro de abajo a la derecha.", imagen: "registrar-un-fiado/1" },
      {
        texto: "Elige [[Fiado o venta]].",
        pista: "[[Nuevo cliente]] es para darlo de alta sin venderle nada, y [[Abono]] para anotar un pago de lo que ya debe.",
        imagen: "registrar-un-fiado/2",
      },
      {
        texto: "En [[1/4 Producto]], toca lo que se lleva.",
        pista: "Arriba tienes el buscador. Si el producto no está en tu catálogo, pulsa [[Agregar producto]] y lo creas ahí mismo.",
        imagen: "registrar-un-fiado/3",
      },
      {
        texto: "Elige la cantidad y pulsa [[Agregar]]. Repite con cada producto.",
        pista: "La ficha te dice cuántos te quedan y qué precio se aplica: el de detal o, desde cierta cantidad, el de mayor.",
        imagen: "registrar-un-fiado/4",
      },
      { texto: "Pulsa [[Ver carrito]].", imagen: "registrar-un-fiado/5" },
      { texto: "En [[2/4 Carrito]] revisa las cantidades y pulsa [[Ir a pago]].", imagen: "registrar-un-fiado/6" },
      {
        texto: "En [[3/4 Pago]] hay una tarjeta por moneda. Pulsa [[Pagar]] en cada una.",
        pista: "Si la venta mezcla monedas, cada una lleva su propio pago. Nunca se suman entre ellas.",
        imagen: "registrar-un-fiado/7",
      },
      {
        texto: "Si te paga todo ahora, deja [[De contado]]: el monto ya viene escrito.",
        pista: "El monto está en bolívares. Si te paga en otra moneda, tócala al lado del monto y cámbiala; debajo, en [[Equivalencia]], ves lo que va a quedar guardado.",
        imagen: "registrar-un-fiado/8",
      },
      { texto: "Si se lo lleva fiado, elige [[Fiado o crédito]].", imagen: "registrar-un-fiado/9" },
      {
        texto: "En [[Monto]] escribe lo que te entrega ahora. Si no te entrega nada, déjalo en blanco.",
        pista: "Lo que no pague ahora es lo que queda fiado.",
        imagen: "registrar-un-fiado/10",
      },
      {
        texto: "Elige el [[Plazo de pago]] que acordaron y, si va por partes, las [[Cuotas]].",
        pista: "Si acordaron unos días que no están en la lista, elige [[Otro plazo…]] y escríbelos.",
        imagen: "registrar-un-fiado/11",
      },
      {
        texto: "Si quieres, adjunta una [[Foto (opcional)]] y una [[Descripción (opcional)]]. Pulsa [[Pagar]].",
        imagen: "registrar-un-fiado/12",
      },
      { texto: "Revisa lo que queda debiendo y pulsa [[Continuar]].", imagen: "registrar-un-fiado/13" },
      {
        texto: "En [[4/4 Información del cliente]], escribe su nombre o su cédula en [[Buscar cliente]].",
        pista: "Si no existe todavía, llena ahí mismo [[Nombre del cliente]] y [[Documento]]. El [[WhatsApp (opcional)]] vale la pena: es por donde le vas a mandar su saldo.",
        imagen: "registrar-un-fiado/14",
      },
      { texto: "Tócalo cuando aparezca.", imagen: "registrar-un-fiado/15" },
      {
        texto:
          "Marca la casilla de que acepta recibir avisos de su saldo por WhatsApp solo si se lo preguntaste y te dijo que sí.",
        pista:
          "Si ya te dio permiso antes, la casilla no sale. Y si quieres quitárselos, es en su ficha, en el menú de los tres puntos › [[Notificaciones]].",
        imagen: "registrar-un-fiado/16",
      },
      { texto: "Pulsa [[Finalizar]], que lleva el nombre de tu cliente.", imagen: "registrar-un-fiado/17" },
      {
        texto: "Listo. Con [[Compartir]] le mandas el resumen de la compra como imagen.",
        imagen: "registrar-un-fiado/18",
      },
    ],
    notas: [
      {
        titulo: "El plazo no es un adorno",
        texto:
          "Es de donde sale el puntaje del cliente. Sin plazo, la app no tiene cómo saber si te pagó tarde o a tiempo.",
      },
      {
        titulo: "Escribir en bolívares no guarda la deuda en bolívares",
        texto:
          "Los bolívares son una forma de escribir el monto, no una cuenta aparte. La deuda queda en la moneda del producto, que es lo que no se devalúa. Los bolívares que escribiste quedan anotados tal cual, y los ves en el detalle.",
      },
      {
        titulo: "Lo que te paga ahora no es un fiado aparte",
        texto:
          "Si te entrega algo en el momento, la app lo anota como cobrado y deja a deber solo el resto. Una compra de 8.000 con 3.000 entregados deja una deuda de 5.000, no de 8.000.",
      },
      {
        // Weekend-only, so it could not be captured on a Tuesday.
        titulo: "Los fines de semana, la tasa que viene",
        texto:
          "Si ya se publicó la tasa del lunes, en el pago sale la casilla [[Aplicar tasa BCV prevista]]. Márcala si estás cobrando a esa tasa: cambia el equivalente en bolívares y queda guardado que usaste esa y no la del día.",
      },
    ],
  },
  {
    slug: "registrar-un-abono",
    numero: 2,
    grupo: "diario",
    titulo: "Registrar un abono",
    resumen: "Cuando te pagan, sea todo o una parte.",
    pasos: [
      {
        texto: "Entra al cliente y pulsa [[Agregar abono]].",
        pista: "También llegas desde [[Registrar]] › [[Abono]], eligiendo al cliente de la lista.",
        imagen: "registrar-un-abono/1",
      },
      {
        texto: "Escribe cuánto te pagó en [[¿Cuánto abona?]].",
        pista: "Debajo dice cuánto te debe en esa moneda. La app no te deja poner más: si te dio de más, es otra cuenta, no un abono.",
        imagen: "registrar-un-abono/2",
      },
      {
        texto: "Si te pagó en bolívares, toca la moneda y elige [[Bolívares]]: escribes los bolívares que te dio y la app los pasa a lo que te debe.",
        pista: "Si te debe en dólares y en euros, en ese mismo menú eliges de cuál de las dos cuentas te está pagando.",
        imagen: "registrar-un-abono/3",
      },
      {
        texto: "Mira [[Así se reparte el pago]]: cada fiado y cuánto le toca.",
        pista: "El dinero va primero al fiado más viejo.",
        imagen: "registrar-un-abono/4",
      },
      {
        texto: "Si quieres repartirlo tú, pulsa [[Repartir manualmente]] y elige con [[Pagar]] el fiado que te está pagando.",
        imagen: "registrar-un-abono/5",
      },
      {
        texto: "Marca la casilla de los avisos por WhatsApp solo si tu cliente te dijo que sí.",
        pista: "Con su permiso, le llega el recibo de este abono.",
        imagen: "registrar-un-abono/6",
      },
      { texto: "Pulsa [[Pagar y finalizar]], que lleva el monto.", imagen: "registrar-un-abono/7" },
      { texto: "Listo. Con [[Compartir]] le mandas el comprobante.", imagen: "registrar-un-abono/8" },
    ],
    notas: [
      {
        titulo: "El saldo baja al instante",
        texto: "Para ti y para tu cliente, en el mismo segundo. No tienes que avisarle.",
      },
      {
        titulo: "Un abono siempre paga un fiado concreto",
        texto:
          "No cae en un saldo genérico: queda anotado contra el fiado al que fue. Por eso el detalle de cada fiado te dice cuánto le han abonado y cuánto le queda.",
      },
    ],
  },
  {
    slug: "atender-un-pedido",
    numero: 3,
    grupo: "diario",
    titulo: "Atender un pedido del catálogo",
    resumen:
      "Cuando un cliente te pide desde tu catálogo, el pedido te llega a la app. Lo revisas y lo registras como venta, de contado o fiado, sin escribir nada de nuevo.",
    pasos: [
      {
        texto: "En [[Inicio]], la tarjeta [[Pedidos]] te dice cuántos tienes sin atender. Tócala.",
        pista: "También te llega un aviso en [[Notificaciones]] cada vez que entra uno.",
        imagen: "atender-un-pedido/1",
      },
      { texto: "Toca el pedido.", imagen: "atender-un-pedido/2" },
      {
        texto: "Revisa quién lo pidió y qué. Si tienes dudas, [[Contactar vía WhatsApp]] le abre la conversación.",
        imagen: "atender-un-pedido/3",
      },
      { texto: "Pulsa [[Registrar pedido]].", imagen: "atender-un-pedido/4" },
      {
        texto: "En [[1/3 Confirmar pedido]] puedes ajustar la cantidad de cada producto.",
        pista: "Cada producto te dice cuántos tienes disponibles.",
        imagen: "atender-un-pedido/5",
      },
      { texto: "Pulsa [[Confirmar y continuar]].", imagen: "atender-un-pedido/6" },
      {
        texto: "En [[2/3 Pago]] elige [[De contado]] o [[Fiado o crédito]], igual que en una venta.",
        imagen: "atender-un-pedido/7",
      },
      { texto: "Pulsa [[Pagar]].", imagen: "atender-un-pedido/8" },
      {
        texto: "En [[3/3 Información del cliente]], los datos ya vienen del pedido. Revísalos.",
        pista: "Si no lo encuentra entre tus clientes, Sevenz te lo dice, y lo crea con esos datos al terminar.",
        imagen: "atender-un-pedido/9",
      },
      {
        texto: "Marca la casilla de las notificaciones por WhatsApp solo si tu cliente te dijo que sí.",
        imagen: "atender-un-pedido/10",
      },
      { texto: "Pulsa [[Registrar y finalizar]].", imagen: "atender-un-pedido/11" },
      { texto: "Listo. El pedido queda registrado como venta.", imagen: "atender-un-pedido/12" },
    ],
    notas: [],
  },
  {
    slug: "compartir-el-link-del-cliente",
    numero: 4,
    grupo: "diario",
    titulo: "Compartir el enlace del cliente",
    resumen:
      "El enlace es la mitad de Sevenz: tu cliente ve el mismo número que tú, sin instalar nada y sin crear cuenta.",
    pasos: [
      {
        texto: "Entra al cliente y pulsa [[Compartir saldo vía WhatsApp]].",
        pista: "Se abre WhatsApp con su número y el mensaje ya escrito: su saldo y su enlace. Solo te queda enviarlo. Si no tiene WhatsApp guardado, la app te lo pide antes.",
        imagen: "compartir-el-link-del-cliente/1",
      },
      {
        texto: "Para mandarlo por otro lado, abre el menú de los tres puntos y elige [[Compartir enlace]].",
        pista: "Se abren las opciones de compartir de tu teléfono, con el mismo mensaje. El enlace se crea la primera vez y después es siempre el mismo.",
        imagen: "compartir-el-link-del-cliente/2",
      },
      {
        texto: "Esto es lo que ve tu cliente al abrirlo: lo que debe en cada moneda, cada fiado y cada abono.",
        imagen: "compartir-el-link-del-cliente/3",
      },
      {
        texto: "Cuando lo abre, te llega un aviso en [[Notificaciones]].",
        imagen: "compartir-el-link-del-cliente/4",
      },
      {
        texto: "También lo mandas desde cualquier movimiento: tócalo en el historial y pulsa [[Compartir]].",
        pista: "Es el mismo enlace de tu cliente, pero abre directo en ese movimiento. No se crea uno nuevo.",
        imagen: "compartir-el-link-del-cliente/5",
      },
    ],
    cierre: [
      "Tu cliente solo ve lo suyo: no ve tus otros clientes, ni tus cuentas, ni cuánto vendes.",
    ],
    notas: [
      {
        titulo: "Mándaselo solo a él",
        texto:
          "Quien tenga el enlace puede abrirlo, sin clave. Adivinarlo no se puede — son 32 caracteres al azar — pero si se reenvía, quien lo reciba ve ese saldo. Hoy un enlace no se puede apagar.",
      },
    ],
  },
  {
    // Migration 185 (2026-11-03). What is offered follows the table at the top
    // of `dashboard/lib/returns/options.ts`: keep the two in step.
    slug: "registrar-una-devolucion",
    numero: 5,
    grupo: "ocasional",
    titulo: "Registrar una devolución",
    resumen: "Cuando te devuelven un producto, fiado o de contado.",
    pasos: [
      {
        texto: "Abre el fiado o la venta de contado y toca los tres puntos del producto que te devolvieron.",
        pista: "Llegas desde el historial del cliente.",
        imagen: "registrar-una-devolucion/1",
      },
      { texto: "Pulsa [[Registrar devolución]].", imagen: "registrar-una-devolucion/2" },
      {
        texto: "Elige cuántas unidades te devuelve y revisa lo que va a pasar, incluido cómo queda lo que te deben.",
        pista: "Si no sobra dinero, aquí mismo pulsas [[Registrar devolución]] y listo.",
        imagen: "registrar-una-devolucion/3",
      },
      {
        texto: "Si el cliente ya había pagado ese producto, pulsa [[Continuar]] y elige qué haces con lo que sobra.",
        pista: "Nada se guarda hasta que eliges. Con la X cierras sin registrar.",
        imagen: "registrar-una-devolucion/4",
      },
      {
        texto: "Ahí ves en qué quedó todo.",
        imagen: "registrar-una-devolucion/5",
      },
      {
        texto: "En el fiado, el producto queda marcado y [[Total]] baja.",
        imagen: "registrar-una-devolucion/6",
      },
      {
        texto: "En el historial sale una fila [[Devolución]], que tu cliente también ve.",
        imagen: "registrar-una-devolucion/7",
      },
    ],
    notas: [
      {
        titulo: "No cuenta como dinero que entró",
        texto:
          "Una devolución no es un abono. Baja lo que te deben y vuelve el producto a tu inventario, pero no suma a tus cobros. En Reportes sale aparte, en Devoluciones.",
      },
      {
        titulo: "Qué hacer con el dinero que sobra",
        texto:
          "Solo se pregunta si el cliente ya había pagado. Si te debe otros fiados en esa moneda, puedes [[Abonar a otros fiados]] o [[Devolver dinero]]. Si no te debe nada más en esa moneda, puedes [[Registrar como saldo a favor]] o [[Devolver dinero]].",
      },
      {
        titulo: "Si la venta fue de contado",
        texto:
          "Como ya estaba pagada, siempre sobra dinero y eliges qué hacer con él. En Reportes, [[Ventas]] solo baja si devuelves el dinero. En una venta sin cliente solo puedes [[Devolver dinero]]: si se lleva otro producto, registra después una venta nueva.",
      },
      {
        titulo: "Si se lleva otro producto a cambio",
        texto:
          "Registra el dinero como saldo a favor y luego la venta nueva. Si la fías, el saldo se descuenta solo. Si la cobras, marca [[Usar saldo a favor]] en el paso de pago y cobras la diferencia.",
      },
      {
        titulo: "Si fue un error",
        texto:
          "Abre la devolución y elimínala desde los tres puntos de arriba: la deuda vuelve y las unidades salen otra vez del inventario. Se restaura desde Notificaciones. Si su saldo a favor ya se usó, primero elimina la venta que lo gastó: la app te lleva a ella.",
      },
      {
        titulo: "Un fiado con devolución no se elimina",
        texto: "Primero elimina la devolución, y después el fiado o la venta.",
        cuidado: true,
      },
    ],
  },
  {
    slug: "marcar-una-mala-paga",
    numero: 6,
    grupo: "ocasional",
    titulo: "Marcar una mala paga",
    resumen: "Para acordarte de a quién ya no le vas a fiar. Se puede quitar cuando quieras.",
    pasos: [
      { texto: "Entra al cliente y activa [[Marcar como mala paga]].", imagen: "marcar-una-mala-paga/1" },
      {
        texto: "Escribe el [[Motivo]]: «¿Por qué ya no le vas a fiar?».",
        pista: "Es para ti: dentro de tres meses no te vas a acordar.",
        imagen: "marcar-una-mala-paga/2",
      },
      { texto: "Confirma con [[Marcar como mala paga]].", imagen: "marcar-una-mala-paga/3" },
      {
        texto: "Queda en [[Malas pagas]], en el menú, aparte de tu lista normal.",
        pista: "Si le vuelves a fiar, la app te pide confirmarlo cada vez.",
        imagen: "marcar-una-mala-paga/4",
      },
      { texto: "Para quitarla, entra al cliente y desactiva [[Desmarcar como mala paga]].", imagen: "marcar-una-mala-paga/5" },
      {
        texto: "Confirma con [[Desmarcar]].",
        pista: "El motivo que escribiste se queda en su historial.",
        imagen: "marcar-una-mala-paga/6",
      },
    ],
    notas: [
      {
        titulo: "Tu cliente no se entera",
        texto: "La marca es tuya. No aparece en el enlace que él ve.",
      },
    ],
  },
  {
    slug: "ver-el-puntaje-del-cliente",
    numero: 7,
    grupo: "ocasional",
    titulo: "Ver el puntaje del cliente",
    resumen:
      "Sevenz le pone una nota a cada cliente según cómo te ha pagado. No la calculas tú: sale sola de su historial.",
    pasos: [
      {
        texto: "Entra al cliente y baja hasta [[Puntaje de crédito]].",
        pista: "Ves un número sobre 1000, una rueda de color y, debajo, de dónde sale: si paga a tiempo, cómo va ahora, cómo ha ido en los últimos meses y desde cuándo es tu cliente.",
        imagen: "ver-el-puntaje-del-cliente/1",
      },
    ],
    cierre: [
      "En [[Reportes]], la lista [[Mejores pagadores]] te ordena a tus clientes por puntaje.",
    ],
    notas: [
      {
        titulo: "Un cliente nuevo no tiene puntaje",
        texto:
          "Dice «Sin historial», y eso no es malo: es que todavía no hay con qué juzgarlo. Aparece cuando empieza a pagar (o a no pagar).",
      },
    ],
  },
  {
    slug: "calculadora-de-tasa",
    numero: 8,
    grupo: "ocasional",
    titulo: "La calculadora de tasa",
    resumen:
      "Para pasar de dólares, euros o USDT a bolívares con la tasa del día, sin buscarla en otro lado.",
    pasos: [
      { texto: "En [[Inicio]], toca la tarjeta [[Calculadora]].", imagen: "calculadora-de-tasa/1" },
      {
        texto: "Elige la moneda arriba y escribe el monto en [[Tú pones]].",
        imagen: "calculadora-de-tasa/2",
      },
      { texto: "Debajo, en [[Tú cobras]], sale en bolívares.", imagen: "calculadora-de-tasa/3" },
      {
        texto: "Con [[Invertir]] la cuenta va al revés: escribes bolívares y te dice cuánto es en la otra moneda.",
        imagen: "calculadora-de-tasa/4",
      },
      {
        texto: "Con [[Compartir]] la mandas por WhatsApp.",
        pista:
          "Sale como una imagen con el logo de Sevenz, la cuenta y de cuándo es la tasa. No lleva ningún enlace dentro, a propósito: un mensaje reenviado con un enlace es lo que copian los estafadores.",
        imagen: "calculadora-de-tasa/5",
      },
      {
        texto: "Más abajo está la tasa BCV de los últimos 90 días. Con [[Filtrar por fecha]] buscas un día concreto.",
        imagen: "calculadora-de-tasa/6",
      },
    ],
    notas: [
      {
        titulo: "Los fines de semana y feriados",
        texto:
          "El BCV no publica sábados, domingos ni festivos. Esos días verás la última tasa publicada, y la app te lo dice.",
      },
      {
        // Weekend-only: not captured.
        titulo: "Para qué sirve la tasa prevista",
        texto:
          "El BCV publica el viernes la tasa que va a regir el lunes. Si ya salió, los fines de semana aparece la casilla [[Aplicar tasa BCV prevista]] para hacer la cuenta con esa. Nunca viene marcada, y cuando esa tasa entra en vigor la casilla desaparece sola.",
      },
    ],
  },
  {
    slug: "ver-tus-reportes",
    numero: 9,
    grupo: "ocasional",
    titulo: "Ver tus reportes",
    resumen:
      "Cuánto te deben, cuánto vendiste, qué se está agotando y cuánto ganas con cada proveedor. Todo en una pantalla, sin hacer cuentas.",
    pasos: [
      { texto: "Toca [[Reportes]] en la barra de abajo.", imagen: "ver-tus-reportes/1" },
      {
        texto: "Arriba hay tres pestañas: [[Facturación]], [[Inventario]] y [[Proveedores]].",
        imagen: "ver-tus-reportes/2",
      },
      {
        texto: "Toca las fechas para cambiar el periodo que miras.",
        pista: "«Por cobrar» no cambia con el periodo: es todo lo que te deben hoy.",
        imagen: "ver-tus-reportes/3",
      },
      {
        texto: "El [[Asistente]] te resume la semana y te da hasta tres recomendaciones.",
        pista: "Se escribe una vez al día con las cifras de tu app. Con [[Poco]] o [[Mucho]] nos dices si te sirvió.",
        imagen: "ver-tus-reportes/4",
      },
      {
        // No capture: a whole tab of cards, which the step lists instead.
        texto:
          "En [[Facturación]] ves lo que te deben, lo que vendiste de contado, lo que fiaste, las devoluciones, los abonos, los pedidos por atender, los plazos de pago y tus mejores pagadores.",
      },
      {
        texto: "En [[Inventario]] ves cuántos productos tienes, cuáles están por agotarse y cuáles se agotaron.",
        pista: "También el margen de cada producto, lo que más se vende y lo que más te devuelven.",
        imagen: "ver-tus-reportes/6",
      },
      {
        // Until 2026-11-03 this said only «cuenta como por agotarse», on
        // purpose: no notice existed. CT-162 (migration 183) made it true:
        // the bell warns once a day while a product stays at or under it,
        // and separately when it hits 0. A threshold of 0 turns them off.
        texto: "Con [[Avísame cuando queden]] decides desde cuántas unidades te avisa la campana de que un producto se está agotando.",
        pista: "Te avisa una vez al día mientras siga así, y aparte cuando se agota. Si pones 0, no te avisa.",
        imagen: "ver-tus-reportes/7",
      },
      {
        texto: "En [[Proveedores]] ves, de cada proveedor, cuántos productos le compras y cuánto ganas con ellos.",
        pista: "Sale de lo que pones en [[Proveedor]] al crear cada producto.",
        imagen: "ver-tus-reportes/8",
      },
      {
        texto: "Con [[Descargar]] te llevas cada pestaña en un archivo.",
        imagen: "ver-tus-reportes/9",
      },
    ],
    notas: [
      {
        titulo: "Las monedas no se suman",
        texto:
          "Dólares y euros salen siempre por separado. Sumarlos daría una cifra que no corresponde a nada.",
      },
      {
        titulo: "El margen necesita el costo",
        texto:
          "Un producto sin costo no tiene margen. Si en Inventario o en Proveedores ves cifras raras, revisa que tus productos tengan su [[Costo unitario]].",
      },
    ],
  },
  {
    slug: "crear-un-producto",
    numero: 10,
    grupo: "ocasional",
    titulo: "Crear un producto",
    resumen:
      "Cada producto lleva su precio, cuántos tienes y a quién se lo compras. Con eso Sevenz lleva tu inventario solo y te dice cuánto ganas.",
    pasos: [
      { texto: "En [[Catálogo]], pulsa [[Crear producto]].", imagen: "crear-un-producto/1" },
      { texto: "En [[1/4 Información del producto]], escribe el [[Nombre del producto]].", imagen: "crear-un-producto/2" },
      {
        texto: "En [[Disponible en inventario]] pon cuántos tienes.",
        pista: "Baja sola con cada venta. Cuando repongas, lo actualizas en la ficha del producto.",
        imagen: "crear-un-producto/3",
      },
      {
        texto: "En [[Proveedor (opcional)]] escribe dónde lo compras.",
        pista: "Con esto, Reportes te dice cuánto ganas con cada proveedor.",
        imagen: "crear-un-producto/4",
      },
      {
        // Migration 184 (2026-11-03): categories are created, renamed and
        // deleted from this same sheet.
        texto: "Toca [[Categoría (opcional)]] para ponerle una categoría.",
        imagen: "crear-un-producto/5",
      },
      {
        texto:
          "Elige una de la lista. Si no la tienes, pulsa [[Crear categoría]], escribe el nombre, pulsa [[Crear]] y luego [[Cerrar]]. Después pulsa [[Continuar]].",
        pista:
          "Con los tres puntos de cada categoría puedes editarla o eliminarla. Si la eliminas, sus productos no se borran: se quedan sin categoría.",
        imagen: "crear-un-producto/6",
      },
      {
        texto: "En [[2/4 Precio]], escribe el [[Costo unitario (opcional)]] y su moneda: lo que te costó a ti.",
        imagen: "crear-un-producto/7",
      },
      {
        texto: "En [[Margen al detal]] elige cuánto quieres ganar. Sevenz calcula el precio.",
        pista: "Si prefieres escribir el precio tú, elige [[Otro (escribe el precio)]].",
        imagen: "crear-un-producto/8",
      },
      { texto: "Debajo te dice cuánto ganas de verdad a ese precio.", imagen: "crear-un-producto/9" },
      {
        texto: "Con [[Agregar]] le pones también precio en otra moneda.",
        pista: "Se calcula con la tasa del día. Si quieres fijarlo a mano, toca el icono del vínculo para soltarlo de la tasa.",
        imagen: "crear-un-producto/10",
      },
      {
        texto: "Si también lo vendes al mayor, deja activa [[Venta al mayor]] y elige desde cuántas unidades aplica. Pulsa [[Continuar]].",
        imagen: "crear-un-producto/11",
      },
      {
        texto: "En [[3/4 Detalles]], [[Publicar producto en catálogo]] decide si sale en tu catálogo, y con qué precios.",
        imagen: "crear-un-producto/12",
      },
      {
        texto: "Adjunta una foto y, si quieres, una descripción. Pulsa [[Continuar]].",
        pista: "Con foto se vende mejor desde el catálogo.",
        imagen: "crear-un-producto/13",
      },
      { texto: "En [[4/4 Verifica]] revísalo todo y pulsa [[Crear producto]].", imagen: "crear-un-producto/14" },
      { texto: "Listo. Ya aparece en tu catálogo.", imagen: "crear-un-producto/15" },
    ],
    notas: [
      {
        titulo: "Las categorías ordenan tu catálogo",
        texto:
          "En tu catálogo salen en [[Categorías]], debajo de [[Pedidos]], cada una con cuántos productos tiene: con un toque ves solo esos. Desde [[Editar]] las creas, les cambias el nombre o las eliminas. A tu cliente solo le salen las que tienen algún producto publicado, y cuentan solo los publicados.",
      },
      {
        titulo: "Puedes crearlo a mitad de una venta",
        texto:
          "Si el cliente se lleva algo que no tenías cargado, en [[1/4 Producto]] de la venta pulsa [[Agregar producto]] y lo creas ahí mismo.",
      },
    ],
  },
  {
    slug: "compartir-tu-catalogo",
    numero: 11,
    grupo: "una-vez",
    titulo: "Compartir tu catálogo",
    resumen:
      "Tu catálogo es una página con tus productos y sus precios. Tus clientes la abren con un enlace y te hacen pedidos desde su teléfono.",
    pasos: [
      { texto: "Toca [[Catálogo]] en la barra de abajo.", imagen: "compartir-tu-catalogo/1" },
      {
        texto: "Activa [[Publicar]] en cada producto que quieras mostrar.",
        pista: "Solo salen los publicados. Los demás siguen en tu app para vender, pero tu cliente no los ve.",
        imagen: "compartir-tu-catalogo/2",
      },
      {
        texto: "Pulsa [[Compartir]].",
        pista: "Se abren las opciones de compartir de tu teléfono, con el mensaje y el enlace ya escritos.",
        imagen: "compartir-tu-catalogo/3",
      },
      {
        texto: "Para ver cómo lo ve tu cliente, abre el menú de los tres puntos y elige [[Vista previa]].",
        imagen: "compartir-tu-catalogo/4",
      },
      {
        texto: "Esto es lo que ve tu cliente. Arma su pedido y te llega a [[Pedidos]].",
        pista: "Bajo el buscador salen tus categorías: con un toque ve solo esos productos. Solo le salen las que tienen algo publicado.",
        imagen: "compartir-tu-catalogo/5",
      },
    ],
    notas: [
      {
        titulo: "Los precios en bolívares se actualizan solos",
        texto:
          "Tu cliente ve el precio en tu moneda y su equivalente en bolívares con la tasa de hoy. No tienes que cambiar nada cuando se mueve la tasa.",
      },
      {
        titulo: "Un producto también se comparte solo",
        texto: "Cada producto tiene su propio botón de compartir, para mandar solo ese.",
      },
    ],
  },
  {
    slug: "importar-tu-libreta",
    numero: 12,
    grupo: "una-vez",
    titulo: "Subir tu libreta con una foto",
    resumen:
      "Le tomas una foto a tu libreta como está hoy y Sevenz la pasa a digital. No reescribes nada.",
    pasos: [
      {
        texto: "En [[Inicio]], pulsa [[Subir libreta]].",
        pista: "También está en el menú.",
        imagen: "importar-tu-libreta/1",
      },
      { texto: "Toma o sube las fotos. Hasta 6 por tanda.", imagen: "importar-tu-libreta/2" },
      // From here on the flow needs real notebook photos and the AI read, so
      // these steps have no capture. Their text is the previous guide's,
      // unchanged.
      { texto: "Espera. Vas a ver [[En cola…]], luego [[Leyendo con IA…]] y al final [[Listo]]." },
      {
        texto: "Pulsa [[Ver resultados]].",
        pista: "Puedes seguir usando el resto de la app mientras lee. El progreso sigue ahí.",
      },
      {
        texto:
          "Si tu negocio maneja dólares y euros, elige la moneda: [[Todo en dólares]], [[Todo en euros]] o [[Están mezclados]].",
        pista: "Con «Están mezclados» eliges la moneda cliente por cliente, y puedes cambiar filas sueltas después.",
      },
      {
        texto: "Abre cada cliente y revisa lo suyo.",
        pista: "Hay una tarjeta por persona. Dentro están sus movimientos, su cédula y su WhatsApp.",
      },
      {
        texto: "Escribe la cédula de los clientes nuevos. Sin ella no se puede subir.",
        pista: "Se pide una vez por persona, no por renglón.",
      },
      {
        texto:
          "Si ese cliente ya lo tienes, Sevenz te lo dice y te pregunta de cuál es. Mientras no respondas, ese cliente no se sube.",
        pista:
          "Te enseña la ficha de cada uno con su cédula y lo que debe, para que puedas distinguirlos. Si de verdad es otra cuenta de la misma persona —la del negocio y la personal, por ejemplo— eliges [[Es una cuenta separada]] y entra aparte.",
      },
      {
        texto: "Sube con [[Subir este cliente]], o todos de una con [[Confirmar y subir]].",
        pista: "No hace falta tener la cartera entera lista: sube a los que ya están y sigue con el resto.",
      },
    ],
    cierre: [
      "Cada tarjeta dice cómo va: [[Faltan datos]] si le falta algo, [[Todo cuadra]] si está lista, y [[Subido]] cuando ya entró.",
      "Si cierras la pantalla sin querer, al volver te ofrece seguir donde lo dejaste. Las fotos no vuelven, pero sí tus correcciones.",
    ],
    notas: [
      {
        titulo: "Las fotos no tienen tope",
        texto: "Sube la libreta entera si quieres. No hay cuota mensual que gastar.",
      },
      {
        titulo: "Si una línea no dice de quién es",
        texto:
          "Una página que empieza a media cuenta trae renglones sin nombre, porque el nombre está en la hoja anterior. Salen arriba, en [[líneas sin cliente]], con un menú para decir de quién son — o para quitarlas. No se sube nada hasta que las resuelvas, y así no se pierde ninguna deuda.",
      },
      {
        titulo: "Si la cuenta no le da igual que a ti",
        texto:
          "Cuando el total que escribiste a mano no coincide con la suma de los montos, Sevenz te lo dice y te deja elegir: [[Mi libreta subida]] o [[La suma de Sevenz]]. Si eliges tu libreta, agrega un movimiento de ajuste por la diferencia para que la cuenta cierre en tu número.",
        cuidado: true,
      },
      {
        titulo: "Si la página viene de otra hoja",
        texto:
          "Cuando fotografías una página que no es la primera, esa cuenta ya traía un saldo de antes y Sevenz no lo sabe: todas las líneas salen marcadas por la misma cantidad. Si eso pasa, te lo dice y te propone añadirlo como [[Saldo anterior]]. Antes de aceptar, mira la foto: te enseña al lado el primer apunte de la página, porque si ese monto se leyó mal, lo que falla es él y no el saldo anterior. Y si no te lo propone pero sabes que la página continúa otra, lo escribes tú con [[¿Esta página viene de otra?]].",
        cuidado: true,
      },
      {
        titulo: "Varios movimientos a la vez, y volver atrás",
        texto:
          "Dentro de un cliente, mantén pulsado un movimiento para marcarlo. Desde ahí marcas los que quieras y les cambias la moneda o los eliminas de una vez. Y si te equivocas en cualquier paso de la revisión, el botón de deshacer de arriba vuelve atrás hasta veinte veces.",
      },
      {
        titulo: "Revisa los montos aunque todo se vea bien",
        texto:
          "La lectura con IA acierta casi siempre, pero un 2 emborronado puede leerse como 7. Las líneas que no cuadran con el saldo escrito salen marcadas; el resto lo miras tú.",
        cuidado: true,
      },
    ],
  },
  {
    slug: "la-papelera",
    numero: 13,
    grupo: "una-vez",
    titulo: "La papelera",
    resumen:
      "Para sacar de la vista a un cliente que ya no te interesa seguir, sin perder su historial.",
    pasos: [
      {
        texto: "Entra al cliente, abre el menú de los tres puntos y elige [[Mover a papelera]].",
        imagen: "la-papelera/1",
      },
      {
        texto: "Confirma con [[Mover a papelera]]. Desaparece de [[Inicio]] y de [[Clientes]].",
        imagen: "la-papelera/2",
      },
      {
        texto: "Cuando lo quieras de vuelta, entra a [[Papelera]], en el menú, y pulsa [[Restaurar]].",
        imagen: "la-papelera/3",
      },
      {
        // The import path: no capture, it needs a real notebook photo.
        texto:
          "También vuelve solo si subes una libreta con su cédula: Sevenz lo reconoce, te avisa de cuánto debe y te deja recuperarlo ahí mismo.",
        pista: "Su saldo vuelve a contar en tus totales en cuanto lo recuperas, así que te lo dice con la cifra delante.",
      },
    ],
    cierre: [
      "Mover a la papelera no borra nada: sus fiados, sus abonos y su enlace siguen ahí. Mientras esté en la papelera, no suma a lo que tienes por cobrar.",
    ],
    notas: [
      {
        titulo: "Ocultar definitivamente lo saca de todas partes",
        texto:
          "Dentro de la papelera hay [[Ocultar definitivamente]]. Eso lo saca también de la papelera, así que desde ahí ya no lo encuentras. Su historial y su enlace siguen intactos. La única forma de traerlo de vuelta es subir una libreta con su cédula: Sevenz lo reconoce y te ofrece recuperarlo. Úsalo solo si estás seguro.",
        cuidado: true,
      },
    ],
  },
  {
    slug: "mi-negocio",
    numero: 14,
    grupo: "una-vez",
    titulo: "Mi negocio: tus datos",
    resumen:
      "Lo llenas una vez. Parte de esto lo ve tu cliente en su enlace, así que vale el minuto.",
    pasos: [
      { texto: "Abre el menú y entra a [[Mi negocio]].", imagen: "mi-negocio/1" },
      {
        texto: "Sube tu logo con [[Subir logo]].",
        pista: "El logo nuevo, o quitarlo, se aplica al pulsar [[Guardar cambios]]. Si sales sin guardar, se queda el de antes.",
        imagen: "mi-negocio/2",
      },
      {
        texto:
          "Revisa [[Nombre del negocio]], [[Nombres del dueño]], [[Apellidos del dueño]] y [[WhatsApp]], y completa [[Dirección de negocio (opcional)]] y [[RIF/NIT (opcional)]] si aplican.",
        imagen: "mi-negocio/3",
      },
      {
        // Since 2026-11-02 payment methods are a list, each saved on its own
        // from its dialog. Clients do NOT see them in their link (decision of
        // 2026-09-07, kept 2026-11-02): the owner copies one into WhatsApp.
        texto:
          "En [[Métodos de pago]] toca [[Agregar método de pago]] y escribe uno — por ejemplo tu Pago Móvil. Puedes tener varios.",
        pista: "Tu cliente no los ve en su enlace. Toca el ícono de copiar y pégalo en WhatsApp cuando te pregunte a dónde pagarte. Cada uno se guarda en cuanto lo agregas.",
        imagen: "mi-negocio/4",
      },
      {
        // "cartera" STAYS here on purpose: it names the Meta-approved WhatsApp
        // message, which cannot be edited and still says it.
        texto: "En [[Notificaciones]] decides si recibes por WhatsApp el resumen semanal de tu cartera.",
        pista: "Llega con lo que tienes por cobrar y cuántos clientes se pasaron del plazo. Lo apagas aquí mismo cuando quieras.",
        imagen: "mi-negocio/5",
      },
      {
        texto: "Con [[Cambiar contraseña]] la cambias cuando quieras.",
        pista: "Al cambiarla se cierra la sesión en tus otros dispositivos.",
        imagen: "mi-negocio/6",
      },
      { texto: "Pulsa [[Guardar cambios]].", imagen: "mi-negocio/7" },
    ],
    cierre: [
      "En [[Tasa de cambio]] ves la que usa Sevenz: la del BCV, que se actualiza sola.",
    ],
    notas: [
      {
        titulo: "El país y el correo no se cambian desde aquí",
        texto:
          "El país se elige al crear la cuenta y queda fijo, porque de él dependen la moneda y las reglas. El correo es con el que entras. Si necesitas cambiar cualquiera de los dos, escríbenos.",
      },
      {
        // Phase 3 of the console hardening, 2026-11-02. Both behaviours are
        // measured by `qa:sesiones` in the dashboard repo.
        titulo: "Si crees que alguien entró a tu cuenta",
        texto:
          "Cambia tu contraseña con [[Cambiar contraseña]]: eso cierra la sesión en tus otros dispositivos. Si perdiste un teléfono, también puedes ir a [[Cerrar sesión]] y elegir [[En todos mis dispositivos]].",
        cuidado: true,
      },
    ],
  },
  {
    slug: "instalar-la-app-en-tu-telefono",
    numero: 15,
    grupo: "una-vez",
    titulo: "Instalar la app en tu teléfono",
    resumen:
      "Sevenz se puede poner en la pantalla de inicio, con su icono, y abre sin la barra del navegador. No hay que descargarla de ninguna tienda.",
    // No captures: every step happens in the phone browser's own menus, which
    // a screenshot of the app cannot show.
    pasos: [
      { texto: "Entra a app.sevenz.site desde el navegador de tu teléfono." },
      {
        texto:
          "En Android: hazlo desde [[Chrome]]. Toca [[Instalar]] cuando la app te lo ofrezca, o abre el menú de Chrome —los tres puntos de arriba a la derecha— y elige [[Instalar aplicación]].",
        pista: "Si ya cerraste el aviso, lo vuelves a encontrar en el menú de Sevenz, en [[Instalar app]].",
      },
      {
        texto:
          "En iPhone: toca el botón de compartir en la barra de Safari, baja en la lista y elige [[Añadir a pantalla de inicio]].",
        pista: "Safari no ofrece hacerlo solo. Hay que buscarlo, y por eso casi nadie lo sabe.",
      },
      { texto: "Confirma. El icono de Sevenz queda en tu pantalla de inicio." },
    ],
    cierre: [
      "Desde ahí se abre como cualquier otra app: pantalla completa, sin barra de direcciones.",
    ],
    notas: [
      {
        titulo: "No es otra Sevenz",
        texto:
          "Es la misma cuenta y los mismos datos. Puedes seguir entrando desde el navegador cuando quieras; tener las dos no duplica nada.",
      },
      {
        titulo: "En Samsung Internet no la instales",
        texto:
          "El navegador que viene de fábrica en los teléfonos Samsung no logra instalarla en las versiones nuevas de Android: sale una alerta de Google diciendo que la app no es segura. No tiene que ver con Sevenz — es ese navegador al empaquetarla. Desde Chrome funciona sin problema.",
        cuidado: true,
      },
      {
        titulo: "Sigue necesitando internet",
        texto:
          "Instalarla no la vuelve una app que funcione sin señal. Tus cuentas viven en el servidor, así que para registrar una venta hace falta conexión.",
        cuidado: true,
      },
    ],
  },
];

export function temaPorSlug(slug: string): Tema | undefined {
  return TEMAS.find((t) => t.slug === slug);
}

export function etiquetaDeGrupo(grupo: Grupo): string {
  return GRUPOS.find((g) => g.id === grupo)?.label ?? grupo;
}

// Todo el texto de un tema en una sola cadena, sin los corchetes, para que el
// buscador encuentre también por el nombre de un botón o por una pista.
export function textoBuscable(tema: Tema): string {
  const partes = [
    tema.titulo,
    tema.resumen,
    etiquetaDeGrupo(tema.grupo),
    ...tema.pasos.flatMap((p) => [p.texto, p.pista ?? ""]),
    ...(tema.cierre ?? []),
    ...tema.notas.flatMap((n) => [n.titulo, n.texto]),
  ];
  return partes.join(" ").replace(/\[\[|\]\]/g, "").toLowerCase();
}
