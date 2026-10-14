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
  limit,
  increment
} from 'firebase/firestore';

import firebaseAppletConfig from './firebase-applet-config.json';

// Configuration from provisioned firebase-applet-config.json or environment variables
const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || firebaseAppletConfig.apiKey,
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || firebaseAppletConfig.authDomain,
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || firebaseAppletConfig.projectId,
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || firebaseAppletConfig.storageBucket,
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseAppletConfig.messagingSenderId,
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || firebaseAppletConfig.appId,
  firestoreDatabaseId: import.meta.env?.VITE_FIREBASE_DATABASE_ID || firebaseAppletConfig.firestoreDatabaseId
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
    'bluesky90987@gmail.com',
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

export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
};

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

/**
 * Check if item is a default seed item (e.g. news-1, prompt-1, tech-1, book-1)
 */
export function isDefaultSeedItem(item) {
  if (!item || !item.id) return false;
  return /^(news|prompt|tech|book)-[0-9]{1,4}$/.test(String(item.id));
}

/**
 * Extract timestamp for user created posts
 */
export function getUserItemTimestamp(item) {
  if (!item) return 0;
  if (item.createdAt) {
    const t = typeof item.createdAt === 'number' ? item.createdAt : Date.parse(item.createdAt);
    if (!isNaN(t) && t > 0) return t;
  }
  if (item.id && typeof item.id === 'string') {
    const match = item.id.match(/-(\d{10,})$/);
    if (match) {
      const ts = Number(match[1]);
      if (!isNaN(ts) && ts > 1000000000000) return ts;
    }
  }
  if (item.updatedAt) {
    const t = typeof item.updatedAt === 'number' ? item.updatedAt : Date.parse(item.updatedAt);
    if (!isNaN(t) && t > 0) return t;
  }
  return 0;
}

/**
 * Sort collection items: User created posts ALWAYS at the top (newest first),
 * followed by default seed items in standard sequence (1, 2, 3...)
 */
export function sortCollectionItems(items) {
  if (!Array.isArray(items)) return [];
  return [...items].sort((a, b) => {
    const aDef = isDefaultSeedItem(a);
    const bDef = isDefaultSeedItem(b);

    // 1. User posts always come BEFORE default seed posts
    if (!aDef && bDef) return -1;
    if (aDef && !bDef) return 1;

    // 2. Both are default seed posts: keep natural order (news-1 before news-2)
    if (aDef && bDef) {
      const aNum = parseInt(String(a.id).replace(/\D+/g, '') || '0', 10);
      const bNum = parseInt(String(b.id).replace(/\D+/g, '') || '0', 10);
      return aNum - bNum;
    }

    // 3. Both are user posts: newest timestamp first
    const tA = getUserItemTimestamp(a);
    const tB = getUserItemTimestamp(b);
    if (tB !== tA) return tB - tA;

    return String(b.id || '').localeCompare(String(a.id || ''));
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
    return sortCollectionItems(items);
  } catch (error) {
    console.error(`Error fetching collection ${collectionName}:`, error);
    handleFirestoreError(error, OperationType.LIST, collectionName);
  }
}

/**
 * Create or replace a document in Firestore
 */
export async function saveDocument(collectionName, docId, data) {
  try {
    const documentRef = doc(db, collectionName, docId);
    const nowIso = new Date().toISOString();
    const payload = {
      ...data,
      published: data.published !== false, // default true
      updatedAt: data.updatedAt || nowIso
    };
    if (!payload.createdAt) {
      payload.createdAt = nowIso;
    }
    await setDoc(documentRef, payload, { merge: true });
    return { id: docId, ...payload };
  } catch (error) {
    console.error(`Error saving document in ${collectionName}:`, error);
    handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${docId}`);
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
    handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${docId}`);
  }
}

// ==========================================================================
// Nexora Analytics & Visitor Tracking Services
// ==========================================================================

const BENGALI_MONTHS = ['জানু', 'ফেব্রু', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টে', 'অক্টো', 'নভে', 'ডিসে'];
const BENGALI_DAYS = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'];
const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function toBengaliNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '০';
  const formatted = Number(num).toLocaleString('en-US');
  return formatted.replace(/[0-9]/g, d => BENGALI_DIGITS[Number(d)]);
}

