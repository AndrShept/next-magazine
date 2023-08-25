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

export const SwiperComponent = () => {
  return (
    <Swiper
      // effect='fade'
      className='max-w-4xl  rounded-xl container mb-10'
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectFade, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <Image
          className='object-cover rounded-xl md:h-[500px] h-[300px] w-full'
          height={1000}
          width={1000}
          alt={'sa'}
          src={
            'https://images.unsplash.com/photo-1561729098-cbab0f7a9f7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80'
          }
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className='object-cover rounded-xl md:h-[500px] h-[300px] w-full'
          height={1000}
          width={1000}
          alt={'sa'}
          src={
            'https://images.unsplash.com/photo-1620752379460-d4adfe02a5ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
          }
        />
      </SwiperSlide>
      <SwiperSlide>
        <Image
          className='object-cover rounded-xl md:h-[500px] h-[300px] w-full'
          height={1000}
          width={1000}
          alt={'sa'}
          src={
            'https://images.unsplash.com/photo-1615385639736-362b69696227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80'
          }
        />
      </SwiperSlide>
    </Swiper>
  );
};
