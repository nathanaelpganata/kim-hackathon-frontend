'use client';

import React from 'react';

import { AOSInit } from '@/components/AOSInit';
import CheckOrderSection from '@/components/landing/CheckOrderSection';
import ContactusHeroSection from '@/components/landing/ContactusHeroSection';
import Layout from '@/components/layouts/Layout';

const ContactusPage = () => {
  const [data, setData] = React.useState<any>(null);

  return (
    <Layout>
      <div className='overflow-hidden'>
        <AOSInit />
        {!data && <ContactusHeroSection />}
        <CheckOrderSection
          data={data}
          setData={setData}
        />
      </div>
    </Layout>
  );
};

export default ContactusPage;
