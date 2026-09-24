import type { Metadata } from "next";
import { OG_IMAGE } from "@/lib/config";
import { LegalLayout } from "@/components/legal/legal-layout";

export const metadata: Metadata = {
  title: "Política de Privacidad — Sevenz",
  description:
    "Política de Privacidad de Sevenz: qué datos personales recopilamos, cómo los usamos, con quién los compartimos y cómo ejercer tus derechos.",
  alternates: {
    canonical: "/politica-de-privacidad",
  },
  // `openGraph` propio, aunque repita el título y la descripción de arriba.
  //
  // Next hereda del layout raíz lo que una página no declare, así que hasta
  // hoy compartir este enlace por WhatsApp enseñaba el título de la PORTADA:
  // el enlace decía una cosa y la vista previa, otra. La imagen sí se hereda a
  // propósito — es la misma para todo el sitio.
  openGraph: {
    title: "Política de Privacidad — Sevenz",
    description:
      "Qué datos personales recopila Sevenz, cómo los usamos, con quién los compartimos y cómo ejercer tus derechos.",
    url: "/politica-de-privacidad",
    images: [OG_IMAGE],
  },
};

export default function PoliticaDePrivacidadPage() {
  return (
    <LegalLayout
      eyebrow="Fase de validación (beta)"
      title="Política de Privacidad de Sevenz"
      updated="15 septiembre 2026"
    >
      <blockquote>
        <strong>Nota de estado del proyecto:</strong> Sevenz se encuentra en fase de validación
        (piloto/beta), operado por su equipo fundador mientras se constituye la entidad legal
        definitiva. Esta política será actualizada con los datos de dicha entidad una vez
        formalizada. Este documento no sustituye asesoría legal — se recomienda revisión por un
        abogado en Colombia (Ley 1581 de 2012) antes de escalar el uso de datos, activar cobros o
        campañas de publicidad dirigida.
      </blockquote>

      <p>
        Esta Política de Privacidad explica qué datos personales recopila Sevenz
        (&ldquo;nosotros&rdquo;, &ldquo;la Plataforma&rdquo;), cómo los usamos, con quién los
        compartimos y cómo puede ejercer sus derechos sobre ellos. Aplica tanto a quienes crean una
        cuenta en Sevenz (&ldquo;Comercio&rdquo;) como a las personas cuyos datos un Comercio
        registra dentro de la Plataforma (&ldquo;Cliente Final&rdquo;) — esta segunda persona nunca
        aceptó directamente estos Términos, pero sus datos igual están protegidos por esta
        política.
      </p>

      <h2>1. Datos que recopilamos</h2>
      <p>
        <strong>Del Comercio (quien crea la cuenta):</strong>
      </p>
      <ul>
        <li>Nombre y apellido del titular de la cuenta</li>
        <li>Nombre del negocio y logo (opcional)</li>
        <li>País de operación (definido al registrarse; su cambio posterior requiere contactar a soporte)</li>
        <li>
          Número de WhatsApp del negocio —{" "}
          <strong>
            se usa para enviarle los avisos de Sevenz y se muestra en el link de saldo de sus
            clientes, de forma pública para quien tenga el link, como botón para escribirle al
            negocio
          </strong>
        </li>
        <li>Correo electrónico y contraseña</li>
        <li>Dirección del negocio (opcional)</li>
        <li>NIT/RUT (opcional)</li>
        <li>
          Información de método de pago que el Comercio decide publicar para sus clientes (ej.
          número de cuenta o Nequi) —{" "}
          <strong>
            este campo se muestra en el link de saldo del cliente, de forma pública para quien
            tenga el link
          </strong>
        </li>
        <li>Fotografías de libretas o registros físicos que decida subir para importar su cartera</li>
        <li>Configuración de tasa de cambio: automática (BCV) o personalizada por el negocio</li>
        <li>
          Si aceptó recibir el resumen de su cartera por WhatsApp: la fecha en que lo aceptó,{" "}
          <strong>el texto exacto que leyó al aceptarlo</strong> y, si después lo desactivó, la
          fecha en que lo hizo. Guardamos el texto y no solo la fecha porque la redacción de esa
          pantalla puede cambiar con el tiempo, y lo que debe poder demostrarse es lo que esa
          persona leyó, no lo que diga la pantalla hoy
        </li>
        <li>
          Datos de su suscripción: plan contratado, precio acordado, periodicidad de cobro,
          fecha de fin del periodo de prueba, y el registro de cada pago con su monto, método
          y fecha
        </li>
        <li>
          Comprobantes y notas internas asociados a esa suscripción — por ejemplo el recibo de
          un pago que el Comercio nos envía, o la razón por la que su cuenta pasó a solo
          lectura.{" "}
          <strong>Las notas internas no se muestran al Comercio dentro de la Plataforma</strong>,
          pero puede solicitarlas ejerciendo los derechos de la Sección 8
        </li>
        <li>
          Datos de uso de la Plataforma (páginas visitadas, acciones realizadas, dispositivo,
          dirección IP aproximada)
        </li>
      </ul>
      <p>
        <strong>Del Cliente Final (registrado por el Comercio, no por sí mismo):</strong>
      </p>
      <ul>
        <li>Nombre y número de WhatsApp</li>
        <li>Montos de movimientos, abonos y saldos registrados por el Comercio</li>
        <li>Historial de esos movimientos</li>
        <li>
          Cédula/documento de identidad —{" "}
          <strong>
            si el Comercio no lo registró, se le solicita directamente al Cliente Final al abrir
            el link de saldo compartido
          </strong>
          , mediante un formulario obligatorio para poder ver el saldo. Este dato, una vez
          ingresado, nunca se vuelve a solicitar.
        </li>
        <li>
          Fotografía del Cliente Final, si el Comercio decide agregarla a su ficha —{" "}
          <strong>
            se almacena en un espacio accesible mediante enlace directo, del mismo modo que el
            logo del Comercio
          </strong>
          . Es opcional: la ficha funciona igual sin ella, y el Comercio puede eliminarla en
          cualquier momento, lo que borra el archivo.
        </li>
        <li>
          Las respuestas que el Cliente Final decida escribirnos desde el link de saldo, cuando le
          preguntamos qué le gustaría poder hacer en Sevenz —{" "}
          <strong>es voluntario y el saldo se ve igual sin responder</strong>. Se guarda el texto
          que escriba, asociado a su ficha. Usamos esas respuestas únicamente para decidir qué
          construir: no se publican, no se muestran al Comercio y no se usan para contactar a
          nadie.
        </li>
      </ul>
      <p>
        El Comercio es quien decide qué información de sus clientes ingresa a la Plataforma, y es
        responsable de haber obtenido el consentimiento del Cliente Final para ingresarla. Esto
        aplica de forma particular a la fotografía: Sevenz no la solicita, no la exige y no la usa
        para identificar a nadie — solo la muestra en la ficha que el Comercio ve. Sevenz
        solo recopila datos directamente del Cliente Final en tres casos: cuando visita el link de
        saldo que el Comercio le comparte (aplican los puntos de analítica descritos abajo), cuando
        ese link le solicita su cédula/documento por no estar aún registrado, y cuando responde de
        forma voluntaria a la pregunta sobre qué le gustaría hacer en Sevenz — los tres, como se
        describe arriba.
      </p>

      <h2>2. Cómo recopilamos los datos</h2>
      <ul>
        <li>Directamente del Comercio: formulario de registro, formularios de la app, fotos que sube.</li>
        <li>
          Directamente del Cliente Final: únicamente su cédula/documento, mediante el formulario
          que aparece al abrir el link de saldo si el Comercio no lo registró de antemano.
        </li>
        <li>
          De forma automática: mediante herramientas de analítica cuando cualquier Usuario
          (Comercio o Cliente Final) navega la Plataforma — ver Sección 6.
        </li>
      </ul>

      <h2>3. Para qué usamos los datos</h2>
      <ul>
        <li>
          Operar la Plataforma: crear cuentas, procesar fotos de libretas mediante inteligencia
          artificial para extraer movimientos, calcular saldos y tasas de cambio, generar el link
          de saldo del cliente, y mostrar la fotografía del cliente en su ficha cuando el Comercio
          la haya agregado.
        </li>
        <li>
          Comunicarnos con el Comercio (ver Sección 7 de los Términos y Condiciones):
          notificaciones operativas, de producto y comerciales. Incluye el{" "}
          <strong>resumen de su cartera por WhatsApp</strong> —cobros pendientes y plazos
          vencidos—, que solo se envía si el Comercio lo aceptó y que puede desactivar en
          cualquier momento desde <em>Mi negocio</em>.
        </li>
        <li>Mejorar el producto: entender patrones de uso agregados, identificar errores, priorizar funcionalidades.</li>
        <li>
          Administrar la suscripción del Comercio: aplicar el plan que tiene contratado,
          registrar los pagos recibidos y dejar constancia de por qué una cuenta pasó a solo
          lectura o volvió a estar activa.
        </li>
        <li>Prevenir fraude y cumplir obligaciones legales.</li>
        <li>A futuro: mostrar publicidad relevante de Sevenz en canales digitales (ver Sección 6).</li>
      </ul>

      <h2>4. Con quién compartimos los datos</h2>
      <p>
        Usamos proveedores externos para operar la Plataforma, quienes procesan datos por nuestra
        instrucción, no por cuenta propia:
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Proveedor</th>
              <th>Función</th>
              <th>Datos que procesa</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Supabase</td>
              <td>Base de datos y autenticación</td>
              <td>Todos los datos de cuenta, movimientos y clientes</td>
            </tr>
            <tr>
              <td>Proveedor de IA (vía OpenRouter/Gemini)</td>
              <td>Extracción de datos desde fotos de libretas</td>
              <td>Contenido de las fotos subidas por el Comercio</td>
            </tr>
            <tr>
              <td>Vercel</td>
              <td>Alojamiento de la aplicación web</td>
              <td>Datos técnicos de navegación</td>
            </tr>
            <tr>
              <td>Kapso</td>
              <td>Envío de los mensajes de WhatsApp de Sevenz al Comercio</td>
              <td>
                Número de WhatsApp del Comercio, su nombre y las cifras del resumen (monto por
                cobrar y cantidad de clientes con plazo vencido)
              </td>
            </tr>
            <tr>
              <td>WhatsApp / Meta</td>
              <td>Entrega del mensaje al teléfono del Comercio</td>
              <td>Los mismos datos que Kapso le transmite para poder entregarlos</td>
            </tr>
            <tr>
              <td>Mixpanel</td>
              <td>Analítica de producto</td>
              <td>Datos de uso y comportamiento dentro de la app</td>
            </tr>
            <tr>
              <td>Microsoft Clarity</td>
              <td>Analítica de comportamiento (mapas de calor, grabación de sesión)</td>
              <td>Interacciones en pantalla — ver nota de seguridad abajo</td>
            </tr>
            <tr>
              <td>Meta Pixel y otras herramientas de publicidad (a futuro)</td>
              <td>Medición y segmentación de anuncios</td>
              <td>Datos de navegación para fines publicitarios</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sevenz no vende datos personales a terceros. No compartimos datos de Clientes Finales con
        fines publicitarios.
      </p>
      <p>
        <strong>Nota de seguridad sobre grabación de sesión:</strong> Microsoft Clarity puede
        grabar visualmente la interacción en pantalla. Los campos que muestran nombres de clientes
        y montos de saldo están configurados con enmascaramiento estricto, por lo que esta
        herramienta no captura ni transmite datos financieros reales de terceros al proveedor
        externo de analítica.
      </p>

      <h2>5. Transferencia internacional de datos</h2>
      <p>
        Los datos se almacenan en servidores de Supabase ubicados en Estados Unidos. Esto implica
        una transferencia internacional de datos personales fuera de Colombia y Venezuela. Al usar
        la Plataforma, el Usuario acepta esta transferencia, necesaria para la operación del
        servicio. Sevenz exige a sus proveedores medidas de seguridad razonables para proteger la
        información durante este tratamiento.
      </p>

      <h2>6. Cookies y tecnologías de rastreo</h2>
      <p>
        Usamos Mixpanel y Microsoft Clarity para entender cómo se usa la Plataforma, tanto en el
        sitio web público (sevenz.site) como dentro de la aplicación (app.sevenz.site). A futuro,
        incorporaremos Meta Pixel y herramientas similares para medir y dirigir publicidad en
        canales digitales.
      </p>
      <ul>
        <li>
          <strong>En el sitio web público (sevenz.site):</strong> usamos Microsoft Clarity para
          analizar cómo los visitantes navegan el sitio (mapas de calor, grabación de sesión),
          incluida la página de la Calculadora de Dólar BCV (
          <code>/calculadora-dolar-bcv</code>). Antes de activar Meta Pixel u otras herramientas de
          publicidad, se incorporará un banner de consentimiento que permita a los visitantes
          aceptar o rechazar cookies no esenciales antes de que estas herramientas se activen.
        </li>
        <li>
          <strong>Dentro de la aplicación (app.sevenz.site):</strong> el uso de Mixpanel y Clarity
          queda informado en esta política, aceptada al crear la cuenta. El Comercio puede
          desactivar la analítica de uso desde un control en Ajustes de su cuenta.
        </li>
      </ul>

      <h2>7. Conservación de los datos</h2>
      <p>
        Conservamos los datos mientras la cuenta del Comercio esté activa, y también cuando deja de
        estarlo. Si un Comercio termina su periodo de prueba sin contratar, o deja de pagar su
        suscripción, su cuenta pasa a <strong>solo lectura</strong>: puede seguir consultando su
        cartera y su historial, pero no registrar nuevos movimientos. Los datos no se borran por
        ese motivo.
      </p>
      <p>
        La razón es que el historial de fiados y abonos es el registro del dinero que al Comercio le
        deben sus clientes. Borrarlo porque dejó de pagar una suscripción le quitaría algo que es
        suyo y que puede necesitar mucho después. Por eso lo conservamos de forma indefinida, salvo
        que el Comercio pida expresamente su eliminación.
      </p>
      <p>
        Los datos de la suscripción —pagos, comprobantes y el motivo de un cambio de estado—
        se conservan como constancia de lo cobrado y de lo acordado, por si más adelante hay que
        responder por ello. Se rigen por la misma solicitud de eliminación descrita a
        continuación.
      </p>
      <p>
        Las respuestas que un Cliente Final nos escribe voluntariamente sobre qué le gustaría
        poder hacer en Sevenz se conservan aunque su ficha desaparezca, pero{" "}
        <strong>desasociadas de ella</strong>: si el Comercio borra al cliente, el texto deja de
        estar vinculado a ninguna persona y queda solo como una idea suelta. La razón es que esas
        respuestas orientan qué construimos, y perderlas porque un Comercio depuró su cartera
        borraría el motivo de decisiones ya tomadas. Si prefiere que se elimine por completo,
        puede pedirlo igual que cualquier otro dato.
      </p>
      <p>
        El registro del consentimiento para recibir mensajes por WhatsApp —la fecha y el texto que
        el Comercio leyó— <strong>se conserva aunque después lo desactive</strong>. La razón es que
        ese registro es precisamente la constancia de que el permiso existió ese día; borrarlo al
        desactivar eliminaría la única prueba de que se pidió. La desactivación se anota junto a
        él, con su propia fecha.
      </p>
      <p>
        El Comercio puede solicitar en cualquier momento que se borren sus datos, escribiendo a{" "}
        <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a>. Atenderemos esa solicitud
        salvo que exista una obligación legal de conservar algún dato concreto, y en ese caso le
        diremos cuál y por cuánto tiempo.
      </p>

      <h2>8. Derechos de los titulares</h2>
      <p>Tanto el Comercio como el Cliente Final pueden solicitar:</p>
      <ul>
        <li>
          <strong>Acceso</strong>: saber qué datos suyos tenemos.
        </li>
        <li>
          <strong>Corrección</strong>: actualizar datos inexactos.
        </li>
        <li>
          <strong>Eliminación</strong>: solicitar que se borren sus datos, sujeto a obligaciones
          legales de conservación.
        </li>
        <li>
          <strong>Revocatoria</strong>: retirar su autorización para el tratamiento, cuando sea
          aplicable.
        </li>
      </ul>
      <p>
        <strong>Para el Cliente Final:</strong> dado que sus datos fueron registrados por el
        Comercio, la vía más directa es solicitarlo al Comercio mismo. Sevenz también puede recibir
        estas solicitudes directamente en{" "}
        <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a>, indicando nombre, medio de
        contacto, el Comercio involucrado y una descripción de la solicitud.
      </p>
      <p>
        <strong>Para el Comercio:</strong> puede ejercer estos derechos desde la configuración de
        su cuenta o escribiendo a <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a>.
      </p>
      <p>
        En Colombia, la Superintendencia de Industria y Comercio es la autoridad de vigilancia en
        materia de protección de datos personales.
      </p>

      <h2>9. Seguridad de la información</h2>
      <p>
        Aplicamos medidas técnicas y organizativas razonables para proteger los datos (control de
        acceso, cifrado en tránsito, separación de datos por cuenta mediante seguridad a nivel de
        fila en la base de datos). Ningún sistema es completamente invulnerable; en caso de
        incidente de seguridad relevante, notificaremos conforme a la legislación aplicable.
      </p>

      <h2>10. Menores de edad</h2>
      <p>
        La Plataforma no está dirigida a menores de edad. El Comercio no debe registrar datos de
        menores como Clientes Finales salvo excepción legal justificada y con las autorizaciones
        correspondientes.
      </p>

      <h2>11. Cambios a esta política</h2>
      <p>
        Podremos actualizar esta política cuando cambien nuestras prácticas de datos, nuestros
        proveedores o la legislación aplicable. Los cambios sustanciales se informarán mediante la
        Plataforma o por correo electrónico antes de su entrada en vigor.
      </p>

      <h2>12. Contacto</h2>
      <p>Para ejercer sus derechos o resolver dudas sobre esta política:</p>
      <ul>
        <li>
          Correo electrónico: <a href="mailto:sevenz.mvp@gmail.com">sevenz.mvp@gmail.com</a>
        </li>
      </ul>

      <p className="mt-10! text-sm italic">
        Este documento no constituye asesoría legal y no sustituye la revisión de un abogado,
        especialmente antes de activar publicidad dirigida (Meta Pixel) o formalizar la entidad
        operadora.
      </p>
    </LegalLayout>
  );
}
