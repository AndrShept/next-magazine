import { ProductList } from '@/components/ProductList';
import { prisma } from '@/lib/db/prisma';
import React from 'react';

const page = async () => {
  const orders = await prisma.order.findMany({
    include:{orderItem:true},
    orderBy: { createdAt: 'desc' },
  });
  console.log(orders)
  return (
    <div className='h-full p-4 space-2 max-w-3xl mx-auto '>
  
    </div>
  );
};

export default page;
