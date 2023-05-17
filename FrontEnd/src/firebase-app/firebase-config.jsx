// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUODHIpum85vYSPh5HUDJW9n5FVRdbGjc",
  authDomain: "naturebeauty-ed50c.firebaseapp.com",
  projectId: "naturebeauty-ed50c",
  storageBucket: "naturebeauty-ed50c.appspot.com",
  messagingSenderId: "393878019750",
  appId: "1:393878019750:web:d9dbc7209aeb405e315e67",
  measurementId: "G-PFLHPD2H91",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
