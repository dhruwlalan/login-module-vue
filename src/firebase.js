import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
const db = firebase.firestore();
const auth = firebase.auth();

///collection references///
const usersCollection = db.collection('users');

export { db, auth, usersCollection };
