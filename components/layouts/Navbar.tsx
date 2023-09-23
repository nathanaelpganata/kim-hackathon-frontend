import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { TbHandClick } from 'react-icons/tb';

import { cn } from '@/lib/utils';

import Logo from '../Logo';
// import NavbarData from "@/constant/NavbarData";

const NavbarData = [
  {
    title: 'Tentang Kami',
    href: '/',
  },
  {
    title: 'Galeri',
    href: '/gallery',
  },
  {
    title: 'Hubungi Kami',
    href: '/contactus',
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <nav className='fixed top-0 flex flex-row justify-between items-center w-full h-20 px-6 sm:px-10 z-[9999] bg-white'>
      <Link href='/' className='relative w-16 h-16'>
        <Logo />
      </Link>
      <ul
        className={cn(
          'hidden md:flex flex-row items-center md:justify-between gap-8 lg:gap-10 text-base font-bold'
        )}
      >
        {NavbarData.map(({ title, href }) => (
          <Link shallow href={href} key={title}>
            <li
              className={cn(
                pathname == href
                  ? 'text-[#3056A2] underline'
                  : 'text-[#2C2C2C] hover:underline hover:text-[#3056A2]',
                'decoration-2 decoration-[#E76767] underline-offset-8'
              )}
            >
              {title}
            </li>
          </Link>
        ))}
        <Link shallow href='/'>
          <li className='bg-[#3056A2] px-5 py-2 border-white rounded-full text-white flex items-center gap-1 hover:rotate-[4deg] transition-all duration-200 ease-in-out'>
            <TbHandClick className='w-4 h-4' /> Buat suvenirmu disini!
          </li>
        </Link>
      </ul>
      <div className='md:hidden relative z-50'>
        <button onClick={() => setNavbarOpen(!navbarOpen)}>
          <GiHamburgerMenu
            className={`w-8 h-8 text-[#2C2C2C] ${
              navbarOpen ? 'hidden' : 'block'
            }`}
          />
          <IoCloseSharp
            className={`w-8 h-8 text-[#2C2C2C] ${
              navbarOpen ? 'block' : 'hidden'
            }`}
          />
        </button>
      </div>

      <ul
        className={cn(
          'absolute inset-y-0 right-0 bg-white w-[70%] min-h-screen px-8 md:hidden flex flex-col justify-center items-center gap-6 text-white text-base xs:text-lg font-bold transition-all ease-in-out duration-200',
          navbarOpen ? 'translate-x-0' : 'translate-x-[100rem]'
        )}
      >
        {NavbarData.map(({ title, href }) => (
          <Link shallow href={href} key={title}>
            <li
              className={cn(
                pathname == href
                  ? 'text-[#3056A2] underline'
                  : 'text-[#2C2C2C] hover:underline hover:text-[#3056A2]',
                'decoration-2 decoration-[#E76767] underline-offset-8'
              )}
            >
              {title}
            </li>
          </Link>
        ))}
        <Link shallow href='/'>
          <li className='bg-[#3056A2] px-4 xs:px-5 py-2 border-white rounded-full whitespace-nowrap text-white flex items-center gap-1 hover:rotate-[4deg] transition-all duration-200 ease-in-out text-center'>
            <TbHandClick className='w-6 h-6 flex-shrink-0' /> Buat suvenirmu
          </li>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
