import firebase from 'firebase/app';
import 'firebase/auth';

///Your web app's Firebase configuration///
const firebaseConfig = {
   apiKey: 'AIzaSyClqtNPTSSIJri840JDu4BS8NHzj_U6kpU',
   authDomain: 'login-module-dl.firebaseapp.com',
   projectId: 'login-module-dl',
   storageBucket: 'login-module-dl.appspot.com',
   messagingSenderId: '661000939370',
   appId: '1:661000939370:web:b322358678291bf7cce713',
};

///Initialize Firebase///
firebase.initializeApp(firebaseConfig);

///utils///
const auth = firebase.auth();

export default auth;
