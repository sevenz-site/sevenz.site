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

        <Image
          src="/screens/sevenz-notificacion-whatsapp.png"
          alt="Un mensaje de WhatsApp de Sevenz con el resumen de la cartera: clientes con plazo vencido, los que vencen esta semana y los que vieron su saldo y no abonaron"
          width={1288}
          height={1136}
          sizes="(min-width: 1024px) 480px, 100vw"
          className="h-auto w-full"
        />
      </div>
    </Section>
  );
}
