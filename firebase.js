// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'
//import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJXWeal1NN8Tn0p95YZzQsoDA3HcsXogM",
  authDomain: "pantryapp-3a9e9.firebaseapp.com",
  projectId: "pantryapp-3a9e9",
  storageBucket: "pantryapp-3a9e9.appspot.com",
  messagingSenderId: "475723051040",
  appId: "1:475723051040:web:d4886814a3cf9f2a39cc45",
  measurementId: "G-MTXKWV2E6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
//const analytics = getAnalytics(app);

export{app,firestore};