
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  orderBy,
  limit,
  onSnapshot,
  query, setDoc, where
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDoHFNtze2u01yMB2HH7-N76s_1fX3kGrg",
  authDomain: "ultimatevendorweb.firebaseapp.com",
  projectId: "ultimatevendorweb",
  storageBucket: "ultimatevendorweb.appspot.com",
  messagingSenderId: "38110257902",
  appId: "1:38110257902:web:5f825e30bf2f2d6e0309ff",
  measurementId: "G-4QZQVDV9XH"
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
export const auth = getAuth();

export {
  db,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  serverTimestamp,
  doc,
  orderBy,
  limit,
  onSnapshot,
  query,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  setDoc,
  getAuth
};
// export const getUser = async (email, password) => {
//   try {
//     const userRef = collection(db, "smWebUsers");
//     const q = query(userRef, where("WebUserID", "==", email ), where("WebPassword", "==", password));
//     const querySnapshot = await getDocs(q);
//     let user = null;
//     querySnapshot.forEach((doc) => {
//       user = doc.data();
//       console.log(doc.data())
//     })  
//     // console.log('====', email, password)
//     return Promise.resolve({ error: false});
//   } catch (err) {
//     console.error('Хэрэглэгч бүртгэлгүй байна');
//     return Promise.resolve({ error: err.code });
//   }
// }
export const getUser = async (email, password) => {
  try {
    const userRef = collection(db, "smWebUsers");
    const q1 = query(userRef, where("WebUserID", "==", email), limit(1));
    const query1 = await getDocs(q1);
    let webUser = null;
    query1.forEach(doc => webUser = doc.data());
    if(!webUser){
      return Promise.resolve({ error: 'Хэрэглэгч бүртгэлгүй байна.' });
    } else if(webUser?.WebPassword !== password){
      return Promise.resolve({ error: 'Хэрэглэгчийн нууц үг буруу байна.' })
    } else{ 
      // console.log(webUser)
      return Promise.resolve({webUser})
    }
  } catch (err) {
    console.error(err);
    return Promise.resolve({ error: err.code });
  }
}
export const logout = () => {
  signOut(auth);
};
