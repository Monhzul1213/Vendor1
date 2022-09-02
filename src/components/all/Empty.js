import React from 'react';
import { useTranslation } from 'react-i18next';
import "../../css/table.css"
import  empty  from '../../assets/empty.png';

export function Empty({ id }){
  const { t } = useTranslation();

  return (
    <div className='empty_back' id={id}>
      <img src={empty} alt='empty' className='empty_img' />
      <p className='empty_text'>{t('empty')}</p>
    </div>
  )
}