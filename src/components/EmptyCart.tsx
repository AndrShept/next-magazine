import Image from 'next/image';
import React from 'react';

export const EmptyCart = () => {
  return (
    <div className='flex  m-auto '>
      <Image
        className='object-cover mx-auto rounded-3xl'
        src='https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg?w=826'
        width={800}
        height={800}
        alt='image'
      />

    </div>
  );
};
