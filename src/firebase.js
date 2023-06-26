// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtzaoQy8QcKlijCb8UDMwUuciYGoVmuyo",
  authDomain: "fb-picporter.firebaseapp.com",
  projectId: "fb-picporter",
  storageBucket: "fb-picporter.appspot.com",
  messagingSenderId: "529999730318",
  appId: "1:529999730318:web:072a4960415d54886a5bdf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app);

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection  } from 'firebase/firestore';

// // Import the functions you need from the SDKs you need
// // import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCtzaoQy8QcKlijCb8UDMwUuciYGoVmuyo",
//   authDomain: "fb-picporter.firebaseapp.com",
//   projectId: "fb-picporter",
//   storageBucket: "fb-picporter.appspot.com",
//   messagingSenderId: "529999730318",
//   appId: "1:529999730318:web:072a4960415d54886a5bdf"
// };

// // Initialize Firebase
// const fb = initializeApp(firebaseConfig);
// export const db = getFirestore(fb);