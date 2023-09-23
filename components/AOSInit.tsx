'use client';

import 'aos/dist/aos.css';

import AOS from 'aos';
import { useEffect } from 'react';

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  return null;
};
