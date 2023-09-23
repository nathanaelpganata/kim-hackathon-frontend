import Image from 'next/image';
import React from 'react';

type GalleryCardType = {
  name: string;
  imageLink: string;
  description: string;
  descTitle?: string
  withName?: boolean;
};

const GalleryCard = ({
  name,
  imageLink,
  description,
  descTitle,
  withName = false,
}: GalleryCardType) => {
  return (
    <div
      key={name}
      className='relative flex flex-col items-center group transition ease-in-out duration-150'
      data-aos='flip-left'
      data-aos-easing='ease-out-cubic'
      data-aos-duration='2000'
    >
      <Image src={imageLink} width={380} height={380} alt={name} className='hover:scale-105 transition ease-in-out duration-150' />
      {withName && (
        <h3 className='text[#1E1E1E] font-semibold text-xl mt-4'>{name}</h3>
      )}
      {/* When Hovered */}
      <div className='absolute -top-8 right-0 opacity-0 border text-xs sm:text-sm group-hover:opacity-100 shadow-md bg-white rounded-md p-3 transition ease-in-out duration-200 w-[80%] line-clamp-4 overflow-hidden'>
        <h4 className='text-lg font-semibold'>{descTitle}</h4>
        <p className='mt-1'>{description}</p>
      </div>
    </div>
  );
};

export default GalleryCard;
