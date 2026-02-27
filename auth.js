import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDsDns7_3S2bq8sqtwbwwWfg85YR4lUvBE",
    authDomain: "spiral-a65ea.firebaseapp.com",
    projectId: "spiral-a65ea",
    storageBucket: "spiral-a65ea.firebasestorage.app",
    messagingSenderId: "536948820551",
    appId: "1:536948820551:web:80d221cf7942655bfcff62",
    measurementId: "G-S7XHJWZXXS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// --- Auth State Handlers ---

export function signUp(email, password, username) {
    return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return updateProfile(user, {
                displayName: username
            }).then(() => {
                // Initialize user document in Firestore
                return setDoc(doc(db, "users", user.uid), {
                    username: username,
                    email: email,
                    balance: 10000,
                    positions: {},
                    watchlist: [],
                    createdAt: new Date()
                });
            });
        });
}

export function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logInWithGoogle() {
    return signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            // Check if user exists in Firestore, if not create them
            const userRef = doc(db, "users", user.uid);
            return getDoc(userRef).then((docSnap) => {
                if (!docSnap.exists()) {
                    return setDoc(userRef, {
                        username: user.displayName || user.email.split('@')[0],
                        email: user.email,
                        balance: 10000,
                        positions: {},
                        watchlist: [],
                        createdAt: new Date()
                    });
                }
            });
        });
}

export function logOut() {
    return signOut(auth);
}

// --- Data Syncing ---

export async function getUserData(uid) {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
}

export async function saveUserData(uid, data) {
    const userRef = doc(db, "users", uid);
    return updateDoc(userRef, data);
}

// --- Export Auth Instance ---
export { auth };
