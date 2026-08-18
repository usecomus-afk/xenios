import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDPwOJErJ21lSphF4Rvb7l0Utj2isY67nM",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "xenios-prod-c55cd.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "xenios-prod-c55cd",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "xenios-prod-c55cd.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1017910005285",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1017910005285:web:36f5948916843ecc98f9cc",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-Q09ZCFR3KF"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.projectId &&
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.startsWith("AIzaSyDummy")
);

let app: FirebaseApp;
let db: Firestore | null = null;
let auth: Auth | null = null;
let storage: FirebaseStorage | null = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);
} catch (e) {
  console.warn("Firebase initialization warning:", e);
}

export { app, db, auth, storage };
