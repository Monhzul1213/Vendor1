import React, { useEffect, useState, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './services/userSlice';
import { auth, getUser, onAuthStateChanged } from './firebase';
// import './i18n'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import {Login} from './pages/Login'
import {Company} from './pages/Company'
import {Loading} from './pages/Loading'



export function App() {
  const user = useSelector(state => state.login.user);
  // const dispatch = useDispatch();
  // const [email, setEmail]= useState('');
  // const [password,setPassword]= useState('')
  
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //         getUser(email,password)
  //     } else {
  //       dispatch(logout());
  //     }
  //   });
  //   console.log('page loaded');
  // }, []);

  
 if(!user) return (<Login />);
  return (
        <Suspense fallback={<Loading/>}>
           <Company/>
        </Suspense>
        
  );
}

// export default App;