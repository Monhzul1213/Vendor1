import React from 'react';

import { DynamicAIIcon } from './DynamicIcon';
import { IconButton } from './IconButton';

export function AddButton(props){
  const { onClick, addLabel } = props;

  return (
    <>
      <IconButton
        className='add_'
        icon='AiOutlinePlus'
        label={addLabel ?? 'Шинэ компани нэмэх'}
        onClick={onClick} />
      <button className='fab_btn' onClick={onClick}>
        <DynamicAIIcon className='add_icon' name='AiOutlinePlus' />
      </button>
    </>
  )
}