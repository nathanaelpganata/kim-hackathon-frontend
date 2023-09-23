import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SlMagnifier } from 'react-icons/sl';
import { z } from 'zod';

import axios from '@/lib/axios';

import InputForm from '../forms/InputForm';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { toast } from '../ui/use-toast';

const CheckOrderSection = ({
  orderInfoFound,
  setOrderInfoFound,
}: {
  orderInfoFound: boolean;
  setOrderInfoFound: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Form initialization
  const loginFormSchema = z.object({
    orderId: z.string().min(5, {
      message: 'Order ID must be at least 5 characters.',
    }),
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      orderId: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    toast({
      title: 'Searching',
      description: 'Searching for your order',
    })
    try {
      const res = await axios.get(`/order/invoice/${data.orderId}`);
      console.log(res);
      setOrderInfoFound(true)
      toast({
        title: 'Order Found',
      })
    } catch (e) {
      toast({
        title: 'Order Not Found',
        description: 'Please check your order ID',
        variant: 'destructive'
      })
    }
  };

  return (
    <div className='bg-[#E9F0FF]'>
      <Form {...form}>
        <form
          className='flex flex-col sm:items-center px-4 text-left sm:text-center py-20'
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1
            className='text-[#E14747] text-5xl sm:text-6xl font-bold'
            data-aos='fade-up'
            data-aos-duration='300'
          >
            Cek informasi pesananmu
          </h1>
          <h2
            className='text-[#3056A2] text-xl sm:text-2xl mt-3 sm:mt-4'
            data-aos='fade-up'
            data-aos-duration='500'
          >
            Masukkan nomor pesanan anda disini
          </h2>
          <div className='flex flex-col xs:flex-row items-start gap-4 w-full justify-center mt-16'>
            <InputForm
              control={form.control}
              name='orderId'
              className='w-[18rem] xs:w-[20rem] sm:w-[25rem] md:w-[38rem] bg-white rounded-2xl px-3 h-12 shadow-md'
              placeholder='Enter your Order ID here'
              helperText='Contoh: INV-337314232'
            />
            <Button
              className='bg-[#3056A2] flex flex-row gap-1 items-center hover:scale-95 rounded-lg h-10 xs:mt-3'
              type='submit'
            >
              <SlMagnifier className='w-3 h-3 mt-0.5' />
              Search
            </Button>
          </div>
        </form>
      </Form>
      {/* Results of search */}
      {!!orderInfoFound ? (<>Yes</>) : (<>No</>)}

      {/* Results of search */}
      <Image
        src={'/hero-lite.png'}
        width={1177}
        height={458}
        alt='hero image'
        className='mt-auto mx-auto'
        data-aos='fade-up'
        data-aos-delay='400'
      />
    </div>
  );
};

export default CheckOrderSection;
