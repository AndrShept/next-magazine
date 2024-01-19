'use client';

import { cn } from '@/lib/utils';
import { CheckIcon } from '@heroicons/react/24/outline';
import { CartItem, Product } from '@prisma/client';
import { Loader, Loader2, Wallet } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from './ui/button';

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (
    productId: string,
  ) => Promise<CartItem & { product: Product }>;
  isShowText?: boolean;
  classname?: string;
}

export const AddToCartButton = ({
  productId,
  incrementProductQuantity,
  isShowText = true,
  classname,
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-2     "
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
        className={cn('gap-x-1  rounded-full  ', classname)}
      >
        {isShowText && 'В Корзину'} <Wallet />
      </Button>
      {isPending && <Loader2 className="animate-spin" />}
      {!isPending && success && (
        <span className="text-success   animate-in fade-in slide-in-from-right-20 duration-500  ">
          <CheckIcon className="h-6 w-6 text-green-500" />
        </span>
      )}
    </div>
  );
};
