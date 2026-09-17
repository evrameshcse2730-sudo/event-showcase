import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-43Y9E5bFZ4Dc4Zw9rV-UhUo6TBhP8oQ",
  authDomain: "event-showcase-2aa62.firebaseapp.com",
  projectId: "event-showcase-2aa62",
  storageBucket: "event-showcase-2aa62.firebasestorage.app",
  messagingSenderId: "967934163960",
  appId: "1:967934163960:web:4edec14237736c8ed740d",
  measurementId: "G-4H6LJ7E1WW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;