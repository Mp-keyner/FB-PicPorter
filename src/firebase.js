import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCtzaoQy8QcKlijCb8UDMwUuciYGoVmuyo",
  authDomain: "fb-picporter.firebaseapp.com",
  projectId: "fb-picporter",
  storageBucket: "fb-picporter.appspot.com",
  messagingSenderId: "529999730318",
  appId: "1:529999730318:web:072a4960415d54886a5bdf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const collectionRef = collection(db, "Images");
const storageRef = ref(storage);
const imagesRef = ref(storageRef, "imagesDB");

export {
  collection,
  addDoc,
  updateDoc,
  doc,
  db,
  collectionRef,
  storageRef,
  imagesRef,
  storage,
};
