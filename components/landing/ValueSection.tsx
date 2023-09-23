import Link from 'next/link';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';

import { GalleryData } from '@/constant/GalleryData';

import GalleryCard from '../cards/GalleryCard';
import Image from 'next/image';
import { ValueData } from '@/constant/ValueData';
import ValueCard from '../cards/ValueCard';

const ValueSection = () => {
  return (
    <div className='relative py-16 bg-[#E9F0FF] z-0'>
      <div className='relative flex flex-col px-4 sm:px-0 sm:w-10/12 items-center justify-center mx-auto '>
        <div className='flex flex-row justify-between items-center  w-full'>
          <h2
            className='text-[#3056A2] font-bold text-3xl sm:text-[40px]'
            data-aos='fade-up'
            data-aos-anchor-placement='top-bottom'
            data-aos-duration='300'
          >
            Value Kami
          </h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 w-full mt-14 sm:mt-20 gap-8 sm:gap-4 mx-auto  '>
          {ValueData.map(({ ...v }) => (
            <ValueCard key={v.name} {...v} />
          ))}
        </div>
      </div>

      {/* Background */}
      <Image
        src={'/ornament/leaf-3.png'}
        width={191}
        height={296}
        alt='leaf-3'
        className='absolute left-0 bottom-0 -z-10'
        data-aos='fade-right'
        data-aos-delay='400'
      />
      <Image
        src={'/ornament/leaf-4.png'}
        width={197}
        height={320}
        alt='leaf-4'
        className='absolute right-0 bottom-0 -z-10'
        data-aos='fade-left'
        data-aos-delay='400'
      />
    </div>
  );
};

export default ValueSection;
