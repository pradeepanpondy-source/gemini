import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration from global variables (provided by the Canvas environment)
export const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
export const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase App and services once globally
let app;
export let auth;
export let db;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
} catch (error) {
    console.error("Failed to initialize Firebase:", error);
    // In a real app, you might show a user-friendly error message or a fallback UI
}
