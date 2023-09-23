'use client';

import React from 'react';
import { Form, FormProvider, useForm } from 'react-hook-form';

import Image from 'next/image';
import { setCategoryType } from '@/types/entities/order';
import ItemCategory from './ItemCategoryForm';
import { CategoryItemData } from '@/constant/OrderData';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import useOrderStore from '@/store/orderStore';

const CategoryStep = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // Store
  const setCategory = useOrderStore.useSetCategory()

  // Mounted
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  // Form
  const methods = useForm<setCategoryType>();
  const { handleSubmit } = methods;
  const onSubmit = (data: setCategoryType) => {
    console.log(data);
    setCategory(data)
    setStep(2);
  };

  return (
    <div className='flex flex-col lg:flex-row min-h-screen lg:gap-0 gap-4 mt-28 lg:mt-0'>
      <div className='lg:w-1/3 xl:w-1/2 flex items-center justify-center px-4'>
        <Image
          src={'/order/teddy-category-step.png'}
          width={525}
          height={535}
          alt='teddy pilih kategori'
          className='z-50'
        />
      </div>
      <div className='lg:relative lg:w-2/3 xl:w-1/2 flex flex-col items-center justify-center z-0 lg:pb-0 pb-14'>
        <Image
          src={'/order/background-blue.png'}
          width={818}
          height={1188}
          alt='background-blue'
          className='absolute lg:inset-0 h-full sm:h-2/3 lg:h-full w-full -z-10'
        />
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full items-center justify-center mx-auto'>
              {!!mounted ? (
                <ItemCategory
                  id='category'
                  label=''
                  options={CategoryItemData.map((d) => ({
                    label: d.name,
                    value: d.value,
                    image: d.image,
                  }))}
                  validation={{
                    required: 'Tolong pilih salah satu kategori',
                  }}
                />
              ) : (
                <div className='flex flex-col gap-8'>
                  <Skeleton className='h-36 w-[17rem] sm:w-[20rem] lg:w-[35rem]' />
                  <Skeleton className='h-36 w-[17rem] sm:w-[20rem] lg:w-[35rem]' />
                  <Skeleton className='h-36 w-[17rem] sm:w-[20rem] lg:w-[35rem]' />
                </div>
              )}
            </div>
            <Button
              type='submit'
              className='mt-8 bg-[#E76767] rounded-2xl hover:bg-[#ae4f4f] text-lg h-10 flex ml-auto'
            >
              Lanjutkan
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default CategoryStep;
