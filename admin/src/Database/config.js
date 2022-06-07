// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb9iEGRfFXCD6BqPeZl7iIIXXfVw67FXE",
  authDomain: "react-tugas-besar.firebaseapp.com",
  databaseURL: "https://react-tugas-besar-default-rtdb.firebaseio.com",
  projectId: "react-tugas-besar",
  storageBucket: "react-tugas-besar.appspot.com",
  messagingSenderId: "1062425819537",
  appId: "1:1062425819537:web:73d4f3ea0c2cb2f76ac230",
  measurementId: "G-2D23BQHZJF"
};
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
