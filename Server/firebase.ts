import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//set this up in a .env file
const firebaseConfig = {
  apiKey: "AIzaSyCU_N-5WYch81E0TWOVTFLZyofWXJ8MeeQ",
  authDomain: "kanbanboardplus.firebaseapp.com",
  projectId: "kanbanboardplus",
  storageBucket: "kanbanboardplus.appspot.com",
  messagingSenderId: "970924790017",
  appId: "1:970924790017:web:c542497045ef4b6b064b00",
  measurementId: "G-9SDYTNHV9B",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { firebaseApp, db };
