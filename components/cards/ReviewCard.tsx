import Image from 'next/image';
import React from 'react';

import { ReviewDataType } from '@/types/entities/review';

const ReviewCard = ({
  name,
  rating,
  imageLink,
  organization,
  description,
}: ReviewDataType) => {
  return (
    <div className='flex flex-col bg-white shadow-lg rounded-lg p-4 gap-3'>
      <div className='flex flex-row items-center gap-2'>
        <div className='w-10 h-10 relative'>
          <Image
            src={imageLink}
            fill
            className='object-cover rounded-full'
            alt={name}
          />
        </div>
        <div className='flex flex-col items-start'>
          <h4 className=' text-xl font-semibold'>{name}</h4>
          <p className='font-light'>{organization}</p>
        </div>
      </div>
      {
        <div className='flex flex-row items-center'>
          {Array.from({ length: rating }, (_, i) => (
            <svg
              key={i}
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4 text-yellow-400'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 1l2.928 6.472 6.472.928-4.71 4.595 1.11 6.463L10 15.198l-5.8 3.26 1.11-6.463L.6 8.4l6.472-.928L10 1z'
                clipRule='evenodd'
              />
            </svg>
          ))}
        </div>
      }
      <p className='text-lg font line-clamp-4 text-justify'>{description}</p>
    </div>
  );
};

export default ReviewCard;
