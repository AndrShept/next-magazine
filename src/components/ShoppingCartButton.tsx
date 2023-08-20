'use client';
import { ShoppingCart } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';
import React from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface ShoppingCartButtonProps {
  cart: ShoppingCart | null;
}

export const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
  const closeDropDown = () => {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  };
  return (
    <div className='dropdown dropdown-end  '>
      <label tabIndex={1} className='btn btn-ghost btn-circle  '>
        <div className='indicator'>
          <ShoppingCartIcon className='h-6 w-6 text-black' />
          {/* <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
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
            </svg> */}
          {cart?.size ? (
            <span className='badge badge-sm indicator-item bg-secondary font-normal text-white '>
              {cart?.size ?? 0}
            </span>
          ) : null}
        </div>
      </label>
      <div
        tabIndex={1}
        className='   card card-bordered dropdown-content w-52 bg-base-100 shadow  '
      >
        <div className='card-body gap-4 '>
          <span className='font-bold text-lg'>{cart?.size || 0} Items</span>
          <span className=''>
            Total Price: {formatPrice(cart?.subtotal || 0)}
          </span>
          <div className='card-actions'>
            <Link
              onClick={closeDropDown}
              href='/cart'
              className='btn btn-secondary rounded-full btn-block text-white font-normal'
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};