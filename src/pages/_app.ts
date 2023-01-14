import type { App } from "vue";
import VueScrollTo from "vue-scrollto";

export default (app: App) => {
  app.use(VueScrollTo, {
    duration: 700,
    easing: [0, 0, 0.4, 1],
    offset: -40,
  });
};
