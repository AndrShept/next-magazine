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
        <SwiperSlide className="" key={imageUrl}>
          <div
            onClick={(e) => e.stopPropagation()}
            className=" relative h-[400px]  max-w-[600px] rounded-lg md:h-[700px] md:max-w-[1000px]  lg:left-[20%]"
          >
            <Image
              className=""
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
