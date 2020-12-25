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
            context.commit('storeUser', { fullName, email, uid: user.uid });
            return 'success';
         } catch (error) {
            return error.message;
         }
      },
      login(context, { email, password }) {
         auth
            .signInWithEmailAndPassword(email, password)
            .then((_res) => {
               context.commit('storeUser');
               console.log('user logged-in successfully!');
            })
            .catch((error) => {
               console.log('errorCode:', error.code);
               console.log('errorMessage:', error.message);
            });
      },
      async logout(context) {
         await auth.signOut();
         context.commit('storeUser', null);
      },
      showAlert(context, { type, msg }) {
         context.commit('showAlert', {
            type,
            msg,
         });
         setTimeout(() => {
            context.commit('hideAlert');
         }, 1500);
      },
   },
};
