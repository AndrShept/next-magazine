'use client';
import { CheckIcon } from '@heroicons/react/24/outline';
import React, { useTransition, useState } from 'react';
import { Button } from './ui/button';
import { Loader, Loader2, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { CartItem, Product } from '@prisma/client';

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (
    productId: string
  ) => Promise<CartItem & { product: Product }>;
  isShowText?: boolean;
  className?: string;
}

export const AddToCartButton = ({
  productId,
  incrementProductQuantity,
  isShowText = true,
  className,
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className='flex items-center gap-2   mt-6 '
    >
      <Button
        variant={'default'}
        disabled={isLoading}
        onClick={() => {
          const promise = incrementProductQuantity(productId);
          setIsLoading(true);
          toast.promise(promise, {
            loading: 'Loading...',
            success: (data) => {
              setSuccess(true);
              setTimeout(() => {
                setSuccess(false);
              }, 4000);
              router.refresh();
              setIsLoading(false);

              return `${data.product.name} добавлено до корзини`;
            },
            error: 'Error',
          });
        }}
        className={cn('rounded-full  gap-x-1 ', className)}
      >
        {isShowText && 'В Корзину'} <Wallet />
      </Button>
      {isPending && <Loader2 className='animate-spin' />}
      {!isPending && success && (
        <span className='text-success animate-in duration-500 fade-in slide-in-from-right-20  '>
          <CheckIcon className='h-6 w-6 text-green-500' />
        </span>
      )}
    </div>
  );
};
