import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/home/reveal";
import {
  Body,
  Container,
  Em,
  FeatureList,
  Illustration,
  Lines,
  SectionTitle,
  WhatsappNote,
  type Feature,
} from "@/components/home/ui";

// The six feature sections of the web v3 frame, in frame order. The copy is the
// frame's, with the spelling fixes the owner asked for on 2026-11-03
// («ganancia», «el perfil de tu cliente», «euros» in lower case, the colon
// after «Disponibilidad», «sin royo»); the Figma frame still has the old text.
// Grey/black spans follow the frame's text segments one by one.
//
// Column widths and gaps are the frame's from `lg` up (each one is noted where
// it is used); below `lg` text and image stack, text first.

type Tone = "white" | "muted" | "dark";

const SECTION_BG: Record<Tone, string> = {
  white: "bg-white",
  muted: "bg-[#f5f5f5]",
  dark: "bg-[#272727]",
};

function FeatureSection({
  id,
  tone,
  imageSide,
  textClass,
  gapClass,
  image,
  children,
}: {
  id?: string;
  tone: Tone;
  imageSide: "left" | "right";
  /** The text column's width at `lg`, from the frame. */
  textClass: string;
  /** 16 or 40 in the frame. */
  gapClass: string;
  image: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-16 lg:py-20", SECTION_BG[tone])}>
      <Container
        className={cn(
          "flex flex-col items-center gap-12 lg:gap-0",
          imageSide === "left" ? "lg:flex-row-reverse" : "lg:flex-row",
          gapClass,
        )}
      >
        <div className={cn("flex w-full max-w-xl flex-col gap-4 lg:max-w-none lg:shrink-0", textClass)}>{children}</div>
        {image}
      </Container>
    </section>
  );
}

function Title({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <Reveal>
      <SectionTitle className={dark ? "text-[#f5f5f5]" : undefined}>{children}</SectionTitle>
    </Reveal>
  );
}

function Description({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Reveal delay={80}>
      <Body className={className}>{children}</Body>
    </Reveal>
  );
}

// ── 1 · Sales (node 1858:15260) ─────────────────────────────────────────────
const SALES: Feature[] = [
  { center: true, content: <><Em>Inventario</Em> que se actualiza solo con cada venta.</> },
  { center: true, content: <><Em>Notificación</Em> cuando un producto está por agotarse.</> },
  { center: true, content: <><Em>Precios</Em> al detal y al mayor, en dólares o en euros.</> },
  { center: true, content: <><Em>Recibo</Em> de transacción en cada venta con su código.</> },
];

export function SalesSection() {
  return (
    <FeatureSection
      tone="white"
      imageSide="right"
      textClass="lg:w-[471px]"
      gapClass="lg:gap-4"
      image={
        <Illustration
          src="/web-v3/sevenz-venta-catalogo-comprobante.webp"
          alt="El catálogo de La tienda del chino y el recibo de una venta registrada con su código de transacción"
          width={978}
          height={995}
          slot={{ w: 489, h: 480 }}
          drawnWidth={489}
          variant="right"
        />
      }
    >
      <Title>
        <Lines text={"Vende chin chin,\nfiado o mitad y mitad."} />
        <br />
        Un solo registro.
      </Title>
      <Description>
        <Em>
          <Lines text={"Vende desde tu catálogo, cobras en USD o euros,\n"} />
        </Em>
        <Lines text={"de contado o fiado, tú eliges.\nCero libreta, cero sumar a mano."} />
      </Description>
      <FeatureList items={SALES} />
    </FeatureSection>
  );
}

// ── 2 · Collections (node 1858:15267) ──────────────────────────────────────
const COLLECTIONS: Feature[] = [
  { center: true, content: <><Em>Puntaje de puntualidad:</Em> quién paga a tiempo y quién no.</> },
  { content: <>Establece <Em>cuotas y plazos de pagos.</Em></> },
  { content: <><Em>Estado de pago</Em> de cada cliente: vencido, crítico y una lista aparte de malas pagas.</> },
  { content: <><Em>Enlace de saldo</Em> por cliente: ve lo mismo que tú.</> },
];

export function CollectionsSection() {
  return (
    <FeatureSection
      tone="muted"
      imageSide="left"
      textClass="lg:w-[447px]"
      gapClass="lg:gap-10"
      image={
        <Illustration
          src="/web-v3/sevenz-cobro-inicio-puntaje.webp"
          alt="El inicio de Sevenz con el capital por cobrar en dólares y euros, y el puntaje de crédito de un cliente"
          width={978}
          height={995}
          slot={{ w: 489, h: 480 }}
          drawnWidth={489}
          variant="left"
          floatDelay={800}
        />
      }
    >
      {/* «sin royo», not the frame's «son royo»: corrected by the owner on 2026-11-03. */}
      <Title>Cobra sin royo sabiendo cuánto te deben, y quién.</Title>
      <Description>
        <Em>El capital por cobrar y reporte de ventas</Em> en dólares y en euros, siempre al día, y cada cliente con su
        historial completo.
      </Description>
      <FeatureList items={COLLECTIONS} />
      <WhatsappNote>Notificaciones de cobro, abonos y del estado de tu cartera vía WhatsApp.</WhatsappNote>
    </FeatureSection>
  );
}

