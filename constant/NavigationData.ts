import { AiFillHome } from 'react-icons/ai';
import { BiSolidShoppingBags } from 'react-icons/bi';

import { NavigationInterface } from '@/types/navigation';

const AdminDashboardNavData: NavigationInterface[] = [
  {
    name: 'Beranda',
    icon: AiFillHome,
    href: '/admin',
    exactMatch: true,
  },
  {
    name: 'Pesanan',
    icon: BiSolidShoppingBags,
    href: '/admin/orders',
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

export { AdminDashboardNavData, NavbarData };
