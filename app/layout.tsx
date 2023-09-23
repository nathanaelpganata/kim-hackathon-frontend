import './globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

// Meta Data
export const metadata: Metadata = {
  metadataBase: new URL('https://glossy-gift.vercel.app/'),
  title: {
    default: 'Glossy Gift',
    template: '%s | Glossy Gift',
  },
  description:
    'Discover the Ultimate Next13 Template: Unleash the Power of TypeScript, TailwindCSS, schadcnui, tanstack, husky, and Beyond! Dive into a Dynamic Sandbox Loaded with Stylish Forms, Engaging Buttons, Delicious Toasts, and Sleek Tables. Craft Your Dream Project with Infinite Customization Possibilities!',
  verification: {
    google: '',
  },
  robots: {
    index: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={cn('font-zenMaruGothic')}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
