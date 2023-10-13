'use client';
import { ShoppingCart } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { WalletCards } from 'lucide-react';
import { Button } from './ui/button';

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
  const [isClient, setIsClient] = useState(false);
  const closeDropDown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className='dropdown dropdown-end  '>
      <label
        tabIndex={1}
        className='btn btn-ghost btn-circle hover:bg-secondary p-2'
      >
        <div className='indicator'>
          <WalletCards strokeWidth={2} className='text-muted-foreground' />

          {cart?.size ? (
            <span className='badge badge-sm indicator-item bg-primary font-normal text-white '>
              {cart?.size ?? 0}
            </span>
          ) : null}
        </div>
      </label>
      <div
        tabIndex={1}
        className='   card card-bordered dropdown-content w-52 bg-base-100 shadow  '
      >
        <div className='card-body gap-4 flex  '>
          <div className='flex flex-col text-center'>
            <span> Загальна вартість:</span>
            <span className='mt-2 font-bold'>
              {formatPrice(cart?.subtotal || 0)}
            </span>
          </div>
          <Button asChild className='rounded-full'>
            <Link onClick={closeDropDown} href='/cart' className=''>
              До корзини
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
