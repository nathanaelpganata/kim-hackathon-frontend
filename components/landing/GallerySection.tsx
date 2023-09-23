import React from 'react';

import { GalleryData } from '@/constant/GalleryData';

import GalleryCard from '../cards/GalleryCard';

const GallerySection = () => {
  return (
    <div className='flex justify-center items-cemnter w-10/12 my-32 mx-auto'>
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto gap-4'>
        <div className='flex flex-col'>
          <h1
            className='text-[#E76767] font-bold text-3xl sm:text-[40px]'
            data-aos='fade-up'
            data-aos-anchor-placement='top-bottom'
            data-aos-delay='200'
          >
            Galeri
          </h1>
          <p
            className='text-[#3056A2] font-medium text-base sm:text-lg mt-4'
            data-aos='fade-up'
            data-aos-anchor-placement='top-bottom'
            data-aos-delay='400'
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque semper vestibulum enim eu accumsan. Curabitur interdum
            libero quis vehicula bibendum. Nullam egestas, nibh ac tempor
            faucibus, dui orci commodo dui
          </p>
        </div>
        {GalleryData.map(({ ...v }) => (
          <GalleryCard key={v.name} {...v} />
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
