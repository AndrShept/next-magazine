'use client';
import { CartItemWithProduct, createCart, getCart } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react';
import { setProductQuantity } from './actions';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CartEntryProps {
  cartItem: CartItemWithProduct;
}

export const CartEntry = ({ cartItem }: CartEntryProps) => {
  const [isMount, setIsMount] = useState(false);
  const [pending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const quantityOptions = [...new Array(5)].map(
    (item, index) => (item = index)
  );
  const onChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const quantity = Number(e.target.value);
    startTransition(async () => {
      await setProductQuantity(cartItem.product.id, quantity);
      // router.refresh();
      setSuccess(true);
    });
  };
  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) return null;
  return (
    <>
      <div className='flex flex-col   sm:flex-row sm:items-stretch items-center  gap-4 bg-base-100  md:p-6 p-4 rounded-lg border border-zinc-200  '>
        <Image
          src={cartItem.product.imageUrl}
          alt={cartItem.product.name}
          width={500}
          height={500}
          className=' object-cover object-center rounded-lg  w-96  h-60 '
        />

        <div className='flex flex-col justify-between'>
          <div className='flex flex-col'>
            <Link
              className='font-semibold text-base hover:underline text-[#f000b8]/80'
              href={'/products/' + cartItem.product.id}
            >
              {cartItem.product.name}
            </Link>
            <span className='text-gray-500'>
              Ціна: {formatPrice(cartItem.product.price)}
            </span>
            <span className='text-gray-500'>
              Загальна ціна:{' '}
              {formatPrice(cartItem.product.price * cartItem.quantity)}
            </span>
          </div>
          <div className='my-1 flex items-center gap-3'>
            <span className='font-bold text-black/70'>кількість</span>
            <select
              disabled={pending}
              onChange={onChange}
              className='select select-bordered max-full  max-w-[80px]'
              defaultValue={cartItem.quantity}
            >
              {quantityOptions.map((quantity, i) => (
                <option key={i}> {quantity} </option>
              ))}
            </select>
            {pending && <span className='loading loading-spinner ' />}
            {!pending && success && (
              <CheckIcon className='h-6 w-6 text-green-500 animate-in fade-in duration-1000 slide-in-from-right-3 ' />
            )}
          </div>
        </div>
      </div>
      <div className='divider' />
    </>
  );
};
