import { ScrollProgress } from "@/components/landing/scroll-progress";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Problem } from "@/components/landing/problem";
import { Solution } from "@/components/landing/solution";
import { Value } from "@/components/landing/value";
import { Faq } from "@/components/landing/faq";
import { Cta } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Problem />
        <Solution />
        <Value />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
