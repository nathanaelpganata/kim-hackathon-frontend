import Image from 'next/image';
import React from 'react';

const Logo = ({ variant }: { variant: string }) => {
  return (
    <div>
      {variant === 'full' ? (
        <Image
          src='/logo/logo-full.png'
          alt='Glossy Gift Logo'
          width={180}
          height={70}
        />
      ) : variant === 'only-1' ? (
        <Image
          src='/logo/logo-only-1.png'
          alt='Glossy Gift Logo'
          width={69}
          height={70}
        />
      ) : variant === 'only-2' ? (
        <Image
          src='/logo/logo-only-2.png'
          alt='Glossy Gift Logo'
          width={80}
          height={102}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Logo;
