'use client';

import React from 'react';

import { AOSInit } from '@/components/AOSInit';
import CheckOrderSection from '@/components/landing/CheckOrderSection';
import ContactusHeroSection from '@/components/landing/ContactusHeroSection';
import Layout from '@/components/layouts/Layout';

const ContactusPage = () => {
  const [orderInfoFound, setOrderInfoFound] = React.useState<boolean>(false);

  return (
    <Layout>
      <div className='overflow-hidden'>
        <AOSInit />
        {!orderInfoFound && <ContactusHeroSection />}
        <CheckOrderSection orderInfoFound={orderInfoFound} setOrderInfoFound={setOrderInfoFound} />
      </div>
    </Layout>
  );
};

export default ContactusPage;
