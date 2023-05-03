import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../css/login1.css';
import { getWebsByEmail, setWebToken } from '../firebase';
import  logo1_white  from '../assets/logo1_white.png';
import { DynamicAIIcon, Language, Loader, Error2 } from '../components/all';
import { Input } from '../components/login';
import { config } from '../helpers/login.config';

export function PasswordForgot(){
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [searchParams] = useSearchParams();

useEffect(() => {
    let email = searchParams?.get('email');
    setEmail(email ?? '');
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const showError = error => {
    setError(error);
    setLoading(false);
  }

const showList = users => {
    setLoading(false)
  }

const sendEmail = async id => {
    setLoading(true);
    const response = await setWebToken(id);
    if(response?.error) showError(response?.error);
    else {
      const link = config?.domain + '/reset_password?id=' + id + '&token=' + response?.ResetToken;
      const templateParams = { to: email?.trim(), link };
      emailjs.send('service_k7osau8','template_6qxxzw8', templateParams, 'q2YX3XN0cT2C8g_Ni')
        .then((response) => {
          setSent(true);
          setLoading(false);
        }, (err) => {
          setError(err?.text ?? 'Error');
          setLoading(false);
        }
      );
    }
  }
  
const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    const response = await getWebsByEmail(email?.trim());
    if(response?.error) showError(response?.error);
    else if(response?.users) showList(response?.users);
    else sendEmail(response?.id);
  }

const emailProps = { label: 'login.email', value: email, setValue: setEmail, setError };

  return (
    <div className='login_back_3'>
      <img src={logo1_white} alt='Logo' className='login_form_logo3' />
      <div className='login_header_3'>
        <Language id='login_language_2' />
      </div>
      <form onSubmit={handleSubmit} className='login_form_3'>
        <p className='login_title_3'>{t('reset')}</p>
        <Input {...emailProps}  id='username'/>
        {error ? <Error2 error={error} id='login_error_3' /> : null}
        <button type='submit' className='login_form_btn' id='login_form_btn3'>
          {loading ? <Loader className='login_loader' color='#fff' /> : t('send')}
        </button>
        {sent && <div className='sent_back'>
          <div className='sent_icon_back'><DynamicAIIcon className='sent_icon' name='AiOutlineMail' /></div>
          <p className='sent_text'>{t('sent')}</p>
        </div>}
        <div className='rback_row'>
          <Link to='/admin' className='rback_link'>
            <DynamicAIIcon className='rback_icon' name='AiOutlineArrowLeft' />
            <span className='rback_text'>{t('back')}</span>
          </Link>
        </div>
      </form>
    </div>
  )
}