'use client';
import React, { useEffect, useState } from 'react';
import { CheckOut } from '@/components/CheckOut';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ShoppingCart } from '@/lib/db/cart';

export const CheckOutButton = ({ cart }: { cart: ShoppingCart | null }) => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) return null;
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <button className='btn btn-secondary mx-auto text-white rounded-full '>
            ДАЛЬШЕ
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Форма даних про покупця</DialogTitle>
            <DialogDescription>
              Щоб зробити замовлення заповніть форму нижче
            </DialogDescription>
          </DialogHeader>
          <CheckOut cart={cart} />
        </DialogContent>
      </Dialog>
    </>
  );
};
