import { AiFillHome } from 'react-icons/ai';

import { NavigationInterface } from '@/types/navigation';

const AdminDashboardNavData: NavigationInterface[] = [
  {
    name: 'Home',
    icon: AiFillHome,
    href: '/admin',
    exactMatch: true,
  },
  {
    name: 'Orders',
    icon: AiFillHome,
    href: '/admin/orders',
    children: [
      {
        name: 'Data',
        icon: AiFillHome,
        href: '/admin/orders/data',
        exactMatch: false,
      },
    ],
  },
];

const NavData: NavigationInterface[] = [
  {
    name: 'Catalog',
    icon: AiFillHome,
    href: '#',
  },
  {
    name: 'About Us',
    icon: AiFillHome,
    href: '#',
  },
  {
    name: 'Order Now',
    icon: AiFillHome,
    href: '#',
  },
];

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

export { AdminDashboardNavData, NavbarData, NavData };
