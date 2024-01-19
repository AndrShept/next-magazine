'use client';

import Image from 'next/image';
import React from 'react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export const SwiperComponent = ({ allImageUrl }: { allImageUrl: string[] }) => {
  return (
    <Swiper
      // effect='fade'
      className="container  mb-10 max-w-2xl rounded-xl shadow-xl"
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
        <SwiperSlide key={Date.now() + idx}>
          <Image
            className="h-[300px] w-full rounded-xl object-cover sm:h-[350px] md:h-[400px]"
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
