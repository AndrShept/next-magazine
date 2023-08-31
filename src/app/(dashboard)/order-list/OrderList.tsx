import { Order, OrderItem } from '@prisma/client';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { format } from 'timeago.js';
import { OrderListProps } from './page';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';
import { Separator } from '@/components/ui/separator';

export const OrderList = ({ orders }: { orders: OrderListProps[] }) => {
  return (
    <div>
      <Accordion type='single' collapsible>
        {orders.map((order, idx) => (
          <AccordionItem
            className='border border-zinc-600 rounded-xl px-3 py-2 mt-2 hover:shadow-md'
            key={order.id}
            value={`item-${idx + 1}`}
          >
            <AccordionTrigger>
              <span>{order.name}</span>
              <span className='text-sm text-gray-500'>{order.phoneNumber}</span>

              <span className='text-sm '>{format(order.createdAt)}</span>
            </AccordionTrigger>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-gray-500'>{order.email}</span>
              <span className='text-sm text-pink-500'>
                Загальна сума {formatPrice(order.subtotal)}
              </span>
            </div>
            {/* <Separator /> */}
            {order.orderItem.map((item) => (
              <AccordionContent className='mt-2 mb-0' key={item.id}>
                <div className='grid grid-cols-4 items-center justify-between bg-base-100 px-4 py-2 rounded-md '>
                  <span>{item.productName}</span>
                  <div className='relative h-14 w-20'>
                    <Image
                      src={item.imageUrl}
                      className='object-cover '
                      alt='img'
                      fill
                    />
                  </div>
                  <span>{item.quantity}шт.</span>
                  <span>{formatPrice(item.productPrice* item.quantity)}</span>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
