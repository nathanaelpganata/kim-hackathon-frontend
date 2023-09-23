import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type DialogButtonType = {
  dialogTitle: String;
  dialogDescription?: String;
  buttonLabel?: String;
  dialogImage?: string;
  widthImage?: number;
  heightImage?: number;
  dialogButtonLabel?: String;
  buttonVariant?:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  mutationFn?: () => void;
};

export function Modal({
  buttonLabel,
  buttonVariant = 'default',
  dialogTitle,
  dialogDescription,
  dialogButtonLabel,
  heightImage,
  widthImage,
  dialogImage,
  children,
  isOpen,
  onClose,
  mutationFn,
}: DialogButtonType) {
  const onChange = (open: boolean) => {
    if (!open && onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger asChild>
        {!!buttonLabel && (
          <Button variant={buttonVariant}>{buttonLabel}</Button>
        )}
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] max-w-xs'>
        <DialogHeader className='flex flex-col items-center'>
          {!!dialogImage && (
            <Image
              src={dialogImage}
              width={widthImage}
              height={heightImage}
              alt={dialogImage}
            />
          )}

          <DialogTitle className='pt-2'>{dialogTitle}</DialogTitle>
          <DialogDescription className='text-center'>{dialogDescription}</DialogDescription>
        </DialogHeader>
        {children}
        {!!dialogButtonLabel && (
          <DialogFooter className='flex flex-row gap-1 mx-auto mt-2'>
            <Button
              className='w-32'
              type='submit'
              onClick={() => (mutationFn ? mutationFn() : null)}
            >
              {dialogButtonLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
