'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Image from 'next/image';
import { setCategoryType } from '@/types/entities/order';
import ItemCategory from './ItemCategoryForm';
import { CategoryItemData } from '@/constant/OrderData';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import useOrderStore from '@/store/orderStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '../ui/form';
import InputForm from '../forms/InputForm';

const UserStep = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // Store
  const setUser = useOrderStore.useSetUser();

  // Form
  const userOrderFormSchema = z.object({
    customer_name: z
      .string()
      .max(255, {
        message: 'Maximal 255 characters',
      })
      .refine((value) => value.trim() !== '', {
        message: 'Customer name is required',
      }),
    customer_email: z
      .string()
      .email()
      .max(255, {
        message: 'Maximal 255 characters',
      })
      .refine((value) => value.trim() !== '', {
        message: 'Customer email is required',
      }),
    customer_phone: z
      .string()
      .min(8, {
        message: 'Customer phone is required',
      })
      .max(255, {
        message: 'Maximal 255 characters',
      })
      .refine((value) => value.trim() !== '', {
        message: 'Customer phone is required',
      }),

    organization_name: z
      .string()
      .max(255, {
        message: 'Maximal 255 characters',
      })
      .optional(),
    organization_website: z
      .string()
      .max(255, {
        message: 'Maximal 255 characters',
      })
      .optional(),
  });

  const form = useForm<z.infer<typeof userOrderFormSchema>>({
    resolver: zodResolver(userOrderFormSchema),
    defaultValues: {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
    },
  });

  const onSubmit = (data: z.infer<typeof userOrderFormSchema>) => {
    console.log(data);
    setUser(data);
    setStep(3);
  };

  return (
    <div className='flex flex-col lg:flex-row min-h-screen lg:gap-0 gap-4 mt-28 lg:mt-0'>
      <div className='lg:w-1/3 xl:w-1/2 flex items-center justify-center px-4'>
        <Image
          src={'/order/teddy-user-step.png'}
          width={525}
          height={535}
          alt='teddy pilih kategori'
          className='z-50'
        />
      </div>
      <div className='lg:relative lg:w-2/3 xl:w-1/2 flex flex-col items-center justify-center z-0 lg:pb-0 pb-14 px-4'>
        <Image
          src={'/order/background-blue.png'}
          width={818}
          height={1188}
          alt='background-blue'
          className='absolute lg:inset-0 h-full lg:h-full w-full -z-10'
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col bg-white p-4 rounded-[10px] max-w-3xl w-full gap-4'
          >
            <h1 className='text-[#E14747] font-medium text-2xl'>
              Informasi Pemesanan
            </h1>
            <InputForm
              control={form.control}
              name='customer_name'
              placeholder='Masukan nama anda'
              label={
                <span>
                  <span className='text-red-500'>*</span>Nama
                </span>
              }
            />
            <InputForm
              control={form.control}
              name='customer_email'
              placeholder='Masukan email anda'
              label={
                <span>
                  <span className='text-red-500'>*</span>Email
                </span>
              }
            />
            <InputForm
              control={form.control}
              name='customer_phone'
              placeholder='Masukan nomor telefon anda'
              helperText='Contoh: 085829302819'
              label={
                <span>
                  <span className='text-red-500'>*</span>No. Telp
                </span>
              }
            />
            <InputForm
              control={form.control}
              name='organization_name'
              placeholder='Masukan nama organisasi anda'
              label='Nama Organisasi'
            />
            <InputForm
              control={form.control}
              name='organization_website'
              placeholder='Masukan website organisasi anda'
              label='Website Organisasi'
            />

            <Button
              type='submit'
              className='mt-8 bg-[#E76767] rounded-2xl hover:bg-[#ae4f4f] text-lg h-10 flex ml-auto'
            >
              Lanjutkan
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UserStep;
