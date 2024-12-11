import { definePreset } from '@primevue/themes';
import Lara from '@primevue/themes/lara';
import { createPinia } from 'pinia';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import { createApp } from 'vue';
import App from './App.vue';

import '../assets/styles.css';
import router from './router';

const MyPreset = definePreset(Lara, {
  semantic: {
    primary: {
      50: '#ff6b6b',
      100: '#f95c5c',
      200: '#f34d4d',
      300: '#ec3e3e',
      400: '#e63030',
      500: '#e02121',
      600: '#da1313',
      700: '#d40505',
      800: '#cf0000',
      900: '#c90000',
    },
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(ToastService);

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});

app.mount('#app');