export function formatBengaliDateLabel(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length < 3) return dateStr;
  const day = parseInt(parts[2], 10);
  const monthIdx = parseInt(parts[1], 10) - 1;
  const mName = BENGALI_MONTHS[monthIdx] || parts[1];
  return `${toBengaliNumber(day)} ${mName}`;
}

// Device, Browser, and OS Environment Detector
export function detectClientEnvironment() {
  if (typeof navigator === 'undefined') {
    return { device: 'Desktop', browser: 'Chrome', os: 'Other' };
  }
  const ua = navigator.userAgent || '';

  // 1. Device Type
  let device = 'Desktop';
  const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(ua) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /Macintosh/i.test(ua));
  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua);
  if (isTablet) {
    device = 'Tablet';
  } else if (isMobile) {
    device = 'Mobile';
  }

  // 2. Browser
  let browser = 'Other';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/opr|opera/i.test(ua)) browser = 'Opera';
  else if (/samsungbrowser/i.test(ua)) browser = 'Samsung Internet';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';
  else if (/safari/i.test(ua) && !/chrome|crios/i.test(ua)) browser = 'Safari';

  // 3. Operating System
  let os = 'Other';
  if (/windows/i.test(ua)) os = 'Windows';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/macintosh|mac os x/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  return { device, browser, os };
}

