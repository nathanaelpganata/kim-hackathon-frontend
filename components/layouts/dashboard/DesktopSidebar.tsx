import React from 'react';

import Logo from '@/components/Logo';
import { cn } from '@/lib/utils';

import Navigation from './Navigation';

const DesktopSidebar = () => {
  return (
    <div
      className={cn('fixed bg-slate-400 w-64 flex-col h-full hidden lg:flex')}
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

export default DesktopSidebar;
