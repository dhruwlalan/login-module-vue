import { createStore } from 'vuex';
import { fb, auth, storageRef } from '../firebase';

const Store = createStore({
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
      storeUser(state) {
         if (auth.currentUser) {
            state.user = {
               uid: auth.currentUser.uid,
               email: auth.currentUser.email,
               displayName: auth.currentUser.displayName,
               photoURL: auth.currentUser.photoURL,
            };
         } else {
            state.user = null;
         }
      },
      showAlert(state, { type, msg }) {
         state.alert.showAlert = true;
         state.alert.type = type;
         state.alert.msg = msg;
      },
      hideAlert(state) {
         state.alert.showAlert = false;
      },
   },
   getters: {
      user(state) {
         return state.user;
      },
      defaultPhotoURL() {
         return 'https://firebasestorage.googleapis.com/v0/b/login-module-vue.appspot.com/o/default.png?alt=media&token=ac9c3618-ab29-42b5-8fc4-54d31cbe68a2';
      },
      alert(state) {
         return {
            showAlert: state.alert.showAlert,
            type: state.alert.type,
            msg: state.alert.msg,
         };
      },
   },
   actions: {
      async signup(context, { fullName, email, pass }) {
         try {
            const { user } = await auth.createUserWithEmailAndPassword(email, pass);
            await user.updateProfile({
               displayName: fullName,
               photoURL: context.getters.defaultPhotoURL,
            });
            context.commit('storeUser');
            return 'success';
         } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
               return 'Email already exists!';
            }
            return error.message;
         }
      },
      async login(context, { email, pass }) {
         try {
            await auth.signInWithEmailAndPassword(email, pass);
            context.commit('storeUser');
            return 'success';
         } catch (error) {
            if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
               return 'Invalid email or password!';
            }
            return error.message;
         }
      },
      async logout(context) {
         await auth.signOut();
         context.commit('storeUser');
      },

      async forgetPassword(_context, email) {
         try {
            await auth.sendPasswordResetEmail(email);
            return 'success';
         } catch (error) {
            return error.message;
         }
      },
      async verifyPasswordResetCode(_context, actionCode) {
         try {
            const email = await auth.verifyPasswordResetCode(actionCode);
            return email;
         } catch (error) {
            return 'InvalidActionCode';
         }
      },
      async confirmPasswordReset(_context, { actionCode, newPass }) {
         try {
            await auth.confirmPasswordReset(actionCode, newPass);
            return 'success';
         } catch (error) {
            return 'Something went wrong!';
         }
      },

      async _reAuthenticateUser(_context, pass) {
         try {
            const user = auth.currentUser;
            const credentials = fb.auth.EmailAuthProvider.credential(user.email, pass);
            await user.reauthenticateWithCredential(credentials);
            return 'success';
         } catch (error) {
            return error.code;
         }
      },
      async updateEmail(context, { newEmail, pass }) {
         const user = auth.currentUser;
         const res = await context.dispatch('_reAuthenticateUser', pass);
         if (res === 'success') {
            try {
               await user.updateEmail(newEmail);
               context.commit('storeUser');
               return 'success';
            } catch (error) {
               return error.message;
            }
         } else {
            if (res === 'auth/wrong-password') {
               return 'Invalid Current Password!';
            }
            if (res === 'auth/too-many-requests') {
               return 'Please try after some time!';
            }
            return 'Something went wrong!';
         }
      },
      async updatePassword(context, { curPass, newPass }) {
         const user = auth.currentUser;
         const res = await context.dispatch('_reAuthenticateUser', curPass);
         if (res === 'success') {
            try {
               await user.updatePassword(newPass);
               context.commit('storeUser');
               return 'success';
            } catch (error) {
               return error.message;
            }
         } else {
            if (res === 'auth/wrong-password') {
               return 'Invalid Current Password!';
            }
            if (res === 'auth/too-many-requests') {
               return 'Please try after some time!';
            }
            return 'something went wrong!';
         }
      },

      async updateProfile(context, { fullName, photoURL }) {
         try {
            const user = auth.currentUser;
            if (fullName) {
               await user.updateProfile({
                  displayName: fullName,
               });
            }
            if (photoURL) {
               console.log('here2');
               await user.updateProfile({
                  photoURL,
               });
            }
            context.commit('storeUser');
            return 'success';
         } catch (error) {
            return error.message;
         }
      },
      async uploadNewProfilePic(context, newPhoto) {
         try {
            const user = auth.currentUser;
            const ext = newPhoto.name.split('.').pop();
            const name = `${user.uid}-photo.${ext}`;
            const snapshot = await storageRef.child(name).put(newPhoto, {
               contentType: 'image/jpeg',
            });
            const photoURL = await snapshot.ref.getDownloadURL();
            await user.updateProfile({
               photoURL,
            });
            context.commit('storeUser');
            return 'success';
         } catch (error) {
            return error.message;
         }
      },

      showAlert(context, { type, msg, length }) {
         length = length ?? 1000;
         context.commit('showAlert', {
            type,
            msg,
         });
         setTimeout(() => {
            context.commit('hideAlert');
         }, length);
      },
   },
});

export default Store;
