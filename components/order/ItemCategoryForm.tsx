import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import get from 'lodash.get';
import Image from 'next/image';
import * as React from 'react';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { HiExclamationCircle } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';

export type ItemCategoryProps = {
  label: string;
  options: {
    label: string;
    value: string;
    image?: string;
  }[];
  id: string;
  value?: string | number;
  validation?: RegisterOptions;
  imageClassName?: string;
};

export default function ItemCategory({
  validation,
  options,
  label,
  id,
  imageClassName,
}: ItemCategoryProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  return (
    <div className='flex w-full flex-col'>
      <Controller
        control={control}
        rules={validation}
        name={id}
        render={({ field: { onChange, value } }) => (
          <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className='text-lg font-semibold text-black'>
              {label}
            </RadioGroup.Label>
            <div className='flex flex-col gap-8 w-full'>
              {options.map((item) => (
                <RadioGroup.Option
                  key={item.value}
                  value={item.value}
                  className={({ active, checked }) =>
                    `
                    ${error ? 'border-red-600' : ''}
                    ${active ? '' : ''}
                  ${
                    checked
                      ? 'bg-blue-100 text-[#3056A2] border-2 border-[#3056A2]'
                      : ' border-2 border-white bg-white '
                  }
                    relative flex cursor-pointer flex-row w-[17rem] xs:w-[20rem] sm:w-[35rem] h-36 rounded-[10px] px-4 sm:px-8`
                  }
                >
                  {({ checked }) => (
                    <>
                      <div className='flex flex-col items-center justify-center gap-y-2'>
                        <RadioGroup.Label
                          as='p'
                          className={` ${
                            checked ? 'text-[#3056A2]' : 'text-black'
                          }`}
                        >
                          <div className='flex flex-row gap-4 items-center'>
                            {item.image && (
                              <Image
                                src={item.image}
                                width={100}
                                height={100}
                                alt={item.label}
                                className={clsx(
                                  `w-[35%] sm:w-auto`,
                                  imageClassName
                                )}
                              />
                            )}
                            <RadioGroup.Description
                              as='span'
                              className={`inline ${
                                checked ? 'text-[#3056A2]' : 'text-black'
                              } font-bold text-3xl sm:text-[40px]`}
                            >
                              {item.label}
                            </RadioGroup.Description>
                          </div>
                        </RadioGroup.Label>
                      </div>
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        )}
      ></Controller>
      <div className='mt-1'>
        {error && (
          <span className='text-lg text-red-600 flex gap-x-1 translate-y-6 font-bold items-center'>
            <HiExclamationCircle className='text-xl text-red-600 w-6 h-6' />
            {error?.message as unknown as string}
          </span>
        )}
      </div>
    </div>
  );
}
