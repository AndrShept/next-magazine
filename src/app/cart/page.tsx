import { getCart } from '@/lib/db/cart';
import React from 'react';
import { CartEntry } from './CartEntry';
import { EmptyCart } from '@/components/EmptyCart';
import Link from 'next/link';
import { formatPrice } from '@/lib/format';

export const metadata = {
  title: 'Your cart',
};

const CartPage = async () => {
  const cart = await getCart();

  if (cart?.items.length === 0) return <EmptyCart />;
  return (
    
      <div className='flex flex-col   mx-auto overflow-x-hidden '>
        {cart?.items.map((item) => (
          <CartEntry key={item.id} cartItem={item} />
        ))}
        <span className='text-center mb-4  text-xl'>
          {' '}
          Загальна вартість замолення <strong>{formatPrice(cart?.subtotal || 0)}</strong>
        </span>
        <Link
          href='#'
          className='btn btn-secondary mx-auto text-white rounded-full '
        >
          CHECKOUT
        </Link>
      </div>
   
  );
};

export default CartPage;
