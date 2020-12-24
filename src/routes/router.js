import { createWebHistory } from 'vue-router';

import Home from '../components/pages/Home.vue';
import NotFound from '../components/pages/NotFound.vue';

export default {
   history: createWebHistory(),
   linkActiveClass: 'active-link',
   linkExactActiveClass: 'exact-active-link',
   scrollBehaviour(_to, _from, savedPosition) {
      if (savedPosition) {
         return savedPosition;
      }
      return { left: 0, top: 0 };
   },
   routes: [
      {
         name: 'home',
         path: '/',
         component: Home,
      },
      {
         path: '/:notFound(.*)',
         component: NotFound,
         props: true,
      },
   ],
};
