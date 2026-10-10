/**
 * Nexora - Firebase Configuration & Services Module
 * 
 * Official Firebase JavaScript SDK v11 Modular Setup
 * Provides: Firebase App, Auth, Firestore DB, and CRUD services for Nexora.
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  browserLocalPersistence,
  setPersistence
} from 'firebase/auth';
import { 
  initializeFirestore,
  getFirestore, 
  collection, 
  doc, 
  getDoc,
  getDocs, 
  setDoc,
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  limit
} from 'firebase/firestore';

// Default configuration from provisioned environment or placeholder for custom configuration
const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyDq2s0iZj66bjrvyZu0TaepRFzDIjExSXQ",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "restful-cyclist-k48x0.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "restful-cyclist-k48x0",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "restful-cyclist-k48x0.firebasestorage.app",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "583461918780",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:583461918780:web:a15b90e1f135ac09d9cb39",
  firestoreDatabaseId: import.meta.env?.VITE_FIREBASE_DATABASE_ID || "ai-studio-nexora-0e9e8b7d-02b7-4565-9614-1db88ebcdd85"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure persistent auth
try {
  setPersistence(auth, browserLocalPersistence);
} catch (e) {
  console.warn("Auth persistence warning:", e);
}

// Initialize Cloud Firestore with experimentalForceLongPolling to ensure reliability across browser iframes
const databaseId = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? firebaseConfig.firestoreDatabaseId
  : undefined;

export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false
}, databaseId);

/**
 * Validate Connection to Firestore safely without generating offline warnings
 */
export async function testConnection() {
  try {
    const q = query(collection(db, 'news'), where('published', '==', true), limit(1));
    const snap = await getDocs(q);
    console.log(`Firebase Firestore connection verified. (${snap.size} test item found)`);
    return true;
  } catch (error) {
    console.warn("Firestore connection check note:", error?.message || error);
    return false;
  }
}

/**
 * Check if the current user is an authorized administrator
 */
export async function isUserAdmin(user) {
  if (!user || !user.email) return false;
  
  const knownAdmins = [
    'mdrahad0529@gmail.com',
    'admin@nexora.digital',
    'admin@nexora.com',
    'admin@nexora'
  ];
  
  if (knownAdmins.includes(user.email.toLowerCase())) {
    return true;
  }

  try {
    const adminDocRef = doc(db, 'admins', user.uid);
    const snap = await getDoc(adminDocRef);
    if (snap.exists()) {
      return true;
    }
  } catch (e) {
    // If permission denied or other error, fallback to knownAdmins
  }
  return false;
}

/**
 * Admin Sign In with Firebase Authentication
 */
export async function adminSignIn(email, password) {
  try {
    // If user enters 'admin@nexora', map to the owner's email if needed or use as is
    let emailToUse = email.trim();
    if (emailToUse === 'admin@nexora') {
      emailToUse = 'mdrahad0529@gmail.com';
    }

    const cred = await signInWithEmailAndPassword(auth, emailToUse, password);
    const isAdmin = await isUserAdmin(cred.user);
    if (!isAdmin) {
      // Sign out immediately if not authorized
      await signOut(auth);
      throw new Error("অননুমোদিত অ্যাকাউন্ট! আপনার ইমেইলটি Nexora অ্যাডমিন তালিকার অন্তর্ভুক্ত নয়।");
    }
    return cred.user;
  } catch (err) {
    throw err;
  }
}

/**
 * Admin Sign Out
 */
export async function adminSignOut() {
  await signOut(auth);
}

/**
 * Listen for Auth state changes
 */
export function onAdminAuthStateChanged(callback) {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const isAdmin = await isUserAdmin(user);
      callback(isAdmin ? user : null);
    } else {
      callback(null);
    }
  });
}

/**
 * Fetch items from a Firestore collection
 * @param {string} collectionName - 'news', 'aiPrompts', 'technology', or 'books'
 * @param {boolean} isPublicOnly - if true, filter by published === true
 */
export async function fetchCollection(collectionName, isPublicOnly = true) {
  try {
    const colRef = collection(db, collectionName);
    // Unauthenticated public visitors must only query published items to conform with security rules
    const filterPublished = isPublicOnly || !auth.currentUser;
    const q = filterPublished
      ? query(colRef, where('published', '==', true))
      : query(colRef);

    const snapshot = await getDocs(q);
    const items = [];
    snapshot.forEach(docSnap => {
      items.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });
    return items;
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Create or replace a document in Firestore
 */
export async function saveDocument(collectionName, docId, data) {
  try {
    const documentRef = doc(db, collectionName, docId);
    const payload = {
      ...data,
      published: data.published !== false, // default true
      updatedAt: new Date().toISOString()
    };
    if (!payload.createdAt) {
      payload.createdAt = new Date().toISOString();
    }
    await setDoc(documentRef, payload, { merge: true });
    return { id: docId, ...payload };
  } catch (error) {
    console.error(`Error saving document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Delete a document from Firestore
 */
export async function deleteDocument(collectionName, docId) {
  try {
    const documentRef = doc(db, collectionName, docId);
    await deleteDoc(documentRef);
    return true;
  } catch (error) {
    console.error(`Error deleting document in ${collectionName}:`, error);
    throw error;
  }
}

// Expose on window for easy access from existing vanilla scripts in browser environments
if (typeof window !== 'undefined') {
  window.nexoraFirebase = {
    app,
    auth,
    db,
    testConnection,
    isUserAdmin,
    adminSignIn,
    adminSignOut,
    onAdminAuthStateChanged,
    fetchCollection,
    saveDocument,
    deleteDocument,
    firebaseConfig
  };
}

