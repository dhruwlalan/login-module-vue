import { fb, auth, storageRef } from '../firebase';

export default {
   state() {
      return {
         user: null,
         defaultPhotoUrl:
            'https://firebasestorage.googleapis.com/v0/b/login-module-vue.appspot.com/o/default.png?alt=media&token=ac9c3618-ab29-42b5-8fc4-54d31cbe68a2',
         alert: {
            showAlert: false,
            type: 'success',
            msg: 'test',
         },
      };
   },
   mutations: {
      storeUser(state) {
         state.user = auth.currentUser;
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
      defaultPhotoUrl(store) {
         return store.defaultPhotoUrl;
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
               photoURL: context.getters.defaultPhotoUrl,
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
      async login(context, { email, password }) {
         try {
            await auth.signInWithEmailAndPassword(email, password);
            context.commit('storeUser');
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
         context.commit('storeUser');
      },
      async reAuthenticateUser(_context, password) {
         try {
            const user = auth.currentUser;
            const credentials = fb.auth.EmailAuthProvider.credential(user.email, password);
            await user.reauthenticateWithCredential(credentials);
            return 'success';
         } catch (error) {
            console.log(error.code);
            return error.code;
         }
      },
      async updateEmail(context, { newEmail, password }) {
         const user = auth.currentUser;
         const res = await context.dispatch('reAuthenticateUser', password);
         if (res === 'success') {
            try {
               await user.updateEmail(newEmail);
               return 'success';
            } catch (error) {
               return error.code;
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
      async updatePassword(context, { curPass, newPass }) {
         const user = auth.currentUser;
         const res = await context.dispatch('reAuthenticateUser', curPass);
         if (res === 'success') {
            try {
               await user.updatePassword(newPass);
               return 'success';
            } catch (error) {
               return error.code;
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
      async updateProfile(_context, { fullName, photoUrl }) {
         try {
            const user = await auth.currentUser;
            if (fullName) {
               await user.updateProfile({
                  displayName: fullName,
               });
            }
            if (photoUrl) {
               await user.updateProfile({
                  photoURL: photoUrl,
               });
            }
            return 'success';
         } catch (error) {
            return error.code;
         }
      },
      async uploadNewProfilePic(_context, photo) {
         try {
            const user = await auth.currentUser;
            const extAr = photo.name.split('.');
            const ext = extAr[extAr.length - 1];
            const name = `${user.uid}.${ext}`;
            const metadata = {
               contentType: photo.type,
            };
            const snapshot = await storageRef.child(name).put(photo, metadata);
            const url = await snapshot.ref.getDownloadURL();
            await user.updateProfile({
               photoURL: url,
            });
            return 'success';
         } catch (error) {
            return error.code;
         }
      },
      async forgetPassword(_context, { email }) {
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
      async confirmPasswordReset(_context, { actionCode, newPassword }) {
         try {
            await auth.confirmPasswordReset(actionCode, newPassword);
            return 'success';
         } catch (error) {
            return 'Error occurred during confirmation';
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
