// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChD0lWPbh21Y53EkzB6-KP1LWnwmQuHnc",
    authDomain: "evenote-clone-nextjs.firebaseapp.com",
    projectId: "evenote-clone-nextjs",
    storageBucket: "evenote-clone-nextjs.appspot.com",
    messagingSenderId: "478054543328",
    appId: "1:478054543328:web:00b52812d601cf5d714585",
    measurementId: "G-7RXK9WT1DX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export {app, db};