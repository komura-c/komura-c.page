/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID: string;
  readonly SITE: string; // astro.config.ts
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
