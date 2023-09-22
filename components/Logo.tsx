import Image from 'next/image';
import React from 'react';

const Logo = () => {
  return (
    <Image
      fill
      src='/logo.png'
      alt='Glossy Gift Logo'
      className='object-cover'
    />
  );
};

export default Logo;
