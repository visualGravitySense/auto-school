import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_yTYOssKQVq1aCeBycJxb6P_-s2eVQa8",
  authDomain: "driving-school-205a9.firebaseapp.com",
  projectId: "driving-school-205a9",
  storageBucket: "driving-school-205a9.firebasestorage.app",
  messagingSenderId: "427925514180",
  appId: "1:427925514180:web:cfb73ea1657e40286b6691",
  measurementId: "G-0MYF73F2DP"
};

// Инициализируем Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { db, auth };
