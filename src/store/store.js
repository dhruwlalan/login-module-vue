import { auth, db } from '../firebase';

export default {
   state() {
      return {
         user: null,
         alert: false,
         type: '',
         msg: '',
      };
   },
   mutations: {
      storeUser(state, payload) {
         state.user = payload;
      },
      showAlert(state, payload) {
         state.alert = true;
         state.type = payload.type;
         state.msg = payload.msg;
      },
      hideAlert(state) {
         state.alert = false;
      },
   },
   getters: {
      user(store) {
         return store.user;
      },
      alert(store) {
         return {
            alert: store.alert,
            type: store.type,
            msg: store.msg,
         };
      },
   },
   actions: {
      async register(context, { fullName, email, password }) {
         try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await db.collection('users').doc(user.uid).set({
               fullName,
               email: user.email,
            });
            context.commit('storeUser', { fullName, email });
            return 'success';
         } catch (error) {
            return error.message;
         }
      },
      async login(context, { email, password }) {
         try {
            const { user } = await auth.signInWithEmailAndPassword(email, password);
            context.dispatch('fetchUserProfil', user);
            return 'success';
         } catch (error) {
            return error.message;
         }
      },
      async logout(context) {
         await auth.signOut();
         context.commit('storeUser', null);
      },
      async fetchUserProfil(context, user) {
         try {
            const userProfile = await db.collection('users').doc(user.uid).get();
            context.commit('storeUser', userProfile.data());
         } catch (error) {
            context.dispatch('showAlert', { type: 'error', msg: error });
         }
      },
      showAlert(context, { type, msg }) {
         context.commit('showAlert', {
            type,
            msg,
         });
         setTimeout(() => {
            context.commit('hideAlert');
         }, 1000);
      },
   },
};
