import React, { useState, useEffect, createContext } from 'react';
import { onAuthStateChanged, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { auth, db, appId, initialAuthToken } from './firebaseConfig'; // Import from firebaseConfig

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        if (!auth) {
            console.error("Firebase Auth not initialized. Cannot set up auth listener.");
            setIsAuthReady(true);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setCurrentUser(user);
                setUserId(user.uid);
            } else {
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                    } else {
                        await signInAnonymously(auth);
                    }
                } catch (error) {
                    console.error("Anonymous or custom token sign-in failed:", error);
                    setCurrentUser(null);
                    setUserId(null);
                }
            }
            setIsAuthReady(true);
        });

        return () => unsubscribe(); // Empty dependency array means this effect runs once on mount
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser, userId, isAuthReady, auth, db, appId }}>
            {children}
        </AuthContext.Provider>
    );
};
