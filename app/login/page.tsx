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
    <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex flex-col max-w-sm w-full border-2 border-black rounded-2xl p-6 gap-y-3'
        >
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
  );
};

export default LoginPage;
