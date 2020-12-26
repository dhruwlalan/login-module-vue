import { auth, storageRef } from '../firebase';

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
      async forgetPassword(_context, { email }) {
         try {
            await auth.sendPasswordResetEmail(email);
            return 'success';
         } catch (error) {
            return error.message;
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
