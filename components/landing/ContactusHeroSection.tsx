import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsWhatsapp } from 'react-icons/bs';

const ContactusHeroSection = () => {
  return (
    <div className='flex flex-col items-center mt-28 px-4'>
      <div className='relative'>
        <Image
          src={'/contactus-hero.png'}
          alt='contactus-hero'
          width={1016}
          height={590}
        />
        <Link
          href={'https://wa.me/+62'}
          className=' absolute -top-1 xs:top-0 left-0 flex flex-row items-center gap-1 md:gap-2 text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-2xl font-medium text-white px-1.5 py-0.5 xs:px-2 xs:py-1 md:py-1.5 lg:px-5 md:px-3 lg:py-2 bg-green-500 rounded-2xl hover:brightness-75'
        >
          <BsWhatsapp className=' text-white w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 md:mt-1' />
          Whatsapp
        </Link>
      </div>
    </div>
  );
};

export default ContactusHeroSection;
