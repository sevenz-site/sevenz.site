import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Términos y Condiciones — Sevenz",
  description:
    "Términos y Condiciones de uso de la plataforma Sevenz: objeto del servicio, responsabilidades del Comercio, uso de WhatsApp, planes y tratamiento de datos.",
  alternates: {
    canonical: "/terminos-y-condiciones",
  },
};

export default function TerminosYCondicionesPage() {
  return (
    <LegalLayout
      eyebrow="Fase de validación (beta)"
      title="Términos y Condiciones de Uso de Sevenz"
      updated="28 agosto 2026"
    >
      <blockquote>
        <strong>Nota de estado del proyecto:</strong> Sevenz se encuentra actualmente en fase de
        validación (piloto/beta) y es operado por su equipo fundador mientras se constituye
        formalmente la entidad legal que asumirá la operación de la Plataforma. Esta sección de
        los Términos será actualizada con la razón social, identificación tributaria (NIT/RIF) y
        domicilio en cuanto dicha entidad quede constituida. Mientras tanto, este documento se
        ofrece como marco de referencia para el uso de la Plataforma durante esta etapa, y{" "}
        <strong>no sustituye la revisión de un abogado local</strong> — en particular antes de
        activar cobros, suscripciones, reportes crediticios o campañas masivas por WhatsApp.
      </blockquote>

      <p>
        Bienvenido/a a Sevenz. Estos Términos y Condiciones regulan el acceso y uso del sitio web,
        aplicación, funcionalidades, integraciones y servicios asociados a Sevenz (en conjunto, la
        &ldquo;Plataforma&rdquo;).
      </p>
      <p>
        Durante esta fase de validación, Sevenz es operada por su equipo fundador
        (&ldquo;Sevenz&rdquo;, &ldquo;nosotros&rdquo; o &ldquo;el Operador&rdquo;), en proceso de
        constitución de la entidad legal definitiva.
      </p>
      <p>
        Al crear una cuenta, acceder o utilizar la Plataforma, usted declara que ha leído,
        entendido y aceptado estos Términos y Condiciones, así como nuestra{" "}
        <Link href="/politica-de-privacidad">Política de Privacidad</Link>. Si no está de acuerdo,
        no deberá utilizar la Plataforma.
      </p>

      <h2>1. Objeto de Sevenz</h2>
      <p>
        Sevenz ofrece herramientas digitales para que negocios, comercios y emprendimientos
        registren, organicen, consulten y comuniquen información relacionada con saldos, fiados,
        pagos, clientes y cuentas por cobrar.
      </p>
      <p>La Plataforma puede permitir, entre otras funcionalidades:</p>
      <ul>
        <li>Crear y administrar perfiles de clientes.</li>
        <li>Registrar ventas a crédito, abonos, pagos, saldos y movimientos.</li>
        <li>Consultar el historial de una cuenta.</li>
        <li>
          Compartir con el cliente información sobre su saldo mediante WhatsApp u otros canales
          habilitados.
        </li>
        <li>
          Generar recordatorios, resúmenes, reportes o comunicaciones relacionadas con las cuentas
          registradas por el Comercio.
        </li>
      </ul>
      <p>
        Sevenz facilita la gestión de información;{" "}
        <strong>
          no es una entidad financiera, banco, cooperativa, prestamista, casa de cobro, central de
          riesgo ni agencia de cobranza.
        </strong>
      </p>

      <h2>2. Definiciones</h2>
      <ul>
        <li>
          <strong>&ldquo;Comercio&rdquo;</strong>: la persona natural o jurídica que crea una
          cuenta para administrar su negocio mediante Sevenz.
        </li>
        <li>
          <strong>&ldquo;Usuario&rdquo;</strong>: cualquier persona que accede o utiliza la
          Plataforma, incluyendo Comercios, administradores, empleados autorizados y clientes
          finales.
        </li>
        <li>
          <strong>&ldquo;Cliente Final&rdquo;</strong>: la persona cuyos datos, saldos, movimientos
          o pagos son registrados por un Comercio en la Plataforma.
        </li>
        <li>
          <strong>&ldquo;Contenido del Comercio&rdquo;</strong>: toda información ingresada,
          cargada o generada por el Comercio, incluidos nombres, teléfonos, montos, fechas, notas,
          productos, movimientos y comunicaciones.
        </li>
        <li>
          <strong>&ldquo;Saldo&rdquo;</strong>: el valor que el Comercio registra como pendiente de
          pago o a favor de un Cliente Final.
        </li>
        <li>
          <strong>&ldquo;Canales de Terceros&rdquo;</strong>: servicios externos, incluidos
          WhatsApp, Meta, proveedores de mensajería, pasarelas de pago, servicios de nube,
          analítica y autenticación.
        </li>
      </ul>

      <h2>3. Elegibilidad y creación de cuenta</h2>
      <p>Al usar Sevenz, usted declara que:</p>
      <ul>
        <li>
          Tiene al menos 18 años de edad o cuenta con capacidad legal suficiente para contratar
          conforme a la legislación aplicable.
        </li>
        <li>
          La información que proporciona es verdadera, exacta, completa y se mantiene actualizada.
        </li>
        <li>
          Si actúa en nombre de una empresa, tiene autorización suficiente para aceptar estos
          Términos en nombre de dicha organización.
        </li>
        <li>
          Utilizará la Plataforma únicamente con fines legítimos, comerciales o personales
          permitidos por la ley.
        </li>
        <li>
          No utilizará Sevenz para registrar, perseguir, acosar, amenazar, discriminar, engañar o
          afectar indebidamente a otras personas.
        </li>
      </ul>
      <p>
        Cada Comercio es responsable de mantener la confidencialidad de sus credenciales.
        Cualquier actividad realizada desde su cuenta se presumirá realizada por el titular o por
        una persona autorizada por este, salvo prueba en contrario.
      </p>

      <h2>4. Responsabilidad del Comercio sobre los datos registrados</h2>
      <p>El Comercio reconoce y acepta que es el único responsable de:</p>
      <ul>
        <li>La exactitud, integridad, actualidad y licitud de los datos que registre en Sevenz.</li>
        <li>
          La existencia, validez y exigibilidad de las ventas, créditos, fiados, saldos, deudas,
          abonos, acuerdos o transacciones que registre.
        </li>
        <li>
          Conservar los soportes que acrediten las transacciones (facturas, recibos, comprobantes,
          conversaciones, pedidos o autorizaciones).
        </li>
        <li>
          Corregir oportunamente cualquier error en el saldo, movimiento, teléfono, identidad o
          historial de un Cliente Final.
        </li>
        <li>
          Obtener las autorizaciones o bases jurídicas aplicables para tratar datos personales de
          sus clientes y comunicarse con ellos.
        </li>
        <li>
          Atender reclamaciones de sus clientes relacionadas con ventas, precios, entregas,
          garantías, pagos, saldos o cobros.
        </li>
      </ul>
      <p>
        Sevenz no verifica de manera independiente si una venta ocurrió, si un saldo es correcto,
        si una deuda existe o si un pago fue realizado. La información mostrada refleja los datos
        registrados por el Comercio.
      </p>

      <h2>5. Sevenz no otorga crédito ni garantiza pagos</h2>
      <p>
        Sevenz no otorga, aprueba, negocia, compra, asegura ni garantiza créditos, préstamos,
        fiados, deudas o pagos entre el Comercio y sus Clientes Finales.
      </p>
      <p>
        La decisión de vender fiado, otorgar crédito, entregar bienes o servicios, aceptar abonos,
        cobrar un saldo o perdonar una deuda corresponde exclusivamente al Comercio. El uso de
        Sevenz no crea relación financiera, laboral, societaria, de mandato, representación,
        agencia, cobranza o intermediación crediticia entre Sevenz y ninguna de las partes.
      </p>
      <p>
        Sevenz tampoco garantiza que un Cliente Final pagará un saldo, que un mensaje será leído o
        entregado por WhatsApp, o que un dato registrado sea suficiente para exigir judicial o
        extrajudicialmente un pago.
      </p>

      <h2>6. Uso de WhatsApp y comunicaciones</h2>
      <p>
        Cuando el Comercio utilice funciones de comunicación por WhatsApp u otros Canales de
        Terceros, acepta que:
      </p>
      <ul>
        <li>Debe contar con autorización o base jurídica válida para comunicarse con cada destinatario.</li>
        <li>Debe proporcionar información clara, respetuosa, veraz y no engañosa.</li>
        <li>
          No puede enviar comunicaciones masivas no solicitadas, contenido ilícito, amenazas,
          hostigamiento, contenido discriminatorio ni prácticas de cobranza abusiva.
        </li>
        <li>Debe respetar las políticas de WhatsApp, Meta y cualquier proveedor tercero aplicable.</li>
        <li>Es responsable por los textos, montos, enlaces y demás contenidos que envíe a sus clientes.</li>
      </ul>
      <p>
        Sevenz no controla las políticas, disponibilidad o decisiones de WhatsApp, Meta u otros
        Canales de Terceros; su suspensión o falla no genera responsabilidad para Sevenz.
      </p>

      <h2>7. Comunicaciones de Sevenz al Comercio</h2>
      <p>
        Al crear una cuenta, el Comercio acepta que Sevenz podrá enviarle comunicaciones
        relacionadas con el uso de la Plataforma, mediante correo electrónico, WhatsApp u otros
        canales que el Comercio haya proporcionado, incluyendo:
      </p>
      <ul>
        <li>
          <strong>Notificaciones operativas y transaccionales</strong>: alertas de saldo,
          movimientos registrados, abonos recibidos, errores de sincronización, cambios de tasa de
          cambio y avisos de seguridad de la cuenta.
        </li>
        <li>
          <strong>Comunicaciones de producto</strong>: tutoriales, recomendaciones de uso,
          actualizaciones de funcionalidades y encuestas de satisfacción.
        </li>
        <li>
          <strong>Comunicaciones comerciales</strong>: promociones, invitaciones a nuevos planes o
          funciones, y contenido informativo sobre gestión de crédito y cobranza.
        </li>
      </ul>
      <p>
        Las comunicaciones operativas y transaccionales son necesarias para el funcionamiento del
        servicio y no pueden desactivarse mientras la cuenta esté activa. Las comunicaciones de
        producto y comerciales podrán desactivarse en cualquier momento desde la configuración de
        la cuenta o solicitándolo a{" "}
        <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a>, sin que ello afecte el uso
        de las funcionalidades esenciales de la Plataforma.
      </p>
      <p>
        Cuando estas comunicaciones se envíen por WhatsApp, Sevenz observará adicionalmente las
        políticas de uso y opt-in para mensajería comercial de WhatsApp/Meta, independientemente de
        lo dispuesto en este documento.
      </p>

      <h2>8. Uso aceptable y prohibiciones</h2>
      <p>El Usuario se obliga a no utilizar Sevenz para:</p>
      <ul>
        <li>Registrar datos falsos, suplantar a terceros o atribuir deudas inexistentes.</li>
        <li>Acceder a cuentas, datos o sistemas sin autorización.</li>
        <li>Realizar actividades fraudulentas, ilegales o que vulneren derechos de terceros.</li>
        <li>Enviar mensajes de cobro ofensivos, amenazantes, intimidatorios o desproporcionados.</li>
        <li>
          Vulnerar la privacidad, el honor, la intimidad o los derechos de imagen o autor de
          terceros.
        </li>
        <li>
          Registrar datos sensibles innecesarios (salud, biométricos, orientación sexual, creencias
          religiosas, afiliación política, datos de menores) sin justificación legal y
          autorización válida.
        </li>
        <li>
          Usar la Plataforma para reportar personas en centrales de riesgo o listas de morosos sin
          cumplir la legislación aplicable.
        </li>
        <li>Interferir con la seguridad o funcionamiento de la Plataforma.</li>
        <li>Copiar, descompilar, revender o explotar comercialmente la Plataforma sin autorización escrita.</li>
        <li>Usar bots, scrapers o automatizaciones no autorizadas para extraer información.</li>
        <li>Eludir límites técnicos, controles de seguridad o mecanismos de autenticación.</li>
      </ul>
      <p>
        Sevenz podrá suspender, restringir o cancelar cuentas que incumplan estos Términos, sin
        perjuicio de las acciones legales que correspondan.
      </p>

      <h2>9. Planes, pagos, renovaciones y cancelación</h2>
      <p>
        Durante esta fase de validación, Sevenz ofrece un <strong>plan gratuito</strong> con
        funcionalidades limitadas (incluyendo un número mensual limitado de importaciones de
        libreta por foto, sujeto a cambios). Cualquier plan de pago futuro será anunciado con
        anticipación, indicando precio, moneda, impuestos aplicables, periodicidad y condiciones de
        cancelación, <strong>antes</strong> de que el Usuario deba pagar.
      </p>
      <p>Si en el futuro se activan suscripciones pagas:</p>
      <ul>
        <li>Podrán renovarse automáticamente al final de cada período contratado, salvo indicación contraria.</li>
        <li>
          El Usuario podrá cancelar la renovación futura desde su cuenta o escribiendo a{" "}
          <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a>.
        </li>
        <li>
          La cancelación evita cobros futuros, pero no genera necesariamente reembolso de períodos
          ya iniciados, salvo que la ley aplicable exija lo contrario.
        </li>
        <li>
          Para consumidores en Colombia, Sevenz respetará los derechos irrenunciables de
          información, reclamación, retracto y protección al consumidor que resulten aplicables
          conforme al Estatuto del Consumidor.
        </li>
      </ul>

      <h2>10. Tratamiento de datos personales</h2>
      <p>
        Sevenz tratará los datos personales de los Usuarios conforme a su{" "}
        <Link href="/politica-de-privacidad">Política de Privacidad</Link>.
      </p>
      <ul>
        <li>
          El Comercio normalmente actúa como responsable de los datos personales de sus Clientes
          Finales, al decidir qué información recolecta y con qué finalidad.
        </li>
        <li>
          Sevenz puede actuar como encargado o proveedor tecnológico respecto de los datos que el
          Comercio cargue en la Plataforma.
        </li>
        <li>
          El Comercio autoriza a Sevenz a tratar los datos estrictamente necesarios para prestar,
          mantener, proteger y mejorar la Plataforma, prevenir fraude y cumplir obligaciones
          legales.
        </li>
        <li>
          Sevenz utiliza proveedores tecnológicos de terceros (infraestructura en la nube,
          procesamiento de imágenes mediante inteligencia artificial, y servicios de mensajería)
          para operar la Plataforma. La lista de proveedores podrá actualizarse conforme evolucione
          el producto.
        </li>
      </ul>
      <p>
        En Colombia, la Ley 1581 de 2012 regula el tratamiento de datos personales; la
        Superintendencia de Industria y Comercio es la autoridad competente. En Venezuela no existe
        actualmente una ley general equivalente, aunque la Constitución reconoce el derecho de
        acceso, conocimiento y corrección de datos en registros públicos o privados.
      </p>
      <p>
        Nada en estos Términos autoriza al Comercio a recolectar o utilizar datos personales sin
        cumplir sus propias obligaciones legales frente a sus clientes.
      </p>

      <h2>11. Solicitudes de titulares y corrección de saldos</h2>
      <p>
        Los Clientes Finales podrán solicitar al Comercio la consulta, actualización, corrección o
        aclaración de la información registrada sobre ellos. El Comercio es el primer responsable
        de atender estas solicitudes.
      </p>
      <p>
        Sevenz podrá brindar herramientas técnicas para facilitar correcciones, pero no está
        obligado a resolver controversias comerciales entre un Comercio y su Cliente Final.
        Cualquier persona que considere que su información se usa indebidamente puede escribir a{" "}
        <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a> indicando su nombre, medio
        de contacto, Comercio involucrado, descripción de la solicitud y soportes disponibles.
      </p>

      <h2>12. Propiedad intelectual</h2>
      <p>
        La Plataforma, su software, interfaz, diseño, marca, logotipos, textos, bases de datos y
        funcionalidades están protegidos por normas de propiedad intelectual.
      </p>
      <p>
        Sevenz otorga al Usuario una licencia limitada, personal, revocable, no exclusiva e
        intransferible para utilizar la Plataforma únicamente durante la vigencia de su cuenta y
        conforme a estos Términos.
      </p>
      <p>
        El Comercio conserva los derechos sobre su Contenido del Comercio. Al cargarlo, otorga a
        Sevenz una autorización limitada para alojarlo, procesarlo y mostrarlo únicamente en la
        medida necesaria para operar la Plataforma.
      </p>

      <h2>13. Disponibilidad, seguridad y respaldo</h2>
      <p>
        Sevenz procurará mantener la Plataforma disponible mediante medidas técnicas razonables,
        pero no garantiza disponibilidad ininterrumpida, funcionamiento libre de errores, ni
        entrega efectiva de mensajes a través de servicios de terceros.
      </p>
      <p>
        El Comercio debe conservar sus propios soportes comerciales, contables y probatorios.
        Sevenz no reemplaza obligaciones legales, tributarias o contables del Comercio.
      </p>

      <h2>14. Limitación de responsabilidad</h2>
      <p>En la máxima medida permitida por la ley, Sevenz no será responsable por:</p>
      <ul>
        <li>Saldos incorrectos, deudas inexistentes o errores de digitación ingresados por el Comercio.</li>
        <li>Conflictos entre un Comercio y sus Clientes Finales.</li>
        <li>Falta de pago, insolvencia o incumplimiento de Clientes Finales.</li>
        <li>Suspensiones o fallas de WhatsApp, Meta u otros Canales de Terceros.</li>
        <li>Daños por uso indebido de credenciales.</li>
        <li>Lucro cesante, pérdida de oportunidad o daños indirectos, salvo norma imperativa en contrario.</li>
      </ul>
      <p>
        Nada de esto limita derechos que no puedan limitarse legalmente, incluidos derechos de
        consumidores.
      </p>

      <h2>15. Indemnidad</h2>
      <p>
        El Comercio se obliga a defender e indemnizar a Sevenz frente a reclamaciones derivadas de:
        datos ingresados sin autorización o en violación de la ley; comunicaciones enviadas a sus
        Clientes Finales; cobros indebidos o disputas comerciales; incumplimiento de estos
        Términos; o uso fraudulento de la Plataforma.
      </p>

      <h2>16. Suspensión y terminación</h2>
      <p>
        El Usuario puede cancelar su cuenta en cualquier momento desde la Plataforma o escribiendo
        a <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a>. Sevenz podrá suspender el
        acceso ante fraude, riesgo de seguridad, incumplimiento de estos Términos o requerimiento de
        autoridad competente.
      </p>
      <p>
        Tras la terminación, Sevenz podrá conservar cierta información por el tiempo necesario para
        cumplir obligaciones legales o resolver disputas. Antes de cancelar, el Comercio deberá
        exportar o solicitar copia de la información que requiera conservar.
      </p>

      <h2>17. Modificaciones</h2>
      <p>
        Sevenz podrá actualizar estos Términos cuando sea necesario. Cuando el cambio sea
        sustancial, se informará mediante la Plataforma o correo electrónico antes de su entrada en
        vigor. El uso continuado después de esa fecha constituye aceptación de los nuevos Términos.
      </p>

      <h2>18. Ley aplicable y resolución de controversias</h2>
      <p>
        Mientras se constituye la entidad legal definitiva, estos Términos se interpretarán de
        buena fe conforme a los principios generales de protección al consumidor y protección de
        datos aplicables en Colombia y Venezuela, según el país de residencia del Usuario. Esta
        cláusula será actualizada una vez formalizada la entidad operadora, indicando la ley
        aplicable definitiva.
      </p>
      <p>
        Las partes procurarán resolver cualquier controversia mediante comunicación directa a{" "}
        <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a> durante al menos quince (15)
        días hábiles antes de acudir a autoridades administrativas o judiciales competentes. Los
        consumidores conservan los derechos y mecanismos de reclamación que la ley les reconozca.
      </p>

      <h2>19. Contacto</h2>
      <p>Para preguntas, solicitudes o reclamos relacionados con Sevenz:</p>
      <ul>
        <li>
          Correo electrónico: <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a>
        </li>
        <li>+57 323 813 0265</li>
      </ul>

      <p className="mt-10! text-sm italic">
        Este documento no constituye asesoría legal. Antes de activar cobros, suscripciones,
        reportes crediticios o campañas masivas de mensajería, se recomienda revisión por un
        abogado en Colombia y, si Sevenz opera o factura en Venezuela, asesoría legal venezolana
        adicional.
      </p>
    </LegalLayout>
  );
}
