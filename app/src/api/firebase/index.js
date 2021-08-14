import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();

// var firebaseConfig = {
//     apiKey: "AIzaSyCduWMfUspKlSNF_dQFh0gfMksCMcvKPdM",
//     authDomain: "reactjsbasicchat.firebaseapp.com",
//     databaseURL: "https://reactjsbasicchat-default-rtdb.europe-west1.firebasedatabase.app",
//     projectId: "reactjsbasicchat",
//     storageBucket: "reactjsbasicchat.appspot.com",
//     messagingSenderId: "585790848497",
//     appId: "1:585790848497:web:c834cace18ed135e805850",
//     measurementId: "G-VSLBVTTY8L"
// };