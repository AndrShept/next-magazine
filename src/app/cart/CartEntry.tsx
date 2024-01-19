'use client';

import { CheckOutButton } from '@/components/CheckOutButton';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  CartItemWithProduct,
  ShoppingCart,
  createCart,
  getCart,
} from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import { CheckIcon } from '@heroicons/react/24/solid';
import { Loader2, MinusCircle, PlusCircle, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState, useTransition } from 'react';

import { setProductQuantity } from './actions';

interface CartEntryProps {
  cart: ShoppingCart;
}

export const CartEntry = ({ cart }: CartEntryProps) => {
  const [isMount, setIsMount] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const quantityOptions = [...new Array(5)].map(
    (item, index) => (item = index),
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
    <section className="mx-auto grid grid-cols-1 gap-x-6 p-2 sm:max-w-5xl sm:grid-cols-3 ">
      <div className="sm:col-span-2  ">
        {cart.items.map((cartItem) => (
          <div
            key={cartItem.id}
            className="flex-col gap-2 border-b   py-4  sm:flex sm:flex-row"
          >
            <div
              onClick={() => router.push(`/products/${cartItem.productId}`)}
              className="relative mx-auto h-[200px] w-[200px]  cursor-pointer rounded-md border sm:mr-auto"
            >
              <Image
                className="rounded-md object-cover"
                alt="img"
                fill
                src={cartItem.product.imageUrl}
              />
            </div>
            <div className=" mt-2 flex  flex-1 flex-col gap-2   sm:mt-0  ">
              <div className="flex flex-col items-center  sm:items-start ">
                <div className="flex items-center  gap-x-2">
                  <h2 className="text-2xl font-semibold">
                    {' '}
                    {cartItem.product.name}
                  </h2>
                  {cartItem.product.isLeaf && (
                    <div className="relative h-7 w-7 rounded-full border p-1 sm:h-8 sm:w-8 sm:p-[6px]">
                      <Image
                        alt="img"
                        width={1000}
                        height={1000}
                        src={'/leaf.png'}
                      />
                    </div>
                  )}
                </div>
                <span className="text-muted-foreground">
                  {' '}
                  {formatPrice(cartItem.product.price)}
                </span>
              </div>
              <div className="flex  items-center justify-center  gap-x-1 text-muted-foreground sm:justify-start ">
                <Button
                  disabled={cartItem.quantity === 1}
                  onClick={() =>
                    decreaseQuantity(cartItem.productId, cartItem.quantity)
                  }
                  className="rounded-full"
                  variant={'ghost'}
                  size={'icon'}
                >
                  <MinusCircle />
                </Button>
                <span className="font-bold text-black">
                  {cartItem.quantity}
                </span>
                <Button
                  // disabled={isPending}
                  onClick={() =>
                    increaseQuantity(cartItem.productId, cartItem.quantity)
                  }
                  className="rounded-full"
                  variant={'ghost'}
                  size={'icon'}
                >
                  <PlusCircle />
                </Button>
                <div className="ml-4 text-muted-foreground">
                  <Button
                    // disabled={isPending}
                    onClick={() => DeleteProduct(cartItem.productId, 0)}
                    className="rounded-full"
                    variant={'ghost'}
                    size={'icon'}
                  >
                    <X />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className=" mt-8 flex h-max w-full flex-col  rounded-md bg-secondary p-4 sm:mt-0">
        <p className="text-xl font-semibold">Order summary</p>
        <Separator className="my-2" />
        <div className="flex justify-between gap-x-1 text-base font-semibold">
          <span className="">Order total</span>
          <span>{formatPrice(cart.subtotal)}</span>
        </div>
        {/* <Button className='rounded-full mt-4'>Chekout</Button> */}
        <CheckOutButton cart={cart} />
      </div>
    </section>
  );
};
