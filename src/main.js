import { createApp } from 'vue';
import App from './App.vue';
// Import Bootstrap and BootstrapVue CSS files (order is important)
import '../node_modules//bootstrap/dist/css/bootstrap.css';

import router from './routes';
import $bus from './utils/Events';
import $globals from './utils/Globals'; 

const app = createApp(App);

app.provide('$globals', $globals);
app.provide('$bus', $bus);

app.use(router);

app.mount('#app');
