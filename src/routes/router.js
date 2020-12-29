import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase';

import Home from '../components/pages/Home.vue';
import Edit from '../components/pages/Edit.vue';
import LoginSignupForm from '../components/pages/LoginSignupForm.vue';
import ForgetPassword from '../components/pages/ForgetPassword.vue';
import AccountManagement from '../components/pages/AccountManagement.vue';
import NotFound from '../components/pages/NotFound.vue';

const Router = createRouter({
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
         name: 'edit',
         path: '/edit',
         component: Edit,
         meta: { requiresAuth: true },
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
         name: 'accountManagement',
         path: '/accmng',
         component: AccountManagement,
         props: (route) => ({
            mode: route.query.mode,
            actionCode: route.query.oobCode,
            apiKey: route.query.apiKey,
         }),
         meta: { isOpenRoute: true },
      },
      {
         path: '/:notFound(.*)',
         component: NotFound,
         props: true,
      },
   ],
});

Router.beforeEach((to, _from, next) => {
   if (to.matched.some((record) => record.meta.isOpenRoute)) {
      if (!auth.currentUser) {
         next();
      } else {
         next({ name: 'home' });
      }
   } else if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (auth.currentUser) {
         next();
      } else {
         next({ name: 'home' });
      }
   } else {
      next();
   }
});

export default Router;
