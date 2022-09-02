import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

import  image_login2  from '../../assets/image_login2.png';
import  image_login3  from '../../assets/image_login3.jpg';
export default function LoginImages(){
  return (
    <div>
      <div className='login_image_container'>
        <img src={image_login2} alt='image_login' className='login_image' />
      </div>
      <div className='login_slides'>
        <Swiper  centeredSlides={true}
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
            <img src={image_login3} alt='image_login' className='login_image' />
          </SwiperSlide>
          <SwiperSlide>
            <img src={image_login2} alt='image_login' className='login_image' />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
} 