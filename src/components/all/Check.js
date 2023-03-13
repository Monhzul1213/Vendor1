import * as React from 'react';
import {  Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { Error } from './Error';
export function Check(props) {
    const { label, value, setValue,} = props;
    const { t } = useTranslation();

 
  const onChange = (e) => {
    console.log( e.target.value);
    setValue(e.target.value);
  };
  return (
  <>
    <div className='card_input_container'>
    <p className='card_input_label'>{t(label)}</p>
        <Radio.Group onChange={onChange} value={value} className='card_input'>
            <Radio value="Y"> {t('true')}</Radio>
            <Radio value="N"> {t('false')}</Radio>
        </Radio.Group>
   
    {value?.error ? <Error label={label} error={value?.error} fromForm={true} /> : null}
  </div>
    </>
  );
};
