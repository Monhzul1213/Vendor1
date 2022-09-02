import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import '../../css/filter.css';
import { AddButton } from '../all';
import { Card } from './Card';

export function Filter(props) {
  const { addRequest, getData, dates, setDates, status, setStatus, setError, noAdd } = props;

  return (
    <>
      <div className='filter_container3'>
      <AddButton onClick={addRequest} addLabel='new_vendor' />
      </div>
    </>
  );
};