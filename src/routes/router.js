import { createWebHistory } from 'vue-router';

import LoginSignup from '../components/pages/LoginSignup.vue';
import Login from '../components/pages/Login.vue';
import Signup from '../components/pages/Signup.vue';
import ForgetPassword from '../components/pages/ForgetPassword.vue';
import ResetPassword from '../components/pages/ResetPassword.vue';
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
         component: LoginSignup,
      },
      {
         name: 'login',
         path: '/login',
         component: Login,
      },
      {
         name: 'signup',
         path: '/signup',
         component: Signup,
      },
      {
         name: 'forgetPassword',
         path: '/forgetPassword',
         component: ForgetPassword,
      },
      {
         name: 'resetPassword',
         path: '/resetPassword/:resetId',
         component: ResetPassword,
      },
      {
         path: '/:notFound(.*)',
         component: NotFound,
         props: true,
      },
   ],
};
