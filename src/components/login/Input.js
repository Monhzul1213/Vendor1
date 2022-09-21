import React from 'react';
import { useTranslation } from 'react-i18next';
import { Input as AntInput } from 'antd';

export function Input(props){
  const { label, value, setValue, isPassword, handleEnter, setError } = props;
  const { t } = useTranslation();

  const onChange = e => {
    setValue(e?.target?.value);
    setError && setError('');
  }

  const inputProps = { onKeyDown: handleEnter, value, onChange };

  return (
    <div className='login_input_container'>
      <p className='login_input_label'>{t(label)}</p>
      {isPassword
        ? <AntInput.Password {...inputProps} className="input-password" />
        : <div className='login_input_back'><AntInput {...inputProps} /></div>
      }
    </div>
  )
}