'use client';

import React from 'react';

import { cn } from '@/lib/utils';

import DasboardNavbar from './DasboardNavbar';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);
  return (
    <div className='relative flex flex-col'>
      <DasboardNavbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      {/* Mobile Sidebar Start */}
      <div
        className={cn(
          'flex h-full bg-black lg:hidden transition-all ease-in-out duration-200',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-[99rem]'
        )}
      >
        <div
          className='bg-black/40 absolute w-screen min-h-screen lg:hidden'
          onClick={() => setIsSidebarOpen(false)}
        />
        <MobileSidebar />
      </div>
      {/* Desktop Sidebar Start */}
      <div className={cn('flex flex-row')}>
        <DesktopSidebar />
        <main className='lg:ml-64 mt-20'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
