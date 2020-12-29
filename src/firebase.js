import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import firebaseConfig from '../firebaseConfig';

///Initialize Firebase///
firebase.initializeApp(firebaseConfig);

///Utils///
const fb = firebase;
const auth = firebase.auth();
const storageRef = firebase.storage().ref();

export { fb, auth, storageRef };
