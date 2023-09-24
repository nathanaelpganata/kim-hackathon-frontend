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
          'flex  h-full xl:hidden transition-all ease-in-out duration-200 z-10 w-full',
          isSidebarOpen ? 'translate-x-0 fixed' : '-translate-x-[99rem]'
        )}
      >
        <div
          className='bg-black/40 w-screen min-h-screen xl:hidden fixed inset-0'
          onClick={() => setIsSidebarOpen(false)}
        />
        <MobileSidebar />
      </div>
      {/* Desktop Sidebar Start */}
      <div className={cn('flex flex-row')}>
        <DesktopSidebar />
        <main className='xl:ml-64 mt-20 bg-slate-100 w-full min-h-screen '>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
