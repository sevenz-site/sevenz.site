import type { ReactNode } from "react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

export function LegalLayout({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center px-6 py-20">
        <div className="w-full max-w-2xl">
          <p className="font-mono text-eyebrow text-subtle">
            {eyebrow}
          </p>
          <h1 className="text-display md:text-display-lg mt-5 text-balance">{title}</h1>
          <p className="mt-4 text-sm text-subtle">Última actualización: {updated}</p>

          <div
            className="mt-12
              [&_h2]:mt-14 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight
              [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted-foreground
              [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:text-muted-foreground
              [&_li]:leading-relaxed
              [&_strong]:font-semibold [&_strong]:text-foreground
              [&_a]:text-foreground [&_a]:underline [&_a]:underline-offset-2
              [&_blockquote]:mt-6 [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-sm [&_blockquote]:text-muted-foreground [&_blockquote]:italic
              [&_.table-wrap]:mt-4 [&_.table-wrap]:overflow-x-auto
              [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
              [&_th]:border [&_th]:border-border [&_th]:p-2 [&_th]:text-left [&_th]:font-semibold
              [&_td]:border [&_td]:border-border [&_td]:p-2 [&_td]:align-top [&_td]:text-muted-foreground"
          >
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
