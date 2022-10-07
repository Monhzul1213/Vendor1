import React from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicAIIcon } from './DynamicIcon';

export function Error2(props){
  const { t } = useTranslation();
  const { error, label, fromForm, id } = props;

  return (
    <div className={fromForm ? 'error_back_no_margin' : 'error_back'}>
      <DynamicAIIcon name='AiOutlineInfoCircle' className='error_icon2'  />
      <span className='error_text' id={id}>{label ? (t(label) + t('errors.' + error)) : error}</span>
      {/* <span className='error_text'>{label ? t(label) : ''}{t('errors.' + error)}</span> */}
    </div>
  )
}