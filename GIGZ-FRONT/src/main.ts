import { createApp } from "vue";
import { createI18n } from "vue-i18n";
import App from "./App.vue";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/display.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";

/* Theme variables */
import { createPinia } from "pinia";
import translations from "./asset/i18n/translations";
import "./theme/variables.css";
import router from "./router/index";

const i18n = createI18n({
  locale: "fr",
  fallbackLocale: "en",
  messages: translations,
});
const pinia = createPinia();

const app = createApp(App).use(IonicVue);

app.use(pinia);
app.use(i18n);
app.use(router);

app.mount("#app");
