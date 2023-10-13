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

export const SwiperComponent = ({ allImageUrl }: { allImageUrl: string[] }) => {
  return (
    <Swiper
      // effect='fade'
      className='max-w-2xl  rounded-xl container mb-10 shadow-xl'
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
      {allImageUrl.map((imgUrl, idx) => (
        <SwiperSlide key={ Date.now() + idx}>
          <Image
            className='object-cover rounded-xl md:h-[400px] h-[250px] w-full'
            height={1000}
            width={1000}
            alt={'sa'}
            src={imgUrl}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
