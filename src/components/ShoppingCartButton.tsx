'use client';

import { ShoppingCart } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import { ShoppingCart as ShoppingCartIcon, WalletCards } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';

import { Indicator } from './Indicator';
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
    <div className="dropdown-end dropdown  ">
      <label
        tabIndex={1}
        className="btn-ghost btn  px-2  hover:bg-secondary  hover:text-primary "
      >
        <div className="p-0 ">
          <ShoppingCartIcon
            size={22}
            strokeWidth={2}
            className="text-muted-foreground  hover:text-primary "
          />

          {cart?.size ? (
            <Indicator classname="top-[5px]" number={cart?.size} />
          ) : null}
        </div>
      </label>
      <div
        tabIndex={1}
        className="   card-bordered card dropdown-content w-52 bg-base-100 shadow  "
      >
        <div className="card-body flex gap-4  ">
          <div className="flex flex-col text-center">
            <span> Загальна вартість:</span>
            <span className="mt-2 font-bold">
              {formatPrice(cart?.subtotal || 0)}
            </span>
          </div>
          <Button asChild className="rounded-full ">
            <Link onClick={closeDropDown} href="/cart" className="">
              До корзини
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
