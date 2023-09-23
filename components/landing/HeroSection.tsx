'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { GoArrowRight } from 'react-icons/go';

const HeroSection = () => {
  return (
    <div className='relative flex flex-col min-h-screen w-full items-center justify-center bg-slate-100 overflow-hidden'>
      <div className='relative top-44 lg:top-32 2xl:top-44 flex flex-col sm:items-center z-50 px-4 md:px-32 text-left sm:text-center'>
        <h1
          className='text-[#E14747] text-5xl sm:text-6xl font-bold'
          data-aos='fade-up'
          data-aos-duration='300'
        >
          Temukan dan buat suvenirmu disini!
        </h1>
        <h2
          className='text-[#3056A2] text-xl sm:text-2xl mt-3 sm:mt-2'
          data-aos='fade-up'
          data-aos-duration='500'
        >
          Produk berkualitas tinggi dengan harga terjangkau
        </h2>
        <Link
          href={'/order'}
          className='mt-8 sm:mt-4 flex flex-row items-center bg-[#3056A2] font-medium text-xl sm:text-2xl px-5 py-2 rounded-full text-white gap-1 group w-max'
          data-aos='fade-up'
          data-aos-duration='700'
        >
          Pesan Sekarang{' '}
          <GoArrowRight className='w-6 h-6 mt-1 group-hover:translate-x-2 transition-aall ease-in-out duration-200' />
        </Link>
      </div>

      {/* Background */}
      <div className='bg-[#E9F0FF] sm:w-[1000px] sm:h-[1000px]  md:w-[1300px] md:h-[1300px] rounded-full flex-shrink-0 absolute left-1/2 -translate-x-1/2'></div>
      <Image
        src={'/hero.svg'}
        width={1440}
        height={613}
        alt='hero image'
        className='mt-auto w-full'
        data-aos='fade-up'
        data-aos-delay='400'
      />
      {/* Ornament */}
      <Image
        src={'/ornament/rabbit-1.png'}
        width={320}
        height={420}
        alt='rabbit-1'
        style={{ rotate: '45deg' }}
        className='w-[10%] xl:w-[5%] absolute right-4 top-[13%] xl:top-44'
        data-aos='fade-right'
        data-aos-delay='800'
      />
      <Image
        src={'/ornament/leaf-1.png'}
        width={320}
        height={420}
        alt='leaf-1'
        style={{ rotate: '180deg' }}
        className='w-[10%] xl:w-[5%] absolute right-8 top-[50%] xl:top-20'
        data-aos='fade-right'
        data-aos-delay='400'
      />
      <Image
        src={'/ornament/teddy-1.png'}
        width={320}
        height={420}
        alt='teddy-1'
        style={{ rotate: '-45deg' }}
        className='w-[20%] sm:w-[0%] xl:w-[5%] absolute right-48 top-[70%] xl:top-52'
        data-aos='fade-right'
        data-aos-delay='1200'
      />
      <Image
        src={'/ornament/dino-1.png'}
        width={320}
        height={420}
        alt='dino-1'
        style={{ rotate: '127deg' }}
        className='w-[15%] sm:w-[0%] xl:w-[5%] absolute right-12 xl:left-12 top-[60%] xl:top-10'
        data-aos='fade-left'
        data-aos-delay='400'
      />
      <Image
        src={'/ornament/fox-1.png'}
        width={320}
        height={420}
        alt='fox-1'
        style={{ rotate: '-45deg' }}
        className='w-[15%] xl:w-[5%] absolute left-8 sm:left-52 top-[60%] sm:top-[40%] xl:top-72'
        data-aos='fade-left'
        data-aos-delay='700'
      />
      <Image
        src={'/ornament/leaf-2.png'}
        width={320}
        height={420}
        alt='leaf-2'
        style={{ rotate: '90deg' }}
        className='w-[10%] xl:w-[5%] absolute left-0 top-20 xl:top-48'
        data-aos='fade-left'
        data-aos-delay='1600'
      />
    </div>
  );
};

export default HeroSection;
