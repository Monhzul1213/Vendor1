import React from 'react';
import { useTranslation } from 'react-i18next';

import { Error } from './Error';

export function CardNote(props){
  const { label, value, setValue, disabled } = props;
  const { t } = useTranslation();

  const onChange = e => setValue({ value: e?.target?.value, error: null });

  return (
    <div className='card_input_container'>
      <p className='card_input_label'>{t(label)}</p>
      <textarea className='card_note'
        disabled={disabled}
        value={value?.value}
        onChange={onChange} />
      {value?.error ? <Error label={label} error={value?.error} fromForm={true} /> : null}
    </div>
  )
}