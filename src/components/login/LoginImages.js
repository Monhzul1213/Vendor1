import React from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import  image_login3  from '../../assets/image_login3.jpg';

export default function LoginImages(){
  return (
    <div>
      <div className='login_image_container'>
        <img src={image_login3} alt='image_login' className='login_image' />
      </div>
    </div>
  )
} 