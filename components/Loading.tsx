import React from 'react';
import Logo from './Logo';

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen w-screen'>
      <div className='animate-bounce w-24 h-24 flex items-center justify-center'>
        <Logo variant='only-1' />
      </div>
      <p className='text-amber-500 font-semibold'>Loading...</p>
    </div>
  );
};

export default Loading;
