import Link from 'next/link';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';

import { GalleryData } from '@/constant/GalleryData';

import GalleryCard from '../cards/GalleryCard';

const ProductSection = () => {
  return (
    <div className='flex flex-col px-4 sm:px-0 sm:w-10/12 items-center mx-auto'>
      <div className='flex flex-row justify-between items-center  w-full'>
        <h2
          className='text-[#3056A2] font-bold text-3xl sm:text-[40px]'
          data-aos='fade-up'
          data-aos-anchor-placement='top-bottom'
          data-aos-duration='300'
        >
          Produk Kami
        </h2>
        <Link
          data-aos='fade-up'
          data-aos-anchor-placement='top-bottom'
          data-aos-duration='600'
          href='/gallery'
          className='text-[#E76767] font-medium flex flex-row items-center gap-1 text-sm sm:text-base group hover:underline decoration-[#E76767] underline-offset-4 '
        >
          Lihat Galeri{' '}
          <GoArrowRight className='w-4 h-4 mt-1 group-hover:translate-x-1 transition-aall ease-in-out duration-200' />
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 w-full mt-14 sm:mt-20 gap-8 sm:gap-4'>
        {GalleryData.slice(0, 3).map(({ ...v }) => (
          <GalleryCard key={v.name} {...v} withName={true} />
        ))}
      </div>
    </div>
  );
};

export default ProductSection;
