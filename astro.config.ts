import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://komura-c.github.io/komura-c.github.io.v2",
  integrations: [mdx(), sitemap(), vue({ appEntrypoint: "/src/pages/_app" })],
});
