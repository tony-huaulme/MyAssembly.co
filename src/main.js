import './assets/main.css';
import './assets/tailwind.css';
// import { createApp } from 'vue';
// import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';

import "primeicons/primeicons.css";
import './assets/main.css';

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import App from './App.vue';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';


const app = createApp(App);
const pinia = createPinia();

// Use PrimeVue with Theme Preset
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'primevue, tailwind-utilities'
            }
        }
    }
});
app.use(ToastService);

// Router
app.use(router);

// Pinia
app.use(pinia);

app.component('Button', Button);

app.mount('#app');
