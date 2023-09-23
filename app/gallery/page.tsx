'use client';

import React from 'react';

import { AOSInit } from '@/components/AOSInit';
import GallerySection from '@/components/landing/GallerySection';
import Layout from '@/components/layouts/Layout';

const GalleryPage = () => {
  return (
    <Layout>
      <div className='overflow-hidden'>
        <AOSInit />
        <GallerySection />
      </div>
    </Layout>
  );
};

export default GalleryPage;
