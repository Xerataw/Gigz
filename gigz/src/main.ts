import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router';

// Above the createApp() line
import { defineCustomElements } from '@ionic/pwa-elements/loader';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Import tailwind css styles
import './index.css'

const pinia = createPinia()

const i18n = createI18n({
  // something vue-i18n options here ...
})

const app = createApp(App)
	.use(pinia)
	.use(i18n)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

