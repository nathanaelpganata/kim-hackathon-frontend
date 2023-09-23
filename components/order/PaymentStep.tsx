'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { serialize } from 'object-to-formdata';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import useOrderStore from '@/store/orderStore';

import DropzoneInput from '../forms/DropzoneInput';
import InputForm from '../forms/InputForm';
import { Modal } from '../Modal';
import { Form } from '../ui/form';

const PaymentStep = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [orderSuccess, setOrderSuccess] = React.useState<boolean>(false);

  const router = useRouter();

  const biodata = useOrderStore.useBiodata();
  // const setPayment = useOrderStore.useSetPayment();

  const paymentOrderFormSchema = z.object({
    atas_nama: z.string().refine((value) => value.trim() !== '', {
      message: 'Customer name is required',
    }),
    bank_id: z.string().min(8),
    bukti_bayar: z.array(z.any()),
  });

  const form = useForm<z.infer<typeof paymentOrderFormSchema>>({
    resolver: zodResolver(paymentOrderFormSchema),
    defaultValues: {
      atas_nama: '',
      bank_id: '',
    },
  });

  //Modal Success
  const successModal = () => {
    <Modal
      isOpen={true}
      buttonLabel={'Save Chanasfdsges'}
      dialogButtonLabel={'dasfad'}
      dialogTitle={'Are you Sure?'}
      dialogDescription={'Changes will be saved permanently'}
      dialogImage='/modal-confirmation.png'
      widthImage={244}
      heightImage={167}
      mutationFn={() => onSubmit(form.getValues())}
    />;
  };

  // Mutation
  const { mutate: postOrderData } = useMutation<void, unknown, any>(
    async (data) => {
      console.log('data', data);
      setOrderSuccess(true);
    }
  );

  const onSubmit = (_data: z.infer<typeof paymentOrderFormSchema>) => {
    const finalData = {
      customer_name: biodata.customer_name,
      phone: biodata.phone,
      picture: biodata.picture[0],

      bank_id: _data.bank_id,
      atas_nama: _data.atas_nama,
      bukti_bayar: _data.bukti_bayar[0],
    };
    const formdata = serialize(finalData, {
      indices: true,
    });
    postOrderData(formdata);
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
              name='atas_nama'
              placeholder='Enter your customer_name here'
              label='customer_name'
            />
            <InputForm
              control={form.control}
              name='bank_id'
              placeholder='Enter your phone here'
              label='phone'
            />
            <Controller
              name='bukti_bayar'
              control={form.control}
              render={({ field }) => (
                <DropzoneInput
                  id='bukti_bayar'
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
            <Modal
              buttonLabel={'Save Changes'}
              dialogButtonLabel={'Save'}
              dialogTitle={'Are you Sure?'}
              dialogDescription={'Changes will be saved permanently'}
              dialogImage='/modal-confirmation.png'
              widthImage={244}
              heightImage={167}
              mutationFn={() => onSubmit(form.getValues())}
            />
            {!!orderSuccess && (
              <Modal
                isOpen={true}
                dialogTitle={'Yeay! Pesananmu berhasil dibuat'}
                dialogButtonLabel={'Cek Pesanan'}
                dialogDescription={
                  'Nomor pemesanan dikirimkan melalui email dan WA. Gunakan nomor tersebut untuk mengecek pesananmu secara berkala ya'
                }
                dialogImage='/modal-success.png'
                widthImage={204}
                heightImage={170}
                mutationFn={() => router.push('/cek-order')}
              />
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PaymentStep;
