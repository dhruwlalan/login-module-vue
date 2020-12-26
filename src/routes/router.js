import { createWebHistory } from 'vue-router';

import Home from '../components/pages/Home.vue';
import LoginSignupForm from '../components/pages/LoginSignupForm.vue';
import ForgetPassword from '../components/pages/ForgetPassword.vue';
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
         name: 'login',
         path: '/login',
         component: LoginSignupForm,
         meta: { isOpenRoute: true },
      },
      {
         name: 'signup',
         path: '/signup',
         component: LoginSignupForm,
         meta: { isOpenRoute: true },
      },
      {
         name: 'forgetPassword',
         path: '/forgetPassword',
         component: ForgetPassword,
         meta: { isOpenRoute: true },
      },
      {
         path: '/:notFound(.*)',
         component: NotFound,
         props: true,
      },
   ],
};
