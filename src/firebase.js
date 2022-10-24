
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { , , addDoc, limit, query, where, getDocs, getDoc, doc, updateDoc } from "firebase/firestore";
import { config1, randomtoken, config } from './helpers'
import {
  getFirestore,  collection,  getDocs,  addDoc,  deleteDoc,  serverTimestamp, doc, orderBy,  limit, onSnapshot,  getDoc,  updateDoc,  query, setDoc, where } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';


const app = initializeApp(config?.firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth(app);
export { db, collection, getDocs, addDoc, deleteDoc, serverTimestamp, doc, orderBy, limit, onSnapshot, query ,  createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword,
signOut, setDoc, getAuth, updateDoc }

export const getUser = async (email, password) => {
  // console.log(email.includes(email.toLowerCase()))
  try {
    const userRef = collection(db, "smWebUsers");
    const q1 = query(userRef, where("WebUserID", "==", email.toLowerCase()), limit(1));
    const query1 = await getDocs(q1);
      let webUser = null;
      query1.forEach(doc => webUser = doc.data());
    if(!webUser){
      return Promise.resolve({ error: 'Хэрэглэгч бүртгэлгүй байна.' });
    } else if(webUser?.WebPassword !== password){
      return Promise.resolve({ error: 'Хэрэглэгчийн нууц үг буруу байна.' })
    } 
      else return Promise.resolve({ error: false, webUser });
  } catch (err) {
    console.error(err);
    return Promise.resolve({ error: err.code });
  }
}

export const logout = () => {
  signOut(auth);
};

export const getWebsByEmail = async email => {
  try {
    const userRef = collection(db, "smWebUsers");
    const q1 = query(userRef, where("WebUserID", "==", email?.toLowerCase()));
    const query1 = await getDocs(q1);
    const users = []
    query1.forEach(doc => {
      let user = doc.data();
      if(user) user.id = doc.id;
      users?.push(user)
    });
    if(!users?.length){
      return Promise.resolve({ error: 'Хэрэглэгч бүртгэлгүй байна.' });
    } else if(users?.length === 1){
      return Promise.resolve({ error: null, id: users[0]?.id });
    } else {
      return Promise.resolve({ error: null, users });
    }
  } catch (error) {
    console.error(error);
    return Promise.resolve({ error: error.code });
  }
}

export const setWebToken = async id => {
  try {
    const ResetToken = randomtoken();
    const docRef = doc(db, "smWebUsers", id);
    await updateDoc(docRef, { ResetToken });
    return Promise.resolve({ error: null, ResetToken });
  } catch (error) {
    console.error(error);
    return Promise.resolve({ error: error.code });
  }
}

export const checkWebToken = async (id, token) => {
  try {
    const docRef = doc(db, "smWebUsers", id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      let user = docSnap.data();
      if(user?.ResetToken && user?.ResetToken === token) return Promise.resolve({ error: null });
      else return Promise.resolve({ error: 'Токен буруу байна.' });
    } else {
      return Promise.resolve({ error: 'Имейл бүртгэлгүй байна.' });
    }
  } catch (error) {
    console.error(error);
    return Promise.resolve({ error: error.code });
  }
}

export const updateWebPassword = async (id, password) => {
  try {
    const docRef = doc(db, "smWebUsers", id);
    await updateDoc(docRef, { WebPassword: password, ResetToken: null });
    return Promise.resolve({ error: null });
  } catch (error) {
    console.error(error);
    return Promise.resolve({ error: error.code });
  }
}
