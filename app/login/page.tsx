'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import InputForm from '@/components/forms/InputForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import useAuthStore from '@/store/authStore';
import { AxiosErrorType } from '@/types/api';
import Image from 'next/image';

const LoginPage = () => {
  // Router initialization
  const router = useRouter();

  // Store initialization
  const setAuth = useAuthStore.useSetIsAuth();
  const setUserId = useAuthStore.useSetUserId();
  const name = useAuthStore.useName();
  const setName = useAuthStore.useSetName();
  const setEmail = useAuthStore.useSetEmail();

  // Form initialization
  const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
  });

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      toast({
        title: 'Loading...',
        description: `Mohon tunggu sebentar`,
      });
      const res = await axios.post('/auth/login', data);
      const responseData = res.data.data;

      setUserId(responseData.userId);
      setName(responseData.name);
      setEmail(responseData.email);
      setAuth(true);
      localStorage.setItem('accessToken', responseData.accessToken);
      router.push('/admin');
      toast({
        title: res.data.message,
        description: `Selamat datang ${name}!`,
      });
    } catch (e) {
      const error = e as AxiosError<AxiosErrorType & { message?: string }>;
      toast({
        variant: 'destructive',
        title: error?.response?.data?.message,
        description: 'Tolong coba kembali',
      });
    }
  };

  return (
    <div className='flex flex-col md:flex-row min-h-screen bg-white justify-center'>
      <div className='hidden md:w-1/2 md:block'>
        <Image
          src={'/order/background-blue.png'}
          width={818}
          height={1188}
          alt='background-blue'
          className=' md:h-screen md:w-full'
        />
      </div>
      <div className='md:w-1/2 flex justify-center items-center px-4'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col max-w-sm w-full gap-y-3'
          >
            <h1 className='text-3xl font-bold'>Glossy Gift</h1>
            <h2 className='-translate-y-4 ml-32'>Login</h2>
            <InputForm
              control={form.control}
              name='email'
              placeholder='Enter your email here'
              label='Email'
            />
            <InputForm
              control={form.control}
              name='password'
              placeholder='Enter your password here'
              label='Password'
              type='password'
            />
            <Button type='submit'>Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
