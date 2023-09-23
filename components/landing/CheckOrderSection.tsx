import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle, AiFillPauseCircle } from 'react-icons/ai';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { SlMagnifier } from 'react-icons/sl';
import { z } from 'zod';

import axios from '@/lib/axios';
import { cn } from '@/lib/utils';

import InputForm from '../forms/InputForm';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { toast } from '../ui/use-toast';
import Link from 'next/link';

const CheckOrderSection = ({
  data,
  setData,
}: {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
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
      title: 'Mencari...',
      description: 'Mencari pesanan anda...',
    });
    try {
      const res = await axios.get(`/order/invoice/${data.orderId}`);
      console.log(res);
      setData(res.data.data);
      toast({
        title: 'Pesanan Ditemukan!',
      });
    } catch (e) {
      toast({
        title: 'Pesanan Tidak Ditemukan!',
        description: 'Tolong cek ulang nomor pesanan anda',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='bg-[#E9F0FF]'>
      <Form {...form}>
        <form
          className={cn(
            'flex flex-col sm:items-center px-4 text-left sm:text-center',
            data != null ? 'pt-32 pb-20' : 'pt-20 pb-20'
          )}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <h1
            className='text-[#E14747] text-5xl sm:text-6xl font-bold'
            data-aos='fade-up'
            data-aos-duration='300'
            data-aos-anchor-placement='top-bottom'
          >
            Cek informasi pesananmu
          </h1>
          <h2
            className='text-[#3056A2] text-xl sm:text-2xl mt-3 sm:mt-4'
            data-aos='fade-up'
            data-aos-duration='500'
            data-aos-anchor-placement='top-bottom'
          >
            Masukkan nomor pesanan anda disini
          </h2>
          <div
            className='flex flex-col xs:flex-row items-start gap-4 w-full justify-center mt-16'
            data-aos='fade-up'
            data-aos-delay='300'
          >
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
      <div className='mx-2'>
        {data != null && (
          <div className='flex flex-col bg-white rounded-lg justify-center max-w-4xl mx-auto p-2 sm:p-4'>
            <h3 className='flex flex-row items-center text-[#2CA87F] font bold text-2xl sm:text-3xl font-medium'>
              {data.status == 'diterima' ? (
                <p className='text-[#2CA87F] flex flex-row items-center gap-1 '>
                  <BsFillCheckCircleFill className='w-8 h-8 text-[#2CA87F] mt-1' />
                  Pesanan Diterima
                </p>
              ) : data.status == 'ditolak' ? (
                <p className='text-red-600 flex flex-row items-center gap-1 '>
                  <AiFillCloseCircle className='w-8 h-8 text-red-600 mt-1' />
                  Pesanan Ditolak
                </p>
              ) : (
                <p className='text-yellow-600 flex flex-row items-center gap-1 '>
                  <AiFillPauseCircle className='w-8 h-8 text-yellow-600 mt-1' />
                  Pesanan Pending
                </p>
              )}
            </h3>
            <div className='flex flex-col border border-slate-300 text-sm font-bold mt-3'>
              <h4 className='p-2'>Informasi Pemesan</h4>
              <div className='grid grid-cols-2'>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Order ID
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.OrderCustomerDetail[0].order_id}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Email
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.OrderCustomerDetail[0].customer_email}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Nama
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.OrderCustomerDetail[0].customer_name}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  No. Telp
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.OrderCustomerDetail[0].customer_phone}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Nama Organisasi
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.OrderCustomerDetail[0].organization_name
                    ? '-'
                    : data.OrderCustomerDetail[0].organization_name}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Website Organisasi
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.OrderCustomerDetail[0].organization_website
                    ? '-'
                    : data.OrderCustomerDetail[0].organization_website}
                </div>
                <h4 className='p-2 border-t col-span-2'>
                  Detail Informasi Barang
                </h4>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Invoice ID
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.invoice}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Kategori:
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.category}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Deskripsi
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.description}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Kuantitas
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.quantity}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Ukuran (P x L x T)
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.width} cm x {data.length} cm x {data.height} cm
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Gambar Desain
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  <Link
                    href={data.design_url}
                    target='blank'
                    className='text-blue-500 underline hover:brightness-75'
                  >
                    View Here
                  </Link>
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Deadline:
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {new Date(data.deadline).toLocaleString()}
                </div>
                <div className='border-t border-slate-300 p-1 bg-slate-50'>
                  Metode Pembayaran:
                </div>
                <div className='border-t border-l border-slate-300 p-1 break-all'>
                  {data.payment_method}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
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
