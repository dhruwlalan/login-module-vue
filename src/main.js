import './sass/main.scss';
import { createApp } from 'vue';
import { auth } from './firebase';
import Router from './routes/router';
import Store from './store/store';
import App from './App.vue';

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

Router.beforeEach((to, _from, next) => {
   if (to.matched.some((record) => record.meta.isOpenRoute)) {
      if (!auth.currentUser) {
         next();
      } else {
         next({ name: 'home' });
      }
   } else {
      next();
   }
});

const loader = document.getElementById('loader');
window.addEventListener('load', () => {
   setTimeout(() => {
      loader.remove();
   }, 800);
});
