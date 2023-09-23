'use client';

import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

import { cn } from '@/lib/utils';

import UserAction from './UserAction';

const DasboardNavbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className='fixed flex items-center px-8 justify-between xl:justify-end top-0 bg-[#3056A2] h-20 w-full xl:w-[calc(100%-16rem)] xl:left-64 z-10'>
      <GiHamburgerMenu
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
        className={cn(
          'block xl:hidden w-10 h-10',
          isSidebarOpen ? 'opacity-0' : 'opacity-100'
        )}
      />
      <UserAction />
      {/* <div>{name}</div> */}
    </div>
  );
};

export default DasboardNavbar;
