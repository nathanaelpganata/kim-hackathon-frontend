import Image from 'next/image';
import React from 'react';

type ValueDataType = {
  name: string;
  description: string;
  imageLink: string;
};

const ValueCard = ({ name, description, imageLink }: ValueDataType) => {
  return (
    <div
      data-aos='flip-right'
      data-aos-easing='ease-out-cubic'
      data-aos-duration='2000'
      className='flex flex-col bg-white rounded-[20px] items-center justify-center mx-auto text-center gap-4 max-w-[370px] w-full p-8'
    >
      <Image src={imageLink} alt={name} width={267} height={200} />
      <h2 className='font-bold text-xl sm:text-2xl text-[#E76767] mt-auto'>
        {name}
      </h2>
      <p className='text-lg sm:text-xl text-[#3056A2]'>{description}</p>
    </div>
  );
};

export default ValueCard;
