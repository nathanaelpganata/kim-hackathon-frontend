'use client';

import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';
import useOrderStore from '@/store/orderStore';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '../ui/form';
import InputForm from '../forms/InputForm';
import TextareaForm from '../forms/TextareaForm';
import DateForm from '../forms/DateForm';
import RadioForm from '../forms/RadioForm';
import DropzoneInput from '../forms/DropzoneInput';
import { serialize } from 'object-to-formdata';
import axios from '@/lib/axios';
import { Modal } from '../Modal';
import { useRouter } from 'next/navigation';
import { LuCopy } from 'react-icons/lu';
import { toast } from '../ui/use-toast';
import { Button } from '../ui/button';

const paymentMethodOptions = [
  { label: 'DP', value: 'dp' },
  { label: 'Angsuran', value: 'angsuran' },
];

const ItemStep = () => {
  const [orderSuccess, setOrderSuccess] = React.useState<boolean>(false);
  const [results, setResults] = React.useState<any>(null);
  const router = useRouter();

  // Store
  const category = useOrderStore.useCategory();
  const user = useOrderStore.useUser();

  // Form
  const itemOrderFormSchema = z.object({
    description: z
      .string()
      .max(10000, {
        message: 'Maximal 10000 characters',
      })
      .refine((value) => value.trim() !== '', {
        message: 'Description is required',
      }),
    quantity: z.string().max(255, {
      message: 'Maximal 255 characters',
    }),
    width: z.string().max(255, {
      message: 'Maximal 255 characters',
    }),
    height: z.string().max(255, {
      message: 'Maximal 255 characters',
    }),
    length: z.string().max(255, {
      message: 'Maximal 255 characters',
    }),
    deadline: z.date(),
    payment_method: z.enum(['dp', 'angsuran']),
    design_img: z.array(z.any()),
  });

  const form = useForm<z.infer<typeof itemOrderFormSchema>>({
    resolver: zodResolver(itemOrderFormSchema),
    defaultValues: {
      description: '',
      quantity: undefined,
      width: undefined,
      height: undefined,
      length: undefined,
      deadline: new Date(),
      payment_method: 'dp',
    },
  });

  const warningSubmit = () => {
    return (
      <Modal
        isOpen={true}
        buttonLabel={'Kirim'}
        dialogButtonLabel={'Kirim'}
        dialogTitle={'Apakah anda yakin?'}
        dialogDescription={
          'Pastikan data yang anda masukkan sudah benar sebelum mengirimkan pesanan.'
        }
        dialogImage='/modal-confirmation.png'
        widthImage={244}
        heightImage={167}
        mutationFn={() => onSubmit(form.getValues())}
      />
    );
  };

  const onSubmit = async (_data: z.infer<typeof itemOrderFormSchema>) => {
    const finalData = {
      ..._data,
      category: category.category,
      customer_name: user.customer_name,
      customer_email: user.customer_email,
      customer_phone: user.customer_phone,
      organization_name: user.organization_name,
      organization_website: user.organization_website,
      design_img: _data.design_img[0],
    };
    const formData = serialize(finalData, {
      indices: true,
    });
    toast({
      title: 'Sedang memproses pesanan',
      description: 'Mohon tunggu sebentar.',
    });
    try {
      const res = await axios.post('/order', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setResults(res);
      setOrderSuccess(true);
    } catch (error) {
      toast({
        title: 'Pemesanan Gagal',
        description: 'Mohon ulangi kembali.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className='flex flex-col lg:flex-row min-h-screen lg:gap-0 gap-4 mt-28 lg:mt-0'>
      <div className='lg:w-1/3 xl:w-1/2 flex items-center justify-center px-4'>
        <Image
          src={'/order/teddy-item-step.png'}
          width={525}
          height={535}
          alt='teddy pilih kategori'
          className='z-50'
        />
      </div>
      <div className='lg:relative lg:w-2/3 xl:w-1/2 flex flex-col items-center justify-center z-0 lg:pb-0 pb-14 px-4 lg:pt-24'>
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
            className='flex flex-col bg-white p-4 rounded-[10px] max-w-3xl w-full gap-4 mb-10'
          >
            <h1 className='text-[#E14747] font-medium text-2xl'>
              Detail Informasi Barang
            </h1>
            <p className='font-medium'>
              Tipe suvenir:{' '}
              <span className='font-bold text-[#3056A2]'>
                {category.category}
              </span>
            </p>
            <InputForm
              control={form.control}
              name='quantity'
              placeholder='0'
              label={
                <span>
                  <span className='text-red-500'>*</span>Kuantitas Barang
                </span>
              }
              type='number'
            />
            <div className='flex flex-row gap-4 items-center w-full'>
              <div className='relative w-full'>
                <InputForm
                  control={form.control}
                  name='width'
                  placeholder='0'
                  label={
                    <span>
                      <span className='text-red-500'>*</span>Lebar
                    </span>
                  }
                  type='number'
                />
                <p className='absolute bottom-[21%] right-2  text-slate-500'>
                  cm
                </p>
              </div>
              <div className='relative w-full'>
                <InputForm
                  control={form.control}
                  name='length'
                  placeholder='0'
                  label={
                    <span>
                      <span className='text-red-500'>*</span>Panjang
                    </span>
                  }
                  type='number'
                />
                <p className='absolute bottom-[21%] right-2  text-slate-500'>
                  cm
                </p>
              </div>
              <div className='relative w-full'>
                <InputForm
                  control={form.control}
                  name='height'
                  placeholder='0'
                  label={
                    <span>
                      <span className='text-red-500'>*</span>Tinggi
                    </span>
                  }
                  type='number'
                />
                <p className='absolute bottom-[21%] right-2  text-slate-500'>
                  cm
                </p>
              </div>
            </div>
            <TextareaForm
              control={form.control}
              name='description'
              placeholder='Anda bisa menjelaskan spesifikasi barang anda seperti bentuk, warna, bahan, motif dan permintaan lainnya disini.'
              label={
                <span>
                  <span className='text-red-500'>*</span>Deskripsi Detail Barang
                </span>
              }
            />
            <DateForm
              control={form.control}
              name='deadline'
              placeholder='Deadline'
              label={
                <span>
                  <span className='text-red-500'>*</span>Tanggal Deadline
                </span>
              }
              disabledDateBefore={`${new Date()}`}
            />
            <RadioForm
              control={form.control}
              label={
                <span>
                  <span className='text-red-500'>*</span>Metode Pembayaran
                </span>
              }
              name='payment_method'
              radioItems={paymentMethodOptions}
            />
            <div className='my-1' />
            <Controller
              name='design_img'
              control={form.control}
              render={({ field }) => (
                <DropzoneInput
                  id='design_img'
                  maxSize={5000000}
                  maxFiles={1}
                  label={
                    <span>
                      <span className='text-red-500'>*</span>Contoh Design Yang
                      Diinginkan
                    </span>
                  }
                  accept={{
                    'image/*': ['.jpg', '.jpeg', '.png'],
                  }}
                  acceptTypes='JPG / JPEG / PNG'
                  validation={{
                    required: 'Gambar Design tidak boleh kosong',
                  }}
                  {...field}
                />
              )}
            />
            <Button
              type='submit'
              className='mt-8 bg-[#E76767] rounded-2xl hover:bg-[#ae4f4f] text-lg h-10 flex ml-auto'
            >
              Kirim
            </Button>{' '}
            {/* <Modal
              buttonLabel={'Kirim'}
              dialogButtonLabel={'Kirim'}
              dialogTitle={'Apakah anda yakin?'}
              dialogDescription={
                'Pastikan data yang anda masukkan sudah benar sebelum mengirimkan pesanan.'
              }
              dialogImage='/modal-confirmation.png'
              widthImage={244}
              heightImage={167}
              mutationFn={() => onSubmit(form.getValues())}
            /> */}
            {!!orderSuccess && (
              <Modal
                isOpen={true}
                dialogTitle={'Yeay! Pesananmu berhasil dibuat'}
                dialogButtonLabel={'Cek Pesanan'}
                dialogDescription={
                  'Berikut merupakan nomor invoice yang dapat digunakan untuk mengecek pesananmu secara berkala ya. Nomor tersebut juga akan dikirimkan melalui email dan WA.'
                }
                dialogImage='/modal-success.png'
                widthImage={204}
                heightImage={170}
                mutationFn={() => router.push('/contactus')}
              >
                <p
                  className='relative mb-4 text-center font-bold flex flex-row group items-center gap-1 justify-center cursor-pointer hover:text-slate-500'
                  onClick={() =>
                    navigator.clipboard.writeText(results.data.data.invoice)
                  }
                >
                  {results.data.data.invoice}{' '}
                  <span>
                    <LuCopy />
                  </span>
                  <span className='group-active:block hidden absolute -bottom-5 group-focus:block font-light'>
                    Copied!
                  </span>
                </p>
              </Modal>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ItemStep;
