'use client';

import React from 'react';

import { AOSInit } from '@/components/AOSInit';
import HeroSection from '@/components/landing/HeroSection';
import ProductSection from '@/components/landing/Product';
import Layout from '@/components/layouts/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div className='overflow-hidden'>
        <AOSInit />
        <HeroSection />
        <ProductSection />
      </div>
    </Layout>
  );
};

export default HomePage;
