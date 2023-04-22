/// <reference path="../.astro/types.d.ts" />
// Replace `astro/client` with `@astrojs/image/client`
/// <reference types="@astrojs/image/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_ID: string;
  readonly SITE: string; // astro.config.ts
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
