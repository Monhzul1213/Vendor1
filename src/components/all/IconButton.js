import React from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicAIIcon } from './DynamicIcon';

export function IconButton(props){
  const { t } = useTranslation();
  const { icon, label, onClick, className } = props;

  return (
    <button onClick={onClick} className={className + 'btn'}>
      <DynamicAIIcon name={icon} className={className + 'icon'} />
      <span className={className + 'text'}>{t(label)}</span>
    </button>
  )
}