import './assets/main.css';
import './assets/tailwind.css';
import "primeflex/primeflex.css";
// import { createApp } from 'vue';
// import App from './App.vue';
import router from './router/router';
import { createPinia } from 'pinia';

import "primeicons/primeicons.css";
import './assets/main.css';

import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
// import Aura from '@primevue/themes/aura';
// import Nora from '@primevue/themes/aura';
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';

import App from './App.vue';
import Button from 'primevue/button';
import ToastService from 'primevue/toastservice';
import Ripple from 'primevue/ripple';
import Tooltip from 'primevue/tooltip';
import ConfirmationService from 'primevue/confirmationservice';


const app = createApp(App);
const pinia = createPinia();

app.directive('tooltip', Tooltip);

app.use(ConfirmationService);

const MyPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{blue.50}',
            100: '{blue.100}',
            200: '{blue.200}',
            300: '{blue.300}',
            400: '{blue.400}',
            500: '{blue.500}',
            600: '{blue.600}',
            700: '{blue.700}',
            800: '{blue.800}',
            900: '{blue.900}',
            950: '{blue.950}'
        }
    },
    
});

// Use PrimeVue with Theme Preset
app.use(PrimeVue, {
    theme: {
        preset: MyPreset,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'primevue, tailwind-utilities'
            },
            darkModeSelector: '.my-app-dark',
        }
        
    },
    ripple : true,

    
});

app.use(ToastService);
app.directive('ripple', Ripple);

router.beforeEach(to => {
    if (!to.matched.length) window.location = "/404"
})

router.afterEach((to, from) => {
    if (window.gtag) {
        gtag('config', 'G-W3RF7T204Q', { page_path: to.fullPath });
    }
});

// Router
app.use(router);

// Pinia
app.use(pinia);

app.component('Button', Button);

app.mount('#app');
