import Link from 'next/link';
import React from 'react';
import { BsInstagram, BsWhatsapp } from 'react-icons/bs';

import { NavbarData } from '@/constant/NavigationData';

import Logo from '../Logo';

const Footer = () => {
  return (
    <div className='flex flex-col relative z-50'>
      <div className='bg-[#3056A2] h-52 sm:h-28 flex flex-col py-4 sm:py-0 sm:flex-row justify-between sm:pl-10 lg:pl-28 sm:pr-48 lg:pr-80  items-center'>
        <div className='flex flex-row items-center gap-5'>
          {NavbarData.map(({ title, href }) => (
            <Link
              shallow
              href={href}
              key={title}
              className='text-white text-sm font-medium hover:brightness-75'
            >
              {title}
            </Link>
          ))}
        </div>
        <div className='w-16 h-16 mb-3 mx-auto'>
          <Logo variant='only-2' />
        </div>
        <div className='flex flex-row gap-4 text-white items-center'>
          <Link href={'https://wa.me/+62911'} className='hover:brightness-75'>
            <BsWhatsapp className='w-4 h-4' />
          </Link>
          <Link href={'https://wa.me/+62911'} className='hover:brightness-75'>
            <BsInstagram className='w-4 h-4' />
          </Link>
        </div>
      </div>
      <div className='bg-white h-14 text-[#E76767] text-sm flex justify-center items-center'>
        <p>Copyright © {new Date().getFullYear()} Glossy Gift</p>
      </div>
    </div>
  );
};

export default Footer;
