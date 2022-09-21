import React from 'react';

import { DynamicAIIcon } from './DynamicIcon';
import { IconButton } from './IconButton';

export function SearchButton(props){
  const { onClick, isDouble } = props;

  return (
    <>
      <IconButton
        className={isDouble ? 'search2_' : 'search_'}
        icon='AiOutlineSearch'
        label='search'
        onClick={onClick} />
      <button className={isDouble ? 'icon_btn2' : 'icon_btn'} onClick={onClick}>
        <DynamicAIIcon className='search_icon' name='AiOutlineSearch' />
      </button>
    </>
  )
}