import { ProductList } from '@/components/ProductList';
import { prisma } from '@/lib/db/prisma';
import React from 'react';
import { OrderList } from './OrderList';
import { Order, OrderItem } from '@prisma/client';

export type OrderListProps = Order & { orderItem: OrderItem[] };

const page = async () => {
  const orders:OrderListProps[] = await prisma.order.findMany({
    include:{orderItem:true},
    orderBy: { createdAt: 'desc' },
  });
  console.log(orders)
  return (
    <div className='h-full max-w-3xl mx-auto '>

<OrderList orders={orders}/>
    </div>
  );
};

export default page;
