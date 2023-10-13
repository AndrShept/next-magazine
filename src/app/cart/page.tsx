import { getCart } from '@/lib/db/cart';
import React from 'react';
import { CartEntry } from './CartEntry';
import { EmptyCart } from '@/components/EmptyCart';
import { formatPrice } from '@/lib/format';
import { CheckOutButton } from '@/components/CheckOutButton';

export const metadata = {
  title: 'Your cart',
};

const CartPage = async () => {
  const cart = await getCart();
  if (cart?.items.length === undefined || cart?.items.length === 0)
    return <EmptyCart />;
  return (
    <div className=''>
      <CartEntry cart={cart} />
    </div>
  );
};

export default CartPage;
