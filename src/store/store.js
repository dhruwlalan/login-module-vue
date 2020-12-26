import { auth, storageRef } from '../firebase';

export default {
   state() {
      return {
         user: null,
         alert: {
            showAlert: false,
            type: 'success',
            msg: 'test',
         },
      };
   },
   mutations: {
      storeUser(state, payload) {
         state.user = payload;
      },
      showAlert(state, payload) {
         state.alert.showAlert = true;
         state.alert.type = payload.type;
         state.alert.msg = payload.msg;
      },
      hideAlert(state) {
         state.alert.showAlert = false;
      },
   },
   getters: {
      user(store) {
         return store.user;
      },
      alert(store) {
         return {
            alert: store.alert.showAlert,
            type: store.alert.type,
            msg: store.alert.msg,
         };
      },
   },
   actions: {
      async register(context, { fullName, email, password }) {
         try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await user.updateProfile({
               displayName: fullName,
               photoURL:
                  'https://firebasestorage.googleapis.com/v0/b/login-module-vue.appspot.com/o/default.png?alt=media&token=ac9c3618-ab29-42b5-8fc4-54d31cbe68a2',
            });
            context.commit('storeUser', user);
            return 'success';
         } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
               return 'Email already exists!';
            }
            return error.message;
         }
      },
      async login(context, { email, password }) {
         try {
            const { user } = await auth.signInWithEmailAndPassword(email, password);
            context.commit('storeUser', user);
            return 'success';
         } catch (error) {
            if (error.code === 'auth/user-not-found') {
               return 'User not found!';
            }
            return error.message;
         }
      },
      async logout(context) {
         await auth.signOut();
         context.commit('storeUser', null);
      },
      async forgetPassword(_context, { email }) {
         try {
            await auth.sendPasswordResetEmail(email);
            return 'success';
         } catch (error) {
            return error.message;
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
