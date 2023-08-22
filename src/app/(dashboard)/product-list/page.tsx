import { ProductList } from '@/components/ProductList';
import { prisma } from '@/lib/db/prisma';
import { Product } from '@prisma/client';
import React from 'react';

const page = async() => {
  const products = await prisma.product.findMany()
  return (
    <div className='h-full p-4 space-2 max-w-3xl mx-auto '>
      <ProductList products={products} />
    </div>
  );
};

export default page;
