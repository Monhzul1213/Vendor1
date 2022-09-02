import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {getUser} from '../../firebase';
import { useDispatch } from 'react-redux';
import { login } from '../../services/login.slice';
import  logo from '../../assets/logo.png';
import { Error, Language, Loader} from '../all';
import {Input} from './Input'

export default function LoginForm(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[error, setError]= useState('')
  const[loading, setLoading]= useState(false)
  const[loader, setLoader]= useState(false)

  const {t}= useTranslation()
  const dispatch = useDispatch();

  const loginToApp = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await getUser(email?.trim(), password?.trim());
    console.log(res) 
    if(res?.error){
      setError(res?.error);
      setLoading(false);
    } else {

      dispatch(login(res.webUser))
      // console.log(res.webUser)
      
    }
  }

  const nameProps = { label: 'login.email', value: email, setValue: setEmail,  setError };
  const passProps = { label: 'login.password', value: password, setValue: setPassword, setError, isPassword: true };

return (
    <div className='login_form_container'>
      <div className='login_form_title_row'>
          <Language />
      </div>
      <img src={logo} alt='Logo' className='login_form_logo' />
      <p className='admin'>ADMIN VENDOR</p>
      
      <form  className='login_form_back' onSubmit={loginToApp} >
            <Input {...nameProps}/>
            <Input {...passProps}/>
             {error? <Error error={error} /> :null}
            <button type='submit' className='login_form_btn'
            disabled={loading}  >
            {loading ? <Loader className='login_loader' color='#fff' /> : t('login.login')}
            </button>
      </form>
      <a className='copyright_text' target="_blank" href={'https://' + t('login.link')}>{t('login.link')}</a>
    </div>
  )
} 