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
    <div className='flex flex-col   mx-auto overflow-x-hidden '>
      {cart?.items.map((item) => (
        <CartEntry key={item.id} cartItem={item} />
      ))}
      <span className='text-center mb-4  text-xl'>
        {' '}
        Загальна вартість замолення{' '}
        <strong>{formatPrice(cart?.subtotal || 0)}</strong>
      </span>
      <CheckOutButton cart={cart} />
    </div>
  );
};

export default CartPage;
