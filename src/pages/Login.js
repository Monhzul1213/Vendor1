import React,{Suspense} from 'react';
import LoginNew from '../components/login/LoginNew';
import '../css/login1.css';
import { Loading } from './Loading';



export function Login(){
  return (
    <Suspense fallback={<Loading />}>
        <LoginNew/>
    </Suspense>
  )
} 