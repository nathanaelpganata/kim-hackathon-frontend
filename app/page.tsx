'use client';

import React from 'react';

import { AOSInit } from '@/components/AOSInit';
import HeroSection from '@/components/landing/HeroSection';
import ProductSection from '@/components/landing/ProductSection';
import ReviewSection from '@/components/landing/ReviewSection';
import Layout from '@/components/layouts/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div className='overflow-hidden'>
        <AOSInit />
        <HeroSection />
        <div className='mt-20'>
          <ProductSection />
        </div>
        {/* <div className='mt-20'>
          <ValueSection />
        </div> */}
        <div className='my-20'>
          <ReviewSection />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
