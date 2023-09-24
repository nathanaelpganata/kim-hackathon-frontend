import './globals.css';

import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

// Meta Data
export const metadata: Metadata = {
  metadataBase: new URL('https://www.glossy-gift.shop/'),
  title: {
    default: 'Glossy Gift',
    template: '%s | Glossy Gift',
  },
  description:
    'Produsen berbagai macam boneka lucu dan berkualiatas. Mulai dari boneka berukuran mini yang sangat menggemaskan hingga boneka berukuran besar yang bisa menjadi hadiah istimewa. Dipercayai berbagai bisnis besar di Indonesia.',
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
