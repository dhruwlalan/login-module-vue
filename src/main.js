import './assets/assets';
import { createApp } from 'vue';
import { auth } from './firebase';
import Router from './routes/Router';
import Store from './store/Store';
import App from './App.vue';
import preloader from './components/vanilla/preloader';

preloader();
let app;

auth.onAuthStateChanged((user) => {
   if (user) Store.commit('storeUser', user);
   if (!app) {
      app = createApp(App);
      app.use(Router);
      app.use(Store);
      app.mount('#app');
   }
});
