import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from '@/store/index.js'; // Importa el store Vuex correctamente

const app = createApp(App);
app.use(router);
app.use(store); // Usa el store Vuex de autenticación
app.mount('#app');
