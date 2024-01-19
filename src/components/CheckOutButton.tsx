'use client';

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
import React from 'react';

import { Button } from './ui/button';

export const CheckOutButton = ({ cart }: { cart: ShoppingCart | null }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-4 rounded-full">Chekout</Button>
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
