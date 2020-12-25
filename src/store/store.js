import { auth } from '../firebase';

export default {
   state() {
      return {
         user: null,
      };
   },
   mutations: {
      storeUser(state) {
         state.user = auth.currentUser;
      },
   },
   getters: {
      user(store) {
         return store.user;
      },
   },
   actions: {
      register(context, { email, password }) {
         auth
            .createUserWithEmailAndPassword(email, password)
            .then((_res) => {
               context.commit('storeUser');
               console.log('user created successfully!');
            })
            .catch((error) => {
               console.log('errorCode:', error.code);
               console.log('errorMessage:', error.message);
            });
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
      logout(context) {
         auth.signOut().then(() => {
            context.commit('storeUser');
         });
      },
   },
};
