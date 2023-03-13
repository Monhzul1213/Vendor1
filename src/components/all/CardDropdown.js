import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { Error } from './Error';

export function CardDropdown(props){
  const { label, value, setValue, disabled, loading, onFocus,  } = props;
  const { t } = useTranslation();

  return (
    <div className='card_input_container'>
      <p className='card_input_label'>{t(label)}</p>
      <Select className='card_input'
        loading={loading === label}
        value={[value]}
        showSearch
        onFocus={onFocus}
        disabled={disabled}
        onSelect={e => setValue(e)}>

      </Select>
      {value?.error ? <Error error={value?.error} fromForm={true} /> : null}
    </div>
  )
}