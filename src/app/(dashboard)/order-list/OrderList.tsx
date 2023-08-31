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
import { DeleteIcon } from './DeleteIcon';
import { Separator } from '@/components/ui/separator';

export const OrderList = ({ orders }: { orders: OrderListProps[] }) => {
  return (
    <div>
      <Accordion type='single' collapsible>
        {orders.map((order, idx) => (
          <AccordionItem
            className='border bg-base-100 border-zinc-300 rounded-xl px-3 py-2 mt-2 hover:shadow-md'
            key={order.id}
            value={`item-${idx + 1}`}
          >
            <AccordionTrigger>
              <span>{order.name}</span>
              <span className='text-sm '>{order.phoneNumber}</span>

              <span className='text-sm '>{format(order.createdAt)}</span>
            </AccordionTrigger>
            <div className='flex justify-between items-center'>
              <span className='text-sm text-zinc-500'>{order.email}</span>
              <div className='flex items-center gap-1'>
                <span className='text-sm text-pink-500'>
                  Загальна сума {formatPrice(order.subtotal)}
                </span>
                <DeleteIcon orderId={order.id} />
              </div>
            </div>
            <Separator className='mt-4' />
            {order.orderItem.map((item) => (
              <AccordionContent className='mt-2 mb-0' key={item.id}>
                <div className='grid grid-cols-4 items-center justify-between bg-base-100 px-4 py-2 rounded-md '>
                  <span className='font-medium text-zinc-500'>
                    {item.productName}
                  </span>
                  <div className='relative sm:h-20 h-14 max-w-md'>
                    <Image
                      src={item.imageUrl}
                      className='object-cover '
                      alt='img'
                      fill
                    />
                  </div>
                  <span className='ml-4'>{item.quantity}шт.</span>
                  <span className='text-pink-500'>
                    {formatPrice(item.productPrice * item.quantity)}
                  </span>
                </div>
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
