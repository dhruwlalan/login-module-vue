import './sass/main.scss';

import { createRouter } from 'vue-router';
import { createStore } from 'vuex';
import { createApp } from 'vue';

import Router from './routes/router';
import Store from './store/store';
import App from './App.vue';
import { auth } from './firebase';

const router = createRouter(Router);
const store = createStore(Store);
let app;

auth.onAuthStateChanged((user) => {
   if (user) store.commit('storeUser', user);
   if (!app) {
      app = createApp(App);
      app.use(router);
      app.use(store);
      app.mount('#app');
   }
});

router.beforeEach((to, _from, next) => {
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
