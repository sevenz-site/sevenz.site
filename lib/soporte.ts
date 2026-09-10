// Los nueve temas de la guía, escritos una sola vez.
//
// El índice y la página de cada tema salen de aquí, así que no pueden
// separarse: si mañana cambia un paso, cambia en los dos sitios a la vez.
//
// En los textos, `[[Agregar fiado]]` marca un botón o un campo tal como se lee
// en pantalla. Se guarda así, y no como JSX, para que este archivo siga siendo
// datos: se puede recorrer, buscar y contar sin renderizar nada.

export type Grupo = "diario" | "ocasional" | "una-vez";

export const GRUPOS: { id: Grupo; label: string }[] = [
  { id: "diario", label: "Todos los días" },
  { id: "ocasional", label: "De vez en cuando" },
  { id: "una-vez", label: "Una vez, o casi" },
];

export type Paso = { texto: string; pista?: string };
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
    slug: "registrar-un-fiado",
    numero: 1,
    grupo: "diario",
    titulo: "Registrar un fiado",
    resumen:
      "Cuando le fías a alguien. Si el cliente es nuevo, lo creas aquí mismo — no hay que darlo de alta aparte.",
    pasos: [
      { texto: "Pulsa [[Agregar fiado]], el botón del medio abajo." },
      {
        texto: "Se abre [[Buscar cliente]]. Escribe su nombre o su cédula.",
        pista: "Si ya existe, aparece en la lista y lo tocas.",
      },
      {
        texto:
          "Si no aparece, pulsa [[Registrar cliente nuevo]] y llena [[Nombre del cliente]], [[WhatsApp]], [[Cédula/documento]] y [[Dirección (opcional)]].",
        pista: "El WhatsApp vale la pena: es por donde le vas a mandar su saldo.",
      },
      { texto: "En [[Tipo]] deja [[Fiado]]." },
      { texto: "Escribe el [[Monto]]." },
      {
        texto: "Si tu negocio maneja dólares y euros, elige la [[Moneda]].",
        pista: "Cada moneda lleva su propia cuenta. Nunca se suman entre ellas.",
      },
      { texto: "Pon el [[Plazo de pago]] si acordaron uno." },
      { texto: "Si quieres, agrega [[Detalle (opcional)]] y [[Foto (opcional)]], y guarda." },
    ],
    notas: [
      {
        titulo: "El plazo no es un adorno",
        texto:
          "Es de donde sale el puntaje del cliente. Sin plazo, la app no tiene cómo saber si te pagó tarde o a tiempo.",
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
      { texto: "Entra al cliente desde [[Cartera]] o [[Clientes]]." },
      { texto: "Pulsa [[+ Agregar abono]]." },
      {
        texto: "Escribe cuánto te pagó.",
        pista:
          "La app no te deja poner más de lo que te debe. Si te dio de más, es una cuenta nueva, no un abono.",
      },
      { texto: "Si maneja dos monedas, revisa que sea la correcta, y guarda." },
    ],
    notas: [
      {
        titulo: "El saldo baja al instante",
        texto: "Para ti y para tu cliente, en el mismo segundo. No tienes que avisarle.",
      },
    ],
  },
  {
    slug: "compartir-el-link-del-cliente",
    numero: 3,
    grupo: "diario",
    titulo: "Crear, compartir y abrir el link del cliente",
    resumen:
      "El link es la mitad de Sevenz: tu cliente ve el mismo número que tú, sin instalar nada y sin crear cuenta.",
    pasos: [
      { texto: "Entra al cliente." },
      {
        texto: "Arriba a la derecha pulsa [[Más]] y luego [[Compartir enlace]].",
        pista: "El link se crea solo la primera vez. Después es siempre el mismo.",
      },
      { texto: "Sevenz arma el mensaje y te avisa [[Mensaje copiado]]." },
      {
        texto:
          "Pégalo en el WhatsApp de tu cliente. También tienes [[Chat]] para abrir su conversación directo.",
      },
      { texto: "Cuando él lo abra, te llega un aviso en [[Notificaciones]]." },
    ],
    cierre: [
      "Tu cliente ve su nombre, cuánto debe, y cada fiado y cada abono con su fecha. Solo lo suyo — no ve tus otros clientes, ni tu cartera, ni cuánto vendes.",
    ],
    notas: [
      {
        titulo: "Mándaselo solo a él",
        texto:
          "Quien tenga el link puede abrirlo, sin clave. Adivinarlo no se puede — son 32 caracteres al azar — pero si se reenvía, quien lo reciba ve ese saldo. Hoy un link no se puede apagar.",
      },
    ],
  },
  {
    slug: "marcar-una-mala-paga",
    numero: 4,
    grupo: "ocasional",
    titulo: "Marcar una mala paga",
    resumen: "Para acordarte de a quién ya no le vas a fiar. Se puede quitar cuando quieras.",
    pasos: [
      { texto: "Entra al cliente." },
      { texto: "Pulsa [[Marcar como mala paga]]." },
      {
        texto: "Escribe el [[Motivo]] — la app pregunta «¿Por qué ya no le vas a fiar?».",
        pista: "Es obligatorio, y es para ti: dentro de tres meses no te vas a acordar.",
      },
      { texto: "Confirma con [[Marcar como mala paga]]." },
    ],
    cierre: [
      "Queda en la lista [[Malas pagas]], aparte de tu cartera normal.",
      "Para quitarla: entra al cliente, pulsa [[Desmarcar como mala paga]] y confirma en «¿Quitar la marca de mala paga?» con [[Desmarcar]].",
    ],
    notas: [
      {
        titulo: "Tu cliente no se entera",
        texto: "La marca es tuya. No aparece en el link que él ve.",
      },
    ],
  },
  {
    slug: "ver-el-puntaje-del-cliente",
    numero: 5,
    grupo: "ocasional",
    titulo: "Ver el puntaje del cliente",
    resumen:
      "Sevenz le pone una nota a cada cliente según cómo te ha pagado. No la calculas tú: sale sola de su historial.",
    pasos: [
      { texto: "Entra al cliente." },
      { texto: "Baja hasta [[Puntaje de crédito]]." },
      { texto: "Vas a ver un número sobre 1000 y una rueda de color." },
    ],
    cierre: [
      "También lo ves de un vistazo en la columna [[Puntaje]] de la lista de [[Clientes]], en computadora.",
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
    numero: 6,
    grupo: "ocasional",
    titulo: "La calculadora de tasa",
    resumen:
      "Para pasar de dólares o euros a bolívares con la tasa del día, sin buscarla en otro lado.",
    pasos: [
      { texto: "En [[Cartera]], arriba, está la tasa del día. Pulsa [[Calcular]]." },
      { texto: "En [[Tú pones]] escribe el monto." },
      {
        texto: "Abajo sale el resultado convertido.",
        pista: "También funciona al revés: escribe los bolívares y te dice cuántos dólares son.",
      },
      { texto: "Con [[Compartir]] lo mandas por WhatsApp tal cual." },
    ],
    notas: [
      {
        titulo: "Los fines de semana y feriados",
        texto:
          "El BCV no publica sábados, domingos ni festivos. Esos días verás la última tasa publicada, y la app te lo dice.",
      },
    ],
  },
  {
    slug: "importar-tu-libreta",
    numero: 7,
    grupo: "una-vez",
    titulo: "Importar tu libreta con una foto",
    resumen:
      "Le tomas una foto a tu libreta como está hoy y Sevenz arma la cartera. No reescribes nada.",
    pasos: [
      { texto: "Entra a [[Importar cartera]]." },
      {
        texto: "Elige la [[Moneda de toda la libreta]].",
        pista: "Es la misma para todas las fotos de esa tanda.",
      },
      { texto: "Toma o sube las fotos. Hasta 6 por tanda." },
      { texto: "Espera. Vas a ver [[En cola…]], luego [[Leyendo con IA…]] y al final [[Listo]]." },
      {
        texto:
          "Revisa la tabla: [[Cliente]], [[Cédula/documento]], [[Detalle]] y [[Saldo calculado]].",
        pista: "Corrige lo que haya leído mal. Es más rápido arreglar dos nombres que escribir treinta.",
      },
      { texto: "Confirma y tu cartera queda cargada." },
    ],
    notas: [
      {
        titulo: "Cinco fotos al mes en el plan gratis",
        texto:
          "Arriba dice [[Fotos usadas este mes (plan Free)]]. Si subes la libreta entera de una vez, te quedas sin cuota para la hoja de la semana que viene. Ve por partes.",
      },
    ],
  },
  {
    slug: "la-papelera",
    numero: 8,
    grupo: "una-vez",
    titulo: "La papelera",
    resumen:
      "Para sacar de la vista a un cliente que ya no te interesa seguir, sin perder su historial.",
    pasos: [
      { texto: "Entra al cliente, pulsa [[Más]] y luego [[Mover a papelera]]." },
      { texto: "Confirma. Desaparece de [[Cartera]] y de [[Clientes]]." },
      { texto: "Cuando lo quieras de vuelta, entra a [[Papelera]] y pulsa [[Restaurar]]." },
    ],
    cierre: ["Mover a la papelera no borra nada: sus fiados, sus abonos y su link siguen ahí."],
    notas: [
      {
        titulo: "Ocultar definitivamente sí es para siempre",
        texto:
          "Dentro de la papelera hay [[Ocultar definitivamente]]. Eso lo saca también de la papelera y ya no lo puedes restaurar tú. Úsalo solo si estás seguro.",
        cuidado: true,
      },
    ],
  },
  {
    slug: "mi-negocio",
    numero: 9,
    grupo: "una-vez",
    titulo: "Mi negocio: tus datos",
    resumen:
      "Lo llenas una vez. Parte de esto lo ve tu cliente en su link, así que vale el minuto.",
    pasos: [
      { texto: "Entra a [[Mi negocio]]." },
      {
        texto:
          "En [[Datos del negocio]] revisa [[Nombre del negocio]], [[Nombre]], [[Apellido]] y [[WhatsApp]].",
      },
      { texto: "Sube tu [[Logo del negocio (opcional)]]." },
      {
        texto: "Llena [[Método de pago (opcional)]] — por ejemplo tu Pago Móvil o tu Nequi.",
        pista: "Este sí se le muestra a tu cliente en su saldo. Es para que sepa a dónde pagarte.",
      },
      { texto: "Completa [[Dirección del negocio (opcional)]] y [[NIT/RUT (opcional)]] si aplican." },
      { texto: "Pulsa [[Guardar y salir]]." },
    ],
    cierre: [
      "En [[Tasa de cambio]] eliges si usas la del BCV automática o [[Mi propia tasa]].",
    ],
    notas: [
      {
        titulo: "El país no se cambia",
        texto:
          "Se elige al crear la cuenta y queda fijo, porque de él dependen la moneda y las reglas. Si te equivocaste, escríbenos.",
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
