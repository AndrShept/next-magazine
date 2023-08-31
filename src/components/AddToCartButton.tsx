'use client';
import { CheckIcon } from '@heroicons/react/24/outline';
import React, { useTransition, useState } from 'react';

interface AddToCartButtonProps {
  productId: string;
  incrementProductQuantity: (productId: string) => Promise<void>;
}

export const AddToCartButton = ({
  productId,
  incrementProductQuantity,
}: AddToCartButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  return (
    <div className='flex items-center gap-2   mt-6 '>
      <button
        disabled={isPending}
        onClick={() => {
          setSuccess(false);
          startTransition(async () => {
            await incrementProductQuantity(productId);
            setSuccess(true);
          });
        }}
        className='btn btn-secondary text-white font-normal rounded-full  '
      >
        В Корзину
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      </button>
      {isPending && <span className='loading loading-spinner' />}
      {!isPending && success && (
        <span className='text-success animate-in duration-500 fade-in slide-in-from-right-20  '>
        <CheckIcon className="h-6 w-6 text-green-500" />
        </span>
      )}
    </div>
  );
};
