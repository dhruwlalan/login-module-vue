import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

///Your web app's Firebase configuration///
const firebaseConfig = {
   apiKey: 'AIzaSyBnv8pvyLFPizxhL7GZhZjY1CV4go-Wbfg',
   authDomain: 'login-module-vue.firebaseapp.com',
   projectId: 'login-module-vue',
   storageBucket: 'login-module-vue.appspot.com',
   messagingSenderId: '338708981633',
   appId: '1:338708981633:web:e4fcc748367361607cea80',
};

///Initialize Firebase///
firebase.initializeApp(firebaseConfig);

///utils///
const auth = firebase.auth();
const storageRef = firebase.storage().ref();

export { auth, storageRef };
