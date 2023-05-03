import React, { useEffect,  Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import { Login } from './pages/Login';
import { Company } from './pages/Company';
import { Loading } from './pages/Loading';
import { PasswordForgot } from './pages/PasswordForgot';
import { PasswordReset } from './pages/PasswordReset';
import { setIsLoggedIn } from './services';



export function App() {
  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!window.sessionStorage.length){
      window.localStorage.setItem('getSessionStorage', Date.now());
    } else {
      dispatch(setIsLoggedIn(true));
    }
    window.addEventListener('storage', function(event){
      if(event.key === 'getSessionStorage') {
        window.localStorage.setItem('sessionStorage', Date.now());
        window.localStorage.removeItem('sessionStorage');
      } else if(event.key === 'sessionStorage' && !window.sessionStorage.length){
        window.sessionStorage.setItem('CREDENTIALS_TOKEN', Date.now());
        dispatch(setIsLoggedIn(true));
      } else if(event.key === 'CREDENTIALS_FLUSH'){
        dispatch(setIsLoggedIn(false));
        window.sessionStorage.removeItem('CREDENTIALS_TOKEN');
      }
    });
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
 if(!user) return (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
    <Routes>
      <Route path='*' element={<Login />} />
      <Route path='/forgot_password' element={<PasswordForgot />} />
      <Route path='/reset_password' element={<PasswordReset />} />
    </Routes>
    </Suspense>
  </BrowserRouter>
);
  return (
        <Suspense fallback={<Loading/>}>
           <Company/>
        </Suspense>
        
  );
}
