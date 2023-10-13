'use client';
import { CheckIcon } from '@heroicons/react/24/outline';
import React, { useTransition, useState } from 'react';
import { Button } from './ui/button';
import { Loader, Loader2, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
  isShowText?: boolean;
  classname?: string
}

export const AddToCartButton = ({
  productId,
  incrementProductQuantity,
  isShowText = true,
  classname
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const router = useRouter()
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='flex items-center gap-2   mt-6 '
    >
      <Button
        variant={'default'}
        disabled={isPending}
        onClick={() => {
          setSuccess(false);
          
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
            router.refresh()
          });
        }}
        className={cn('rounded-full  gap-x-1 ', classname)}
      >
        {isShowText && 'В Корзину'} <Wallet />
      </Button>
      {isPending && <Loader2 className='animate-spin'/>}
      {!isPending && success && (
        <span className='text-success animate-in duration-500 fade-in slide-in-from-right-20  '>
          <CheckIcon className='h-6 w-6 text-green-500' />
        </span>
      )}
    </div>
  );
};
