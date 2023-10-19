'use client';
import React, { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { format } from 'timeago.js';
import Image from 'next/image';
import { formatPrice } from '@/lib/format';
import { DeleteIcon } from './DeleteIcon';
import { Separator } from '@/components/ui/separator';
import { Order, OrderItem } from '@prisma/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface OrderListProps extends Order {
  orderItem: OrderItem[];
}

export const OrderList = ({ orders }: { orders: OrderListProps[] }) => {
  const [isMount, setIsMount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMount(true);
    window.scroll(0, 0);
  }, []);
  if (!isMount) return null;
  return (
    <div>
      <div className='flex items-center gap-2'>
        <div
          onClick={() => router.back()}
          className='cursor-pointer rounded-full p-2 hover:bg-zinc-300'
        >
          <ArrowLeft className='text-gray-600' />
        </div>
        <div>
          <h3 className='text-lg font-medium'>Назад</h3>
          <p className='text-sm text-muted-foreground'>
            General information about your Product
          </p>
        </div>
      </div>
      <Separator className='bg-primary/10 mb-8' />
      <AnimatePresence initial={true}>
        <Accordion type='single' collapsible>
          {orders.map((order, idx) => (
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              exit={{ opacity: 0, x: 200 }}
              key={order.id}
            >
              <AccordionItem
                className='border bg-base-100 border-zinc-300 rounded-xl px-3 py-2 mt-2 hover:shadow-md'
                value={`item-${idx + 1}`}
              >
                <AccordionTrigger className='gap-2'>
                  <span>{order.name}</span>
                  <span className='text-sm '>{order.phoneNumber}</span>

                  <span className='text-sm text-gray-400 '>
                    {format(order.createdAt)}
                  </span>
                </AccordionTrigger>
                <div className='flex justify-between items-center gap-2'>
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
                    <div className='grid grid-cols-4 items-center justify-between bg-base-100 px-4 py-2 rounded-md'>
                      <span className='font-medium text-zinc-500 text-left '>
                        {item.productName}
                        {item.isLeaf && (
                          <h3 className='text-green-600 text-sm font-normal'>
                            (листок)
                          </h3>
                        )}
                      </span>
                      <div className='relative sm:h-20 h-14 max-w-md ml-2   '>
                        <Image
                          src={item.imageUrl}
                          className='object-cover '
                          alt='img'
                          fill
                        />
                      </div>
                      <span className='text-center'>{item.quantity}шт.</span>
                      <span className='text-pink-500 text-center '>
                        {formatPrice(item.productPrice * item.quantity)}
                      </span>
                    </div>
                  </AccordionContent>
                ))}
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </AnimatePresence>
    </div>
  );
};
