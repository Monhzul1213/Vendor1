import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { DynamicAIIcon } from './DynamicIcon';

export function FilterInput(props){
  const { t } = useTranslation();
  const { label, value, setValue, onPressEnter, icon } = props;
  const ref = useRef(null);

  const onKeyDown = e => {
    if(e.key === 'Enter') onPressEnter();
  }

  const onClickClear = () => {
    setValue('');
    ref?.current?.focus();
  }

  return (
    <div className='filter_input_back'>
      <DynamicAIIcon className='filter_icon' name={icon} />
      <input className='filter_input'
        ref={ref}
        value={value}
        placeholder={t(label)}
        onChange={e => setValue(e.target.value)}
        onKeyDown={onKeyDown} />
      {value ? <DynamicAIIcon className='filter_clear' name='AiFillCloseCircle' onClick={onClickClear} /> : null}
    </div>
  )
}