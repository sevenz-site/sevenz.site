import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

// Las otras páginas repiten Header y Footer en cada archivo. Aquí no: son dos
// rutas — el índice y los nueve temas — y un layout las cubre a las dos, así
// que no hay forma de añadir un tema y olvidarse de la cabecera.
export default function SoporteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
