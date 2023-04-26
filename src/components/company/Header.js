import React from 'react';
import '../../css/menu.css';
import { User } from '../all/User'
import logo_new from '../../assets/logo_new.png'
import { useTranslation } from 'react-i18next';

export function Header(){
  const { t } = useTranslation();

  return (
    <div className='header_back'>
      <img src={logo_new} alt= 'logo' className="menu_logo_back"/>
      <p className='menu_logo_title'>{t('vendor_list')}</p>
        <User/>
    </div>
  )
}