import clsx from 'clsx';
import get from 'lodash.get';
import * as React from 'react';
import { Accept, FileRejection, useDropzone } from 'react-dropzone';
import { FileWithPath } from 'react-dropzone';
import { Controller, useFormContext } from 'react-hook-form';

import FilePreview from '@/components/forms/FilePreview';

export type FileWithPreview = FileWithPath & { preview: string };

type DropzoneInputProps = {
  accept?: Accept;
  helperText?: string;
  id: string;
  label: string | JSX.Element;
  acceptTypes?: string;
  maxFiles?: number;
  readOnly?: boolean;
  maxSize?: number;
  validation?: Record<string, unknown>;
};

export default function DropzoneInput({
  accept,
  helperText = '',
  acceptTypes = 'JPG / JPEG / PNG',
  id,
  label,
  maxSize = 1000000,
  maxFiles = 1,
  validation,
  readOnly,
}: DropzoneInputProps) {
  const {
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const error = get(errors, id);

  //#region  //*=========== Error Focus ===========
  const dropzoneRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    error && dropzoneRef.current?.focus();
  }, [error]);
  //#endregion  //*======== Error Focus ===========

  const [files, setFiles] = React.useState<FileWithPreview[]>(
    getValues(id) || []
  );

  const onDrop = React.useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        setValue(id, files ? [...files] : null);
        setError(id, {
          type: 'manual',
          message: rejectedFiles && rejectedFiles[0].errors[0].message,
        });
      } else {
        const acceptedFilesPreview = acceptedFiles.map((file: T) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );

        setFiles(
          files
            ? [...files, ...acceptedFilesPreview].slice(0, maxFiles)
            : acceptedFilesPreview
        );

        setValue(
          id,
          files
            ? [...files, ...acceptedFiles].slice(0, maxFiles)
            : acceptedFiles,
          {
            shouldValidate: true,
          }
        );
        clearErrors(id);
      }
    },
    [clearErrors, files, id, maxFiles, setError, setValue]
  );

  React.useEffect(() => {
    return () => {
      () => {
        files.forEach((file) => URL.revokeObjectURL(file.preview));
      };
    };
  }, [files]);

  const deleteFile = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    file: FileWithPreview
  ) => {
    e.preventDefault();
    const newFiles = [...files];

    newFiles.splice(newFiles.indexOf(file), 1);

    if (newFiles.length > 0) {
      setFiles(newFiles);
      setValue(id, newFiles, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else {
      setFiles([]);
      setValue(id, null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    }
  };

  function sizeValidation(file: File) {
    if (file.size > maxSize) {
      return {
        code: 'file-too-large',
        message: `File Terlalu Besar, Maksimal ${maxSize / 1000000} MB`,
      };
    }
    return null;
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    validator: sizeValidation,
  });

  return (
    <div>
      <label className='block text-sm font-semibold text-typo' htmlFor={id}>
        {label}
      </label>

      {readOnly && !(files?.length > 0) ? (
        <div className='divide-y divide-gray-300 rounded-md border border-gray-300 py-3 pl-3 pr-4 text-sm'>
          No file uploaded
        </div>
      ) : files?.length >= maxFiles ? (
        <ul className='mt-1 divide-y divide-gray-300 rounded-md border border-gray-300'>
          {files.map((file, index) => (
            <FilePreview
              key={index}
              readOnly={readOnly}
              file={file}
              deleteFile={deleteFile}
            />
          ))}
        </ul>
      ) : (
        <Controller
          control={control}
          name={id}
          rules={validation}
          render={({ field }) => (
            <>
              <div
                className='focus:ring-dark-400 group mt-1 focus:outline-none'
                {...getRootProps()}
                ref={dropzoneRef}
              >
                <input {...field} {...getInputProps()} />
                <div
                  className={clsx(
                    'w-full cursor-pointer rounded border-2 border-dashed border-gray-300 px-2 py-8',
                    error
                      ? 'border-red-500 group-focus:border-red-500'
                      : 'group-focus:border-success-500'
                  )}
                >
                  <div className='space-y-1 text-center'>
                    <svg
                      className='mx-auto h-12 w-12 text-gray-400'
                      stroke='currentColor'
                      fill='none'
                      viewBox='0 0 48 48'
                      aria-hidden='true'
                    >
                      <path
                        d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                    <p className='text-gray-500'>
                      <span className='font-semibold underline text-success-600'>
                        Klik untuk upload
                      </span>{' '}
                      atau drag and drop
                      <br />
                      <span className='text-sm text-gray-400'>
                        {acceptTypes}
                      </span>
                    </p>
                    <p className='text-xs text-gray-500'>{`${
                      maxFiles - (files?.length || 0)
                    } file(s) remaining`}</p>
                  </div>
                </div>
              </div>

              <div className='mt-1'>
                {helperText !== '' && (
                  <p className='text-xs text-gray-500'>{helperText}</p>
                )}
                {error && (
                  <p className='text-sm text-red-500'>
                    {error.message?.toString()}
                  </p>
                )}
              </div>
              {!readOnly && !!files?.length && (
                <ul className='mt-1 divide-y divide-gray-300 rounded-md border-none'>
                  {files.map((file, index) => (
                    <FilePreview
                      key={index}
                      readOnly={readOnly}
                      file={file}
                      deleteFile={deleteFile}
                    />
                  ))}
                </ul>
              )}
            </>
          )}
        />
      )}
    </div>
  );
}
