import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import React from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ReviewData } from '@/constant/ReviewData';

import ReviewCard from '../cards/ReviewCard';

const ReviewSection = () => {
  return (
    <div className='flex flex-col items-center'>
      <h2
        className='text-[#3056A2] font-bold text-3xl sm:text-[40px] px-4'
        data-aos='fade-up'
        data-aos-anchor-placement='top-bottom'
        data-aos-duration='300'
      >
        Apa kata pelanggan?
      </h2>
      <div className='flex w-full h-72 mt-14 sm:mt-20 overflow-hidden px-4'>
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={true}
          pagination={{ clickable: true }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 50,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1280: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {ReviewData.map(
            ({ name, rating, imageLink, organization, description }, i) => (
              <SwiperSlide key={i}>
                <ReviewCard
                  name={name}
                  rating={rating}
                  organization={organization}
                  description={description}
                  imageLink={imageLink}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default ReviewSection;
