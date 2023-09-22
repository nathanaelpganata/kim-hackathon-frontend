'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { serialize } from 'object-to-formdata';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import useOrderStore from '@/store/orderStore';

import DropzoneInput from '../forms/DropzoneInput';
import InputForm from '../forms/InputForm';
import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { toast } from '../ui/use-toast';

const PaymentStep = ({
  setStep,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
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

  type OrderDataType = {
    customer_name: String;
    phone: String;
    picture: String[];
    atas_nama: String;
    bank_id: String;
    bukti_bayar: String[];
  };

  // Mutation
  const { mutate: postOrderData } = useMutation<void, unknown, any>(
    async (data) => {
      toast({
        title: 'Submitted Successfully',
        description: 'lorem ipsum dolor sit amet',
      });
      console.log(data);
      setStep(3);
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
    console.log(formdata);
    // postOrderData(formdata);
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
            {/* <Modal
              buttonLabel={'Save Changes'}
              dialogButtonLabel={'Save'}
              dialogTitle={'Are you Sure?'}
              dialogDescription={'Changes will be saved permanently'}
              mutationFn={() => onSubmit(form.getValues())}
            /> */}
            <Button>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PaymentStep;