function getRealtimeAnalyticsCache() {
  try {
    // Purge legacy demo caches
    localStorage.removeItem('nexora_analytics_cache');
    localStorage.removeItem('nexora_analytics_cache_v2');

    const raw = localStorage.getItem('nexora_analytics_realtime_v1');
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return {
    totalViews: 0,
    totalVisitors: 0,
    daily: {},
    postViews: {},
    devices: { Mobile: 0, Desktop: 0, Tablet: 0 },
    browsers: { Chrome: 0, Safari: 0, Firefox: 0, Edge: 0, Opera: 0, 'Samsung Internet': 0, Other: 0 },
    operatingSystems: { Android: 0, iOS: 0, Windows: 0, macOS: 0, Linux: 0, Other: 0 }
  };
}

function saveRealtimeAnalyticsCache(data) {
  try {
    localStorage.setItem('nexora_analytics_realtime_v1', JSON.stringify(data));
  } catch (e) {}
}

/**
 * Record a general site visit / page view in real time
 */
export async function recordSitePageView() {
  const todayStr = new Date().toISOString().split('T')[0];
  let isNewToday = false;
  try {
    const lastVisit = localStorage.getItem('nexora_last_visit_date');
    const envRecordedDate = localStorage.getItem('nexora_env_recorded_date');
    if (lastVisit !== todayStr || envRecordedDate !== todayStr) {
      isNewToday = true;
      localStorage.setItem('nexora_last_visit_date', todayStr);
      localStorage.setItem('nexora_env_recorded_date', todayStr);
    }
    if (!localStorage.getItem('nexora_visitor_id')) {
      localStorage.setItem('nexora_visitor_id', 'v_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8));
    }
  } catch (e) {}

  const clientEnv = detectClientEnvironment();

  // Update local real-time cache immediately
  const localCache = getRealtimeAnalyticsCache();
  if (!localCache.daily[todayStr]) {
    localCache.daily[todayStr] = { date: todayStr, views: 0, visitors: 0 };
  }
  localCache.daily[todayStr].views = (localCache.daily[todayStr].views || 0) + 1;
  localCache.totalViews = (localCache.totalViews || 0) + 1;

  if (isNewToday) {
    localCache.daily[todayStr].visitors = (localCache.daily[todayStr].visitors || 0) + 1;
    localCache.totalVisitors = (localCache.totalVisitors || 0) + 1;
    localCache.devices[clientEnv.device] = (localCache.devices[clientEnv.device] || 0) + 1;
    localCache.browsers[clientEnv.browser] = (localCache.browsers[clientEnv.browser] || 0) + 1;
    localCache.operatingSystems[clientEnv.os] = (localCache.operatingSystems[clientEnv.os] || 0) + 1;
  }
  saveRealtimeAnalyticsCache(localCache);

  // Sync to Firestore
  try {
    const overviewRef = doc(db, 'site_analytics', 'overview');
    const updateObj = {
      totalViews: increment(1),
      updatedAt: new Date().toISOString()
    };
    if (isNewToday) {
      updateObj.totalVisitors = increment(1);
      updateObj[`devices.${clientEnv.device}`] = increment(1);
      updateObj[`browsers.${clientEnv.browser}`] = increment(1);
      updateObj[`operatingSystems.${clientEnv.os}`] = increment(1);
    }
    await setDoc(overviewRef, updateObj, { merge: true });

    const historyRef = doc(db, 'site_analytics', 'history');
    const historyUpdate = {
      [`dates.${todayStr}.views`]: increment(1),
      [`dates.${todayStr}.date`]: todayStr,
      updatedAt: new Date().toISOString()
    };
    if (isNewToday) {
      historyUpdate[`dates.${todayStr}.visitors`] = increment(1);
      historyUpdate[`dates.${todayStr}.devices.${clientEnv.device}`] = increment(1);
      historyUpdate[`dates.${todayStr}.browsers.${clientEnv.browser}`] = increment(1);
    }
    await setDoc(historyRef, historyUpdate, { merge: true });
  } catch (err) {
    console.debug('Realtime analytics sync note:', err?.message || err);
  }
}

/**
 * Record a specific post view (News, AI Prompt, Tech, Book) in real time
 */
export async function recordPostView(postId) {
  if (!postId) return;
  const cleanId = String(postId);

  // Update local cache
  const localCache = getRealtimeAnalyticsCache();
  localCache.postViews[cleanId] = (localCache.postViews[cleanId] || 0) + 1;
  localCache.totalViews = (localCache.totalViews || 0) + 1;

  const todayStr = new Date().toISOString().split('T')[0];
  if (!localCache.daily[todayStr]) {
    localCache.daily[todayStr] = { date: todayStr, views: 0, visitors: 0 };
  }
  localCache.daily[todayStr].views = (localCache.daily[todayStr].views || 0) + 1;
  saveRealtimeAnalyticsCache(localCache);

  // Sync to Firestore
  try {
    const overviewRef = doc(db, 'site_analytics', 'overview');
    await setDoc(overviewRef, {
      [`postViews.${cleanId}`]: increment(1),
      totalViews: increment(1),
      updatedAt: new Date().toISOString()
    }, { merge: true });

    const historyRef = doc(db, 'site_analytics', 'history');
    await setDoc(historyRef, {
      [`dates.${todayStr}.views`]: increment(1),
      [`dates.${todayStr}.postViews.${cleanId}`]: increment(1),
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (err) {
    console.debug('Post view realtime sync note:', err?.message || err);
  }
}

function extractMetric(obj, prefix, key) {
  if (!obj) return 0;
  const flat = Number(obj[`${prefix}.${key}`]);
  if (!isNaN(flat) && flat > 0) return flat;
  const nested = Number(obj[prefix]?.[key]);
  if (!isNaN(nested) && nested > 0) return nested;
  return 0;
}

/**
 * Reset all analytics data (for admin clean slate)
 */
export async function resetAllAnalyticsData() {
  try {
    localStorage.removeItem('nexora_analytics_realtime_v1');
    localStorage.removeItem('nexora_analytics_cache');
    localStorage.removeItem('nexora_analytics_cache_v2');
    localStorage.removeItem('nexora_analytics_local');
    localStorage.removeItem('nexora_demo_analytics');
    localStorage.removeItem('nexora_last_visit_date');
    localStorage.removeItem('nexora_env_recorded_v1');

    const emptyOverview = {
      totalViews: 0,
      totalVisitors: 0,
      postViews: {},
      devices: { Mobile: 0, Desktop: 0, Tablet: 0 },
      browsers: { Chrome: 0, Safari: 0, Firefox: 0, Edge: 0, Opera: 0, 'Samsung Internet': 0, Other: 0 },
      operatingSystems: { Android: 0, iOS: 0, Windows: 0, macOS: 0, Linux: 0, Other: 0 },
      updatedAt: new Date().toISOString()
    };
    const emptyHistory = {
      dates: {},
      updatedAt: new Date().toISOString()
    };

    await Promise.all([
      setDoc(doc(db, 'site_analytics', 'overview'), emptyOverview),
      setDoc(doc(db, 'site_analytics', 'history'), emptyHistory)
    ]);
    return true;
  } catch (err) {
    console.error('Error resetting analytics:', err);
    throw err;
  }
}

/**
 * Fetch and aggregate pure real-time analytics for the admin panel
 */
export async function fetchAnalyticsOverview() {
  const localCache = getRealtimeAnalyticsCache();
  let firestoreOverview = null;
  let firestoreHistory = null;

  try {
    const [ovSnap, histSnap] = await Promise.all([
      getDoc(doc(db, 'site_analytics', 'overview')),
      getDoc(doc(db, 'site_analytics', 'history'))
    ]);
    if (ovSnap.exists()) firestoreOverview = ovSnap.data();
    if (histSnap.exists()) firestoreHistory = histSnap.data();
  } catch (err) {
    console.debug('Firestore analytics read note:', err?.message || err);
  }

  // Merge pure Firestore history with local real-time cache
  const allDates = { ...localCache.daily };
  if (firestoreHistory) {
    // 1. Nested dates map
    if (firestoreHistory.dates && typeof firestoreHistory.dates === 'object') {
      Object.keys(firestoreHistory.dates).forEach(dKey => {
        const fItem = firestoreHistory.dates[dKey];
        if (!allDates[dKey]) allDates[dKey] = { date: dKey, views: 0, visitors: 0 };
        allDates[dKey].views = Math.max(allDates[dKey].views || 0, Number(fItem?.views) || 0);
        allDates[dKey].visitors = Math.max(allDates[dKey].visitors || 0, Number(fItem?.visitors) || 0);
      });
    }
    // 2. Flat dotted keys like dates.2026-10-14.views
    Object.keys(firestoreHistory).forEach(k => {
      const match = k.match(/^dates\.(\d{4}-\d{2}-\d{2})\.(views|visitors)$/);
      if (match) {
        const dKey = match[1];
        const field = match[2];
        const val = Number(firestoreHistory[k]) || 0;
        if (!allDates[dKey]) allDates[dKey] = { date: dKey, views: 0, visitors: 0 };
        allDates[dKey][field] = Math.max(allDates[dKey][field] || 0, val);
      }
    });
  }

  // Merge real post views
  const mergedPostViews = { ...localCache.postViews };
  if (firestoreOverview) {
    if (firestoreOverview.postViews && typeof firestoreOverview.postViews === 'object') {
      Object.keys(firestoreOverview.postViews).forEach(pId => {
        mergedPostViews[pId] = Math.max(mergedPostViews[pId] || 0, Number(firestoreOverview.postViews[pId]) || 0);
      });
    }
    Object.keys(firestoreOverview).forEach(k => {
      if (k.startsWith('postViews.')) {
        const pId = k.replace('postViews.', '');
        const val = Number(firestoreOverview[k]) || 0;
        mergedPostViews[pId] = Math.max(mergedPostViews[pId] || 0, val);
      }
    });
  }

  // Merge Devices breakdown
  const mergedDevices = {
    Mobile: Math.max(localCache.devices?.Mobile || 0, extractMetric(firestoreOverview, 'devices', 'Mobile')),
    Desktop: Math.max(localCache.devices?.Desktop || 0, extractMetric(firestoreOverview, 'devices', 'Desktop')),
    Tablet: Math.max(localCache.devices?.Tablet || 0, extractMetric(firestoreOverview, 'devices', 'Tablet'))
  };

  // Merge Browsers breakdown
  const mergedBrowsers = {
    Chrome: Math.max(localCache.browsers?.Chrome || 0, extractMetric(firestoreOverview, 'browsers', 'Chrome')),
    Safari: Math.max(localCache.browsers?.Safari || 0, extractMetric(firestoreOverview, 'browsers', 'Safari')),
    Firefox: Math.max(localCache.browsers?.Firefox || 0, extractMetric(firestoreOverview, 'browsers', 'Firefox')),
    Edge: Math.max(localCache.browsers?.Edge || 0, extractMetric(firestoreOverview, 'browsers', 'Edge')),
    Opera: Math.max(localCache.browsers?.Opera || 0, extractMetric(firestoreOverview, 'browsers', 'Opera')),
    'Samsung Internet': Math.max(localCache.browsers?.['Samsung Internet'] || 0, extractMetric(firestoreOverview, 'browsers', 'Samsung Internet')),
    Other: Math.max(localCache.browsers?.Other || 0, extractMetric(firestoreOverview, 'browsers', 'Other'))
  };

  // Merge Operating Systems breakdown
  const mergedOS = {
    Android: Math.max(localCache.operatingSystems?.Android || 0, extractMetric(firestoreOverview, 'operatingSystems', 'Android')),
    iOS: Math.max(localCache.operatingSystems?.iOS || 0, extractMetric(firestoreOverview, 'operatingSystems', 'iOS')),
    Windows: Math.max(localCache.operatingSystems?.Windows || 0, extractMetric(firestoreOverview, 'operatingSystems', 'Windows')),
    macOS: Math.max(localCache.operatingSystems?.macOS || 0, extractMetric(firestoreOverview, 'operatingSystems', 'macOS')),
    Linux: Math.max(localCache.operatingSystems?.Linux || 0, extractMetric(firestoreOverview, 'operatingSystems', 'Linux')),
    Other: Math.max(localCache.operatingSystems?.Other || 0, extractMetric(firestoreOverview, 'operatingSystems', 'Other'))
  };

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  const todayViews = allDates[todayStr]?.views || 0;
  const todayVisitors = allDates[todayStr]?.visitors || 0;

  // Calculate past 7 days
  let last7DaysViews = 0;
  let last7DaysVisitors = 0;
  for (let i = 0; i < 7; i++) {
    const dStr = new Date(now.getTime() - i * 86400000).toISOString().split('T')[0];
    if (allDates[dStr]) {
      last7DaysViews += allDates[dStr].views || 0;
      last7DaysVisitors += allDates[dStr].visitors || 0;
    }
  }

  // Calculate past 30 days
  let last30DaysViews = 0;
  let last30DaysVisitors = 0;
  for (let i = 0; i < 30; i++) {
    const dStr = new Date(now.getTime() - i * 86400000).toISOString().split('T')[0];
    if (allDates[dStr]) {
      last30DaysViews += allDates[dStr].views || 0;
      last30DaysVisitors += allDates[dStr].visitors || 0;
    }
  }

  // Calculate past 365 days
  let last365DaysViews = 0;
  let last365DaysVisitors = 0;
  Object.keys(allDates).forEach(dStr => {
    const dTime = new Date(dStr).getTime();
    if (now.getTime() - dTime <= 365 * 86400000) {
      last365DaysViews += allDates[dStr].views || 0;
      last365DaysVisitors += allDates[dStr].visitors || 0;
    }
  });

  // Calculate lifetime views & visitors
  const sumOfAllRecordedViews = Object.values(allDates).reduce((acc, curr) => acc + (curr.views || 0), 0);
  const sumOfAllRecordedVisitors = Object.values(allDates).reduce((acc, curr) => acc + (curr.visitors || 0), 0);

  const lifetimeViews = Math.max(
    firestoreOverview?.totalViews || 0,
    localCache.totalViews || 0,
    sumOfAllRecordedViews
  );

  const totalVisitors = Math.max(
    firestoreOverview?.totalVisitors || 0,
    localCache.totalVisitors || 0,
    sumOfAllRecordedVisitors
  );

  // If there are visitors but no device count yet, allocate to current client environment
  const totalDeviceVisits = Object.values(mergedDevices).reduce((a, b) => a + b, 0);
  if (totalVisitors > 0 && totalDeviceVisits === 0) {
    const currentEnv = detectClientEnvironment();
    mergedDevices[currentEnv.device] = totalVisitors;
    mergedBrowsers[currentEnv.browser] = totalVisitors;
    mergedOS[currentEnv.os] = totalVisitors;
  }

  // Build daily timeline series for charts (past 30 days chronologically)
  const dailySeries = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 86400000);
    const dStr = d.toISOString().split('T')[0];
    const item = allDates[dStr] || { views: 0, visitors: 0 };
    dailySeries.push({
      date: dStr,
      views: item.views || 0,
      visitors: item.visitors || 0,
      label: formatBengaliDateLabel(dStr),
      dayName: BENGALI_DAYS[d.getDay()]
    });
  }

  return {
    todayViews,
    todayVisitors,
    last7DaysViews,
    last7DaysVisitors,
    last30DaysViews,
    last30DaysVisitors,
    last365DaysViews,
    last365DaysVisitors,
    lifetimeViews,
    totalVisitors,
    postViews: mergedPostViews,
    dailySeries,
    devices: mergedDevices,
    browsers: mergedBrowsers,
    operatingSystems: mergedOS
  };
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
    firebaseConfig,
    recordSitePageView,
    recordPostView,
    fetchAnalyticsOverview,
    resetAllAnalyticsData,
    detectClientEnvironment,
    toBengaliNumber,
    formatBengaliDateLabel
  };
}


