'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect } from 'react';

import DashboardLayout from '@/components/layouts/dashboard/DashboardLayout';
import { Modal } from '@/components/Modal';
import { Badge } from '@/components/ui/badge';
import axios from '@/lib/axios';

type OrderSchema =
  {
    id: string;
    no_pemesanan: string;
    customer: any;
    quantity: number;
    category: string;
  };



const Page = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading } = useQuery<any>([`order/${params.slug}`]);
  const [orderSuccess, setOrderSuccess] = React.useState<boolean>(true);



  const confirmationOrder = async (id: string) => {
    const response = await axios.put(`/order/${id}`, {
      status: 'diterima'
    })

    setOrderSuccess(true)
  }

  return (
    <DashboardLayout>
      <div className='flex flex-col items-left justify-center pt-10 px-8 mx-8'>
        <h1 className='text-5xl font-bold'>Detail Pesanan</h1>
        <div>
          {!isLoading ? (
            <div className='flex justify-between'>
              <div className='mt-12 p-8 shadow-xl mr-10'>
                <h1 className='text-3xl my-4'>
                  <b>Detail Customer</b>
                </h1>
                <h3 className='text-xl my-2'>
                  <b>Nama Pemesan</b>
                </h3>
                <p>{data.data.OrderCustomerDetail[0].customer_name}</p>

                <h3 className='text-xl my-2'>
                  <b>Nomor Telepon</b>
                </h3>
                <p>{data.data.OrderCustomerDetail[0].customer_phone}</p>

                <h3 className='text-xl my-2'>
                  <b>Instansi</b>
                </h3>
                <p>{data.data.OrderCustomerDetail[0].organization_name}</p>

                <h3 className='text-xl my-2'>
                  <b>Status Pesanan</b>
                </h3>
                <Badge
                  className={
                    data.data.status == 'pending' ||
                      data.data.status == 'ditolak'
                      ? 'bg-[#E7A427]'
                      : 'bg-[#2CA87F]'
                  }
                >
                  {data.data.status}
                </Badge>
              </div>

              <div className='mt-12 p-8 shadow-xl mx-10'>
                <h1 className='text-3xl my-4'>
                  <b>Detail Produk</b>
                </h1>
                <h3 className='text-xl my-2'>
                  <b>Invoice Pesanan</b>
                </h3>
                <p>{data.data.invoice}</p>

                <h3 className='text-xl my-2'>
                  <b>Dimensi Produk (cm)</b>
                </h3>
                <p>Panjang: {data.data.length}</p>
                <p>Lebar: {data.data.width}</p>
                <p>Tinggi: {data.data.height}</p>

                <h3 className='text-xl my-2'>
                  <b>Gambar Desain</b>
                </h3>
                <Image
                  src={data.data.design_url}
                  alt='gambar'
                  width={300}
                  height={300}
                />


                {orderSuccess || data.data.status == 'diproses' ? (
                  <Modal
                    buttonLabel={'Save Changes'}
                    dialogButtonLabel={'Save'}
                    dialogTitle={'Are you Sure?'}
                    dialogDescription={'Changes will be saved permanently'}
                    dialogImage='/modal-confirmation.png'
                    widthImage={244}
                    heightImage={167}
                    mutationFn={() => confirmationOrder(params.slug)}
                  />
                ) : data.data.status === 'diproses' ? null : (
                  <Modal
                    buttonLabel={'Save Changes'}
                    dialogButtonLabel={'Save'}
                    dialogTitle={'Are you Sure?'}
                    dialogDescription={'Changes will be saved permanently'}
                    dialogImage='/modal-confirmation.png'
                    widthImage={244}
                    heightImage={167}
                    mutationFn={() => confirmationOrder(params.slug)}
                  />
                )}
              </div>
            </div>
          ) : (
            <>Loading...</>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
