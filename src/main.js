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
let app;

auth.onAuthStateChanged((user) => {
   if (!app) {
      app = createApp(App);
      app.use(router);
      app.use(store);
      if (user) {
         store.dispatch('fetchUserProfil', user).then(() => {
            app.mount('#app');
         });
      } else {
         app.mount('#app');
      }
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
