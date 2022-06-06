// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD1EdwRxmXujfDyWz9K8tnXs8xcbb4CBWg",
  authDomain: "tugas-besar-aece5.firebaseapp.com",
  databaseURL: "https://tugas-besar-aece5-default-rtdb.firebaseio.com",
  projectId: "tugas-besar-aece5",
  storageBucket: "tugas-besar-aece5.appspot.com",
  messagingSenderId: "142837219646",
  appId: "1:142837219646:web:f91cf7f83c7c6663cbec6f"
};
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
