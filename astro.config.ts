import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://komura-c.page",
  // redirects: {
  //   "/blog": {
  //     status: 301,
  //     destination: "https://blog.komura-c.page",
  //   },
  //   "/blog/[...slug]": {
  //     status: 301,
  //     destination: "https://blog.komura-c.page/posts/[...slug]",
  //   },
  // },
});
