'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import useOrderStore from '@/store/orderStore';

import DropzoneInput from '../forms/DropzoneInput';
import InputForm from '../forms/InputForm';
import { Button } from '../ui/button';
import { Form } from '../ui/form';

const BiodataStep = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  // const biodata = useOrderStore.useBiodata();
  const setBiodata = useOrderStore.useSetBiodata();

  const biodataOrderFormSchema = z.object({
    customer_name: z.string().refine((value) => value.trim() !== '', {
      message: 'Customer name is required',
    }),
    phone: z.string().min(8),
    picture: z.array(z.any()),
  });

  const form = useForm<z.infer<typeof biodataOrderFormSchema>>({
    resolver: zodResolver(biodataOrderFormSchema),
    defaultValues: {
      customer_name: '',
      phone: '',
    },
  });

  const onSubmit = (data: z.infer<typeof biodataOrderFormSchema>) => {
    setBiodata(data);
    console.log(data);
    setStep(2);
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col max-w-sm w-full border-2 border-black rounded-2xl p-6 gap-y-3'
          >
            <InputForm
              control={form.control}
              name='customer_name'
              placeholder='Enter your customer_name here'
              label='customer_name'
            />
            <InputForm
              control={form.control}
              name='phone'
              placeholder='Enter your phone here'
              label='phone'
            />
            <Controller
              name='picture'
              control={form.control}
              render={({ field }) => (
                <DropzoneInput
                  id='picture'
                  label='Upload Dokumen Scan KTM/FRS'
                  accept={{
                    'image/*': ['.jpg', '.jpeg', '.png'],
                  }}
                  acceptTypes='JPG / JPEG / PNG'
                  validation={{
                    required: 'NRP Ketua tidak boleh kosong',
                  }}
                  {...field}
                />
              )}
            />
            <Button type='submit'>Next</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BiodataStep;
