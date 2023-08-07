import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';
import config from './env/config'

firebase.initializeApp(config);
const firestore = firebase.firestore();
const auth = firebase.auth();

export {auth, firestore}