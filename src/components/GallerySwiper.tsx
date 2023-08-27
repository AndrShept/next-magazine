'use client';

import React from 'react';

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import Image from 'next/image';

export const GallerySwiper = ({ imageArrUrl }: { imageArrUrl: string[] }) => {
  return (
    <Swiper
      // effect='fade'
     
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      // navigation
      // pagination={{ clickable: false }}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: true,
      }}
    >
      {imageArrUrl.map((imageUrl) => (
        <SwiperSlide className='' key={imageUrl}>
          <div onClick={(e)=>  e.stopPropagation()} className=' relative md:max-w-[1000px]  rounded-lg md:h-[700px] max-w-[600px] lg:left-[20%]  h-[400px]'>
            <Image
              className=''
             
              width={1000}
              height={1000}
              alt={'sa'}
              src={imageUrl}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
