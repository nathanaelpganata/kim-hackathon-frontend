'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlineEnter } from 'react-icons/ai';

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import { Modal } from '@/components/Modal';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type OrderSchema = {
  id: string;
  no_pemesanan: string;
  customer: any;
  quantity: number;
  category: string;
};

const Page = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery<any>([`order/${params.slug}`]);

  const confirmationOrder = async (id: string, status: string) => {
    try {
      toast({
        title: 'Loading...',
      });
      const response = await axios.put(`/order/${id}`, {
        status,
      });
      toast({
        title: 'Pengubahan status berhasil',
      });
      router.push('/admin/orders');
    } catch (error) {
      router.push('/admin/orders');
      toast({
        title: 'Pengubahan status gagal',
        description: 'Mohon coba lagi',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout>
      {!isLoading ? (
        <div className='flex flex-col items-left justify-center pt-10 sm:px-8 sm:mx-8 mx-2 px-2'>
          <div className='flex flex-row justify-between items-center'>
            <h1 className='text-5xl font-bold'>Detail Pesanan</h1>
            {data.data.status === 'pending' ? (
              <div className='flex flex-row items-center gap-3'>
                <Modal
                  buttonLabel={'Terima Pesanan'}
                  buttonVariant={'outline'}
                  dialogButtonLabel={'Terima'}
                  dialogTitle={'Apakah anda yakin?'}
                  dialogDescription={
                    'Apakah anda yakin untuk menerima pesanan ini?'
                  }
                  dialogImage='/modal-confirmation.png'
                  widthImage={244}
                  heightImage={167}
                  mutationFn={() => confirmationOrder(params.slug, 'diterima')}
                />
                <Modal
                  buttonLabel={'Tolak Pesanan'}
                  buttonVariant={'destructive'}
                  dialogButtonLabel={'Tolak'}
                  dialogTitle={'Apakah anda yakin?'}
                  dialogDescription={
                    'Apakah anda yakin untuk menolak pesanan ini?'
                  }
                  dialogImage='/modal-confirmation.png'
                  widthImage={244}
                  heightImage={167}
                  mutationFn={() => confirmationOrder(params.slug, 'ditolak')}
                />
              </div>
            ) : data.data.status === 'ditolak' ? (
              <Modal
                buttonLabel={'Terima Pesanan'}
                buttonVariant={'outline'}
                dialogButtonLabel={'Terima'}
                dialogTitle={'Apakah anda yakin?'}
                dialogDescription={
                  'Apakah anda yakin untuk menerima pesanan ini?'
                }
                dialogImage='/modal-confirmation.png'
                widthImage={244}
                heightImage={167}
                mutationFn={() => confirmationOrder(params.slug, 'diterima')}
              />
            ) : (
              <Modal
                buttonLabel={'Tolak Pesanan'}
                buttonVariant={'destructive'}
                dialogButtonLabel={'Tolak'}
                dialogTitle={'Apakah anda yakin?'}
                dialogDescription={
                  'Apakah anda yakin untuk menolak pesanan ini?'
                }
                dialogImage='/modal-confirmation.png'
                widthImage={244}
                heightImage={167}
                mutationFn={() => confirmationOrder(params.slug, 'ditolak')}
              />
            )}
          </div>
          <div>
            <div className='flex flex-col'>
              <Badge className='my-2 w-max text-xs bg-[#E9F0FF] text-black hover:bg-white'>
                {data.data.id}
              </Badge>
              <div className='flex flex-row gap-2 items-center font-medium text-sm'>
                <AiOutlineEnter className='transform -scale-x-100 w-6 h-6' />
                <p className='mt-1.5 font-semibold'>Status: </p>
                <Badge
                  className={cn(
                    'w-max px-2 py-1 mt-1.5 hover:bg-black',
                    data.data.status == 'pending'
                      ? 'bg-[#E7A427]'
                      : data.data.status == 'ditolak'
                      ? 'bg-[#E14747]'
                      : 'bg-[#2CA87F]'
                  )}
                >
                  {data.data.status}
                </Badge>
              </div>
              <div className='mt-8 sm:mt-12 p-4 sm:p-8 shadow-xl sm:mr-10'>
                <h1 className='text-3xl my-4 font-bold text-[#E14747]'>
                  Customer
                </h1>
                <hr />
                <div className='flex flex-col gap-3 mt-2'>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Nama Pemesan</h3>
                    <p>{data.data.OrderCustomerDetail[0].customer_name}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Email</h3>
                    <p>{data.data.OrderCustomerDetail[0].customer_email}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>No. Telpon</h3>
                    <p>{data.data.OrderCustomerDetail[0].customer_phone}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Nama Organisasi</h3>
                    <p>
                      {!data.data.OrderCustomerDetail[0].organization_name
                        ? '-'
                        : data.data.OrderCustomerDetail[0].organization_name}
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Website Organisasi</h3>
                    <p>
                      {!data.data.OrderCustomerDetail[0].organization_website
                        ? '-'
                        : data.data.OrderCustomerDetail[0].organization_website}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-8 sm:mt-12 p-4 sm:p-8 shadow-xl sm:mx-10 mb-10'>
                <h1 className='text-3xl my-4 text-[#3056A2] font-bold'>
                  Produk
                </h1>
                <hr />
                <div className='flex flex-col gap-3 mt-2'>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>No. Invoice</h3>
                    <p>{data.data.invoice}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Kategori</h3>
                    <p>{data.data.category}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Kuantitas</h3>
                    <p>{data.data.quantity}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Ukuran (P x L x T)</h3>
                    <p>
                      {data.data.width} cm x {data.data.length} cm x{' '}
                      {data.data.height} cm
                    </p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Metode Pembayaran</h3>
                    <p>{data.data.payment_method}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Deadline</h3>
                    <p>{new Date(data.data.deadline).toLocaleString()}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Deskripsi</h3>
                    <p>{data.data.description}</p>
                  </div>
                  <div className='flex flex-col'>
                    <h3 className='text-lg font-bold'>Gambar Desain</h3>
                    <Image
                      src={data.data.design_url}
                      alt='gambar'
                      width={300}
                      height={300}
                    />
                    <Link
                    href={data.data.design_url}
                    target='blank'
                    className='text-blue-500 underline hover:brightness-75 font-medium'
                  >
                    View Here
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='m-4 font-medium'>Loading...</div>
      )}
    </DashboardLayout>
  );
};

export default Page;
