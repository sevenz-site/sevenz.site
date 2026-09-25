import Image from "next/image";
import { Section, SectionHeading } from "@/components/landing/section";

export function Value() {
  return (
    <Section>
      {/* La única sección en dos columnas de verdad, y por un motivo concreto:
          su captura es casi cuadrada (1288×1136). A ancho completo en un
          portátil ocupa la pantalla entera y el titular que la explica queda
          fuera de vista mientras se mira — que es justo al revés de lo que
          tiene que pasar. Al lado, se leen juntos.
          En el teléfono vuelve a apilarse, como el mockup. */}
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
        <SectionHeading
          titulo="Notificaciones de cobro automatizadas vía WhatsApp"
          lead="Sevenz automatiza el envío de notificaciones de abonos, fiados, fechas de pago y cobro a través de WhatsApp, así como reportes de cartera, análisis y recomendaciones inteligentes."
        />

        {/* Captura nueva del 2026-09-24. La anterior enseñaba un solo mensaje;
            esta enseña los tres, y el `alt` se reescribió con ella — un texto
            alternativo que describe una imagen que ya no está es peor que no
            tener ninguno, porque quien lo lee no puede saber que está viendo
            otra cosa.

            OJO: el tercer globo va dirigido a un CLIENTE, no al dueño. Eso es
            `MS-3`, que sigue bloqueada, así que la imagen enseña algo que la
            app todavía no hace — está cubierto por la decisión registrada en
            `CT-15` y se anota aquí para que nadie lo lea como un descuido. */}
        <Image
          src="/screens/sevenz-notificacion-whatsapp.png"
          alt="Tres mensajes de WhatsApp de Sevenz sobre la pantalla de un teléfono: el resumen semanal de la cartera con lo que hay por cobrar, el aviso de lo que requiere atención con los clientes vencidos y los que vieron su saldo sin abonar, y un aviso a un cliente de que su negocio le registró un fiado, con un botón para ver su saldo"
          width={1288}
          height={1136}
          sizes="(min-width: 1024px) 480px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </Section>
  );
}
