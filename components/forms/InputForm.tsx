import React from 'react';
import { Control } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

type InputFormProps = {
  control: Control<any>;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
};

const InputForm = ({
  label,
  control,
  placeholder,
  name,
  helperText,
  type = 'text',
}: InputFormProps) => {
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);
  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className='relative'>
            <FormControl>
              <Input
                placeholder={placeholder}
                type={
                  type == 'password'
                    ? hidePassword
                      ? 'password'
                      : 'text'
                    : type
                }
                {...field}
              />
            </FormControl>
            <div className='absolute right-3 top-[25%] z-10'>
              {type == 'password' ? (
                hidePassword ? (
                  <AiOutlineEye
                    className='w-5 h-5 cursor-pointer'
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className='w-5 h-5 cursor-pointer'
                    onClick={() => setHidePassword(!hidePassword)}
                  />
                )
              ) : null}
            </div>
          </div>
          <FormDescription>{helperText}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputForm;
