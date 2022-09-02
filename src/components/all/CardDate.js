import React from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from 'antd';

import { Error } from './Error';

export function CardDate(props){
  const { label, value, setValue, disabled, disabledDate } = props;
  const { t } = useTranslation();
  const onChange = e => setValue({ value: e, error: null });

  return (
    <div className='card_input_container'>
      <p className='card_input_label'>{t(label)}</p>
      <DatePicker className='card_input'
        value={value?.value}
        disabled={disabled}
        format='yyyy.MM.DD'
        placeholder=''
        disabledDate={disabledDate}
        onChange={onChange} />
      {value?.error ? <Error label={label} error={value?.error} fromForm={true} /> : null}
    </div>
  )
}