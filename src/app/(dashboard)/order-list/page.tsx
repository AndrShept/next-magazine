import { prisma } from '@/lib/db/prisma';
import React from 'react';
import { OrderList } from './OrderList';

const page = async () => {
  const orders = await prisma.order.findMany({
    include: { orderItem: true },
    orderBy: { createdAt: 'desc' },
  });
  if (!orders || orders === undefined || orders.length === 0) {
    return (
      <div className='text-center text-4xl text-gray-500'>Замовлень немає</div>
    );
  }
  return (
    <div className='h-full max-w-3xl mx-auto '>
      <OrderList orders={orders} />
    </div>
  );
};

export default page;
