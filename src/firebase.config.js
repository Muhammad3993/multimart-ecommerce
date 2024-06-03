import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCG0tQ2HkSdBGV4MeQ31TUQVqi4YBnxOnU",
  authDomain: "multimart-e2d2b.firebaseapp.com",
  projectId: "multimart-e2d2b",
  storageBucket: "multimart-e2d2b.appspot.com",
  messagingSenderId: "560743437285",
  appId: "1:560743437285:web:5b5f68f8eeb8b2a753150c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db =getFirestore(app)
export const storage = getStorage(app)

export default app