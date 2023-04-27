

import React, { useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { getUser } from '../../firebase';
import { login } from '../../services/login.slice';
import  logo1_white  from '../../assets/logo1_white.png';
import { Error2, Language, Loader } from '../all';
import { Input } from './Input';
import { Social } from './Social';

export default function LoginNew(){
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const user = useSelector(state => state.login.webUser);
  const toRemember = useSelector(state => state.login.toRemember);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
 useEffect(() => {
    if(user?.WebUserID) setEmail(user?.WebUserID);
    if(toRemember && user?.WebPassword) setPassword(user?.WebPassword);
    if(toRemember) setChecked(true);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const handleEnter = e => {
    if (e?.key?.toLowerCase() === "enter") {
      const form = e.target.form;
      const index = [...form].indexOf(e.target);
      form.elements[index + 1].focus();
      e.preventDefault();
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await getUser(email?.toLowerCase(), password?.trim());
    if(res?.error){
      setError(res?.error);
      setLoading(false);
    } else {
      dispatch(login({user: res.webUser, toRemember: checked}))
    }
  }

  const onForgot = () => { navigate({ pathname: "/forgot_password", search: createSearchParams({ email }).toString()})}
  const nameProps = { label: 'login.username', value: email, setValue: setEmail,  setError, handleEnter, };
  const passProps = { label: 'login.password', value: password, setValue: setPassword, setError, isPassword: true };

return (
    <div className='login_back_3'>
      <img src={logo1_white} alt='Logo' className='login_form_logo3' />
      <div className='login_header_3'>
        <Language id='login_language_2' />
      </div>
      <form onSubmit={handleSubmit} className='login_form_3'>
        <p className='login_title_3'>{t('admin')}</p>
        <Input {...nameProps} id='username' />
        <Input {...passProps} />
        {error ? <Error2 error={error} id='login_error_3' /> : null}
        <button type='submit' className='login_form_btn' id='login_form_btn3'>
          {loading ? <Loader className='login_loader' color='#fff' /> : t('login.login')}
        </button>
        <div className='pass_row'>
          <Checkbox className='remember_check' checked={checked} onChange={e => setChecked(e?.target?.checked)}>{t('remember')}</Checkbox>
          <span className='forgot_link' onClick={onForgot}>{t('forgot')}</span> 
        </div>
        <Social />
        <a className='copyright_text' target="blank" href={'https://' + t('login.link')} id='copy'>{t('login.link')}</a>
        <span className='copyright_text2'>2022</span>
      </form>
    </div>
  )
}