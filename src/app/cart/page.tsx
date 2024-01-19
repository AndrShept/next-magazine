import { CheckOutButton } from '@/components/CheckOutButton';
import { EmptyCart } from '@/components/EmptyCart';
import { getCart } from '@/lib/db/cart';
import { formatPrice } from '@/lib/format';
import React from 'react';

import { CartEntry } from './CartEntry';

export const metadata = {
  title: 'Your cart',
};

const CartPage = async () => {
  const cart = await getCart();
  if (cart?.items.length === undefined || cart?.items.length === 0)
    return <EmptyCart />;
  return (
    <div className="">
      <CartEntry cart={cart} />
    </div>
  );
};

export default CartPage;
