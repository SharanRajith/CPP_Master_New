import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAkK-bSslOWFPxi4oKB8n4OTaw_Q4xcrQU",
  authDomain: "cppmasternew.firebaseapp.com",
  projectId: "cppmasternew",
  storageBucket: "cppmasternew.firebasestorage.app",
  messagingSenderId: "540738416884",
  appId: "1:540738416884:web:5b24f864e66241bb956ea1",
  measurementId: "G-NH037JEXJ2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();
