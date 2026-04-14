import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDJaf4QTP660oeMoxwRXI_67GI6enjWESQ",
  authDomain: "cpp-master-474ce.firebaseapp.com",
  projectId: "cpp-master-474ce",
  storageBucket: "cpp-master-474ce.firebasestorage.app",
  messagingSenderId: "733725123908",
  appId: "1:733725123908:web:ea14644526471eca1ee311",
  measurementId: "G-6MMFH40VGQ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
