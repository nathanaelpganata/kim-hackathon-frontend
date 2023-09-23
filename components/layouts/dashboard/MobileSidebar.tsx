import React from 'react';

import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';

import Navigation from './Navigation';

const MobileSidebar = () => {
  return (
    <div
      className={cn(
        'fixed bg-[#E14747] w-[70%] sm:w-[40%] flex flex-col min-h-screen z-[999]'
      )}
    >
      <div className='relative w-24 h-24 mx-auto my-8'>
        <Logo variant='full' />
      </div>
      <div className='flex flex-col gap-0.5'>
        <Navigation />
      </div>
    </div>
  );
};

export default MobileSidebar;
