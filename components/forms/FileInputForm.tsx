import React from 'react';
import { Control, Controller } from 'react-hook-form';

import { Input } from '../ui/input';

type FileInputFormProps = {
  control: Control<any>;
  name: string;
  label?: string;
  helperText?: string;
};

const FileInputForm = ({
  label,
  control,
  name,
  helperText,
}: FileInputFormProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <label htmlFor={name}>{label}</label>
          <Input
            type='file'
            id={name}
            onChange={(e) => {
              const file = e.target.files?.[0];
              field.onChange(file);
            }}
          />
          <p>{helperText}</p>
        </div>
      )}
    />
  );
};

export default FileInputForm;
