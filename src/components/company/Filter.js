import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import '../../css/filter.css';
import { AddButton, Check, FilterInput, SearchButton } from '../all';
import { Card } from './Card';

export function Filter(props) {
  const { addRequest, getUser,setData, dates, setDates, status, setStatus, setError, noAdd , VendID, setVendID, data} = props;
  return (
    <>
      <div className='filter_container2'>
      <div className='filter_container3'>
        <div className='filter_container'>
          <FilterInput
            label='table.vendorcode'
            value={VendID}
            setValue={setVendID} 
            // onPressEnter={() => setData(VendID)}
            icon='AiOutlineUser' />
          <SearchButton 
          // onClick={() => setData(data)} 
          />
        </div>
        
      </div>
      <AddButton onClick={addRequest} addLabel='new_vendor' />
      </div>
    </>
  );
};