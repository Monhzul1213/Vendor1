import React from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicAIIcon } from './DynamicIcon';

export function Error1(props){
  const { t } = useTranslation();
  const { error, label, fromForm } = props;

  return (
    <div className={fromForm ? 'error_back_no_margin1' : 'error_back1'}>
      <DynamicAIIcon name='AiOutlineInfoCircle' className='error_icon1' />
      <span className='error_text1'>{label ? (t(label) + t('errors.' + error)) : error}</span>
      {/* <span className='error_text'>{label ? t(label) : ''}{t('errors.' + error)}</span> */}
    </div>
  )
}