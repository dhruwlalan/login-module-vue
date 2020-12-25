import { createRouter } from 'vue-router';
import { createStore } from 'vuex';
import { createApp } from 'vue';

import Router from './routes/router';
import Store from './store/store';
import App from './App.vue';
import { auth } from './firebase';
import './sass/main.scss';

const router = createRouter(Router);
const store = createStore(Store);

// let app;
// auth.onAuthStateChanged(() => {
//    if (!app) {
const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
//    }
// });
