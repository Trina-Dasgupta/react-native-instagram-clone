// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCqsdWKSgbK1i6iV4U5CEdobGgK4zNnQQA",
  authDomain: "rn-insta-clone-f75d9.firebaseapp.com",
  projectId: "rn-insta-clone-f75d9",
  storageBucket: "rn-insta-clone-f75d9.appspot.com",
  messagingSenderId: "596936555195",
  appId: "1:596936555195:web:6cfeb899ce1627e091c79e",
  //measurementId: "G-KRS66SVSQE"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

!firebase.apps.length ?
firebase.initializeApp(firebaseConfig) : firebase.app()

const db=firebase.firestore()

export  {firebase,db}