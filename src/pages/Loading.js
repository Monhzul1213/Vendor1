import React from 'react';
import HashLoader from "react-spinners/HashLoader";

export function Loading(){
  return (
    <div className='loading'>
      <HashLoader color='#25a0fe' />
    </div>
  )
}