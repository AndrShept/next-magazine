'use client';
import {
  CartItemWithProduct,
  ShoppingCart,
  createCart,
  getCart,
} from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react';
import { setProductQuantity } from './actions';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import { Loader2, MinusCircle, PlusCircle, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { CheckOutButton } from '@/components/CheckOutButton';

interface CartEntryProps {
  cart: ShoppingCart;
}

export const CartEntry = ({ cart }: CartEntryProps) => {
  const [isMount, setIsMount] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const quantityOptions = [...new Array(5)].map(
    (item, index) => (item = index)
  );
  const DeleteProduct = (productId: string, quantity: number) => {
    // const quantity = Number(e.target.value);
    startTransition(async () => {
      await setProductQuantity(productId, quantity);
      router.refresh();
      // setSuccess(true);
    });
  };
  const increaseQuantity = (productId: string, quantity: number) => {
    if (quantity >= 1) {
      startTransition(async () => {
        await setProductQuantity(productId, quantity + 1);
        router.refresh();
        // setSuccess(true);
      });
    }
  };
  const decreaseQuantity = (productId: string, quantity: number) => {
    if (quantity > 1) {
      startTransition(async () => {
        await setProductQuantity(productId, quantity - 1);
        router.refresh();
        // setSuccess(true);
      });
    }
  };

  useEffect(() => {
    setIsMount(true);
    window.scroll(0, 0);
  }, []);

  if (!isMount) return null;
  return (
    <section className='sm:max-w-5xl p-2 mx-auto grid sm:grid-cols-3 grid-cols-1 gap-x-6 '>
      <div className='sm:col-span-2  '>
        {cart.items.map((cartItem) => (
          <div
            key={cartItem.id}
            className='sm:flex flex-col sm:flex-row   gap-2  border-b py-4'
          >
            <div
              onClick={() => router.push(`/products/${cartItem.productId}`)}
              className='relative border mx-auto  rounded-md h-[200px] w-[200px] cursor-pointer'
            >
              <Image
                className='rounded-md object-cover'
                alt='img'
                fill
                src={cartItem.product.imageUrl}
              />
            </div>
            <div className=' flex sm:justify-between justify-center items-start   sm:mt-0 mt-2 gap-2 flex-wrap  flex-1 '>
              <div className='flex flex-col'>
                <div className='flex items-center gap-x-2'>
                  <h2 className='text-2xl font-semibold'>
                    {' '}
                    {cartItem.product.name}
                  </h2>
                  {cartItem.product.isLeaf && (
                    <div className='relative sm:h-8 sm:w-8 sm:p-[6px] w-7 h-7 p-1 border rounded-full'>
                      <Image
                        alt='img'
                        width={1000}
                        height={1000}
                        src={'/leaf.png'}
                      />
                    </div>
                  )}
                </div>
                <span className='text-muted-foreground'>
                  {' '}
                  {formatPrice(cartItem.product.price)}
                </span>
              </div>
              <div className='text-muted-foreground flex items-center gap-x-1 '>
                <Button
                  disabled={cartItem.quantity === 1}
                  onClick={() =>
                    decreaseQuantity(cartItem.productId, cartItem.quantity)
                  }
                  className='rounded-full'
                  variant={'ghost'}
                  size={'icon'}
                >
                  <MinusCircle />
                </Button>
                <span className='font-bold text-black'>
                  {cartItem.quantity}
                </span>
                <Button
                  // disabled={isPending}
                  onClick={() =>
                    increaseQuantity(cartItem.productId, cartItem.quantity)
                  }
                  className='rounded-full'
                  variant={'ghost'}
                  size={'icon'}
                >
                  <PlusCircle />
                </Button>
              </div>
              <div className='text-muted-foreground'>
                <Button
                  // disabled={isPending}
                  onClick={() => DeleteProduct(cartItem.productId, 0)}
                  className='rounded-full'
                  variant={'ghost'}
                  size={'icon'}
                >
                  <X />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=' h-max p-4 w-full sm:mt-0 mt-8  rounded-md bg-secondary flex flex-col'>
        <p className='text-xl font-semibold'>Order summary</p>
        <Separator className='my-2' />
        <div className='flex justify-between text-base font-semibold gap-x-1'>
          <span className=''>Order total</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>
        {/* <Button className='rounded-full mt-4'>Chekout</Button> */}
        <CheckOutButton cart={cart} />
      </div>
    </section>
  );
};
