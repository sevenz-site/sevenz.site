import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Aqui deja wrangler su bundle temporal al levantar `wrangler dev`, que es
    // como se comprueban los 301 de public/_redirects sin desplegar. Es codigo
    // generado por una herramienta, no del proyecto: sin esta linea, cada
    // comprobacion de redirecciones deja dos avisos de lint que no son de
    // nadie. Ya esta en .gitignore; esto es lo mismo para eslint.
    ".wrangler/**",
  ]),
]);

export default eslintConfig;