// ── 3 · Catalogue for clients (node 1897:15556) ─────────────────────────────
const CATALOG: Feature[] = [
  { center: true, content: <><Em>Foto, precio y disponibilidad</Em> de cada producto.</> },
  { center: true, nowrap: true, content: <><Em>Disponibilidad:</Em> ¿cuántos productos quedan? Tu cliente lo ve.</> },
  { center: true, content: <>Los <Em>pedidos nuevos</Em> te aparecen en el inicio.</> },
  { content: <><Em>Registra los pedidos</Em> como ventas de contado o fiado, en USD o euros.</> },
  { content: <><Em>Notificaciones automatizadas</Em> cuando quedan pocos productos disponibles para que repongas tu inventario.</> },
];

export function CatalogSection() {
  return (
    <FeatureSection
      tone="white"
      imageSide="right"
      textClass="lg:w-[471px]"
      gapClass="lg:gap-4"
      image={
        <Illustration
          src="/web-v3/sevenz-catalogo-pedidos.webp"
          alt="Un producto del catálogo visto por el cliente y la lista de pedidos recibidos del lado del negocio"
          width={978}
          height={995}
          slot={{ w: 489, h: 480 }}
          drawnWidth={489}
          variant="right"
          floatDelay={400}
        />
      }
    >
      <Title>Tu catálogo, en el teléfono de tu cliente.</Title>
      <Description>
        <Em>Vende en línea.</Em> Comparte tu catálogo por WhatsApp. Tu cliente arma su pedido y te llega a la sección de
        Pedidos, listo para registrarlo como venta.
      </Description>
      <FeatureList items={CATALOG} />
    </FeatureSection>
  );
}

// ── 4 · Inventory (node 1917:15257) ─────────────────────────────────────────
const INVENTORY: Feature[] = [
  { center: true, content: <><Em>Productos disponibles,</Em> por agotarse y agotados, de un vistazo.</> },
  { center: true, nowrap: true, content: <><Em>Margen de ganancia</Em> por producto y por proveedor.</> },
  { center: true, nowrap: true, content: <><Em>Precio al detal y por mayor</Em> en dólares y euros.</> },
  { content: <>Tú decides desde cuántas unidades <Em>te avisa para reponer en inventario.</Em></> },
  { content: <><Em>Asistente financiero</Em> que te da recomendaciones para gestionar tu negocio, facturación, inventario y proveedores.</> },
];

export function InventorySection() {
  return (
    <FeatureSection
      tone="muted"
      imageSide="left"
      textClass="lg:w-[408px]"
      gapClass="lg:gap-10"
      image={
        <Illustration
          src="/web-v3/sevenz-inventario-asistente.webp"
          alt="El reporte de inventario de Sevenz y la recomendación diaria del asistente"
          width={1076}
          height={998}
          slot={{ w: 528, h: 480 }}
          drawnWidth={538}
          variant="left"
          floatDelay={1200}
        />
      }
    >
      <Title>Que no se te acabe lo que más vendas.</Title>
      <Description>
        <Em>El inventario se actualiza con cada venta</Em> y te dice qué está por agotarse.
      </Description>
      <FeatureList items={INVENTORY} />
    </FeatureSection>
  );
}

// ── 5 · Shared account (node 1898:15603) ────────────────────────────────────
export function SharedAccountSection() {
  return (
    <FeatureSection
      tone="white"
      imageSide="right"
      textClass="lg:w-[416px]"
      gapClass="lg:gap-4"
      image={
        <Illustration
          src="/web-v3/sevenz-notificaciones-whatsapp.webp"
          alt="Mensajes de WhatsApp de Sevenz: el resumen de la cartera al dueño y el aviso de un fiado al cliente"
          width={1089}
          height={960}
          slot={{ w: 544, h: 480 }}
          drawnWidth={544.5}
          variant="right"
          floatDelay={600}
        />
      }
    >
      <Title>
        <Lines text={"¡Cuentas claras sin tanta vaina! Tu cliente\ny tú ven lo mismo"} />
      </Title>
      <Description>
        <Em>Comparte el link del perfil de tu cliente con su cuenta del fiado,</Em> sus compras, abonos{" "}
        <Em>y tu catálogo de productos</Em> para que realicen nuevos pedidos y sigas facturando desde tu teléfono.
      </Description>
      <WhatsappNote>Notificaciones de cobro y estado de cartera vía WhatsApp.</WhatsappNote>
    </FeatureSection>
  );
}

// ── 6 · Daily reports, on #272727 (node 1859:15338) ─────────────────────────
const REPORTS: Feature[] = [
  { content: <>Reporte de facturación, lo que vendes chin chin, lo que fías y lo que te abonan.</> },
  { content: <>Reporte de inventario, lo que tienes disponible, lo que se agota y lo que debes reponer para seguir facturando.</> },
  { content: <>Reporte de proveedores, cuál proveedor te vende qué y a cuánto.</> },
];

export function ReportsSection() {
  return (
    <FeatureSection
      tone="dark"
      imageSide="left"
      textClass="lg:w-[436px]"
      gapClass="lg:gap-10 lg:py-6"
      image={
        <Illustration
          src="/web-v3/sevenz-reportes-transacciones.webp"
          alt="El reporte de facturación de Sevenz con la gráfica de transacciones del mes"
          width={1001}
          height={1072}
          slot={{ w: 500, h: 520 }}
          drawnWidth={500.5}
          variant="scale"
          floatDelay={300}
        />
      }
    >
      <Title dark>Reportes diarios con un asistente que no inventa cifras</Title>
      <Description className="text-[#dadada]">
        Cada día te cuenta cómo va tu negocio y te dice a quién cobrarle primero. Tú llevas el control.
      </Description>
      <FeatureList items={REPORTS} tone="dark" />
    </FeatureSection>
  );
}
