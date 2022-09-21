import * as React from 'react';
import { Checkbox, Row, Col, Radio } from 'antd';
import { useTranslation } from 'react-i18next';
import { Error } from './Error';
import Password from 'antd/lib/input/Password';
export function Check(props) {
    const { label, value, setValue, handleEnter, disabled, id, vLabel } = props;
    const { t } = useTranslation();

//   const onChange = e => setValue({ value: e?.target?.value, error: null });
 
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
