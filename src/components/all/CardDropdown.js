import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';

import { Error } from './Error';

export function CardDropdown(props){
  const { label, value, setValue, data, disabled, loading, onFocus, vKey, vLabel } = props;
  const { t } = useTranslation();
  const { Option } = Select;

  return (
    <div className='card_input_container'>
      <p className='card_input_label'>{t(label)}</p>
      <Select className='card_input'
        loading={loading === label}
        value={[value]}
        // filterOption={(input, option) => option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        showSearch
        onFocus={onFocus}
        disabled={disabled}
        onSelect={e => setValue(e)}>
        {/* {data?.map(item => {
          return (<Option key={item[vKey ?? 'ClassID']} value={item[vKey ?? 'ClassID']}>{item[vLabel ?? 'Descr']}</Option>)
        })} */}
      </Select>
      {value?.error ? <Error error={value?.error} fromForm={true} /> : null}
    </div>
  )
}