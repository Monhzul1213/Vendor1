import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import  admin_login  from '../../assets/admin_login.jpg';
// import  admin_login1  from '../../assets/admin_login1.jpg';
export default function LoginImages(){
  return (
    <div>
      <div className='login_image_container'>
        <img src={admin_login} alt='image_login' className='login_image' />
      </div>
      <div className='login_slides'>
        {/* <Swiper  centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        >
          <SwiperSlide>
            <img src={admin_login1} alt='image_login' className='login_image' />
          </SwiperSlide>
          <SwiperSlide> */}
            <img src={admin_login} alt='image_login' className='login_image' />
          {/* </SwiperSlide>
        </Swiper> */}
      </div>
    </div>
  )
} 