import React,{Suspense} from 'react';
import LoginForm from '../components/login/LoginForm';
import LoginImages from '../components/login/LoginImages';
import LoginNew from '../components/login/LoginNew';
import '../css/login1.css';
import { Loading } from './Loading';



export function Login(){
  return (
    <Suspense fallback={<Loading />}>
    {/* <div className='login_container'>
      <LoginImages />
      <div className='login_form'>
      <LoginForm />
      </div>    
    </div> */}
    <LoginNew/>
    </Suspense>
  )
} 