import React, {useState} from 'react';
import '../../css/menu.css';
import {User} from '../all/User'
import logo1 from '../../assets/logo1.png'
import { useTranslation } from 'react-i18next';
import { ImOffice } from "react-icons/im";
import { Language } from '../all'

export function Header(){
  const { t } = useTranslation();
  
  return (
    <div className='header_back'>
      <img src={logo1} className="menu_logo_back"/>
      <p className='menu_logo_title'>{t('vendor_list')}</p>
        <Language hideArrow={true}/>
        <User/>
    </div>
  )
}