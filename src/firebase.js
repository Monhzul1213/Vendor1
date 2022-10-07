
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { config } from './helpers/login.config'
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


const app = initializeApp(config?.firebaseConfig);
const storage = getStorage();
// const firebaseConfig = {
//   apiKey: "AIzaSyDoHFNtze2u01yMB2HH7-N76s_1fX3kGrg",
//   authDomain: "ultimatevendorweb.firebaseapp.com",
//   projectId: "ultimatevendorweb",
//   storageBucket: "ultimatevendorweb.appspot.com",
//   messagingSenderId: "38110257902",
//   appId: "1:38110257902:web:5f825e30bf2f2d6e0309ff",
//   measurementId: "G-4QZQVDV9XH"
// };
// // const firebaseConfig = {
//   apiKey: "AIzaSyBiLs5ZVLHORNLno0WtIv4abeYh1oojKhk",
//   authDomain: "ultimatevendorwebtest.firebaseapp.com",
//   projectId: "ultimatevendorwebtest",
//   storageBucket: "ultimatevendorwebtest.appspot.com",
//   messagingSenderId: "290240407231",
//   appId: "1:290240407231:web:0aae3b50013031ec51080a",
//   measurementId: "G-V6P4QY6KEY"
// };
// init firebase app
// initializeApp(firebaseConfig);

// init services
const db = getFirestore(app);
export const auth = getAuth(app);

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
  // console.log(email.includes(email.toLowerCase()))
  try {
    const userRef = collection(db, "smWebUsers");
    const q1 = query(userRef, where("WebUserID", "==", email.toLowerCase()), limit(1));
    // const q2 = query(userRef, where("WebUserID", "==", email), limit(1));
    const query1 = await getDocs(q1);
      let webUser = null;
      query1.forEach(doc => webUser = doc.data());
    if(!webUser){
      return Promise.resolve({ error: 'Хэрэглэгч бүртгэлгүй байна.' });
    } else if(webUser?.WebPassword !== password){
      return Promise.resolve({ error: 'Хэрэглэгчийн нууц үг буруу байна.' })
    } 
      // console.log(webUser)
      // return Promise.resolve({webUser})
      else return Promise.resolve({ error: false, webUser });
    
  } catch (err) {
    console.error(err);
    return Promise.resolve({ error: err.code });
  }
}
// export const vendLogin = async (email, password) => {
//   try {
//     const userRef = collection(db, "smWebUsers");
//     const q1 = query(userRef, where("WebUserID", "==", email?.toLowerCase()));
//     const query1 = await getDocs(q1);
//     const users = [];
//     query1.forEach(doc => {
//       let user = doc.data();
//       if(user) user.id = doc.id;
//       users?.push(user)
//     });
//     if(!users?.length){
//       return Promise.resolve({ error: 'Хэрэглэгч бүртгэлгүй байна.' });
//     } else if(users?.length === 1){
//       return webLogin(users[0], password);
//     } else {
//       return Promise.resolve({ error: null, users });
//     }
//   } catch(err) {
//     console.error(err);
//     return Promise.resolve({ error: err.code });
//   }
// }

// export const getUser1 = async (webUser, password) => {
//   try {
//     if(webUser?.WebPassword !== password)
//       return Promise.resolve({ error: 'Хэрэглэгчийн нууц үг буруу байна.' });
    
//       // else if(vendorUser?.IsFirst !== 'N') return Promise.resolve({ IsFirst: true, vendorUser, webUser });
//       else return Promise.resolve({ error: false, vendorUser, webUser });
    
//   } catch(error){
//     console.error(error);
//     return Promise.resolve({ error: error.code });
//   }
// }
export const logout = () => {
  signOut(auth);
};
