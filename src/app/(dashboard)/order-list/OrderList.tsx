'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/format';
import { Order, OrderItem } from '@prisma/client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';

import { DeleteIcon } from './DeleteIcon';

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
      <div className="flex items-center gap-2">
        <div
          onClick={() => router.back()}
          className="cursor-pointer rounded-full p-2 hover:bg-zinc-300"
        >
          <ArrowLeft className="text-gray-600" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Назад</h3>
          <p className="text-sm text-muted-foreground">
            General information about your Product
          </p>
        </div>
      </div>
      <Separator className="mb-8 bg-primary/10" />
      <AnimatePresence initial={true}>
        <Accordion type="single" collapsible>
          {orders.map((order, idx) => (
            <motion.div
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx }}
              exit={{ opacity: 0, x: 200 }}
              key={order.id}
            >
              <AccordionItem
                className="mt-2 rounded-xl border border-zinc-300 bg-base-100 px-2 py-2 hover:shadow-md sm:px-3"
                value={`item-${idx + 1}`}
              >
                <AccordionTrigger>
                  <span className="flex-1 truncate text-left">
                    {order.name}
                  </span>
                  <span className="flex-1 px-2 text-left text-sm">
                    {order.phoneNumber}
                  </span>

                  <span className="flex-1 px-2 text-end text-sm text-muted-foreground">
                    {format(order.createdAt)}
                  </span>
                </AccordionTrigger>

                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm text-zinc-500">{order.email}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-end text-sm  text-pink-500">
                      Загальна сума {formatPrice(order.subtotal)}
                    </span>
                    <div>
                      <DeleteIcon orderId={order.id} />
                    </div>
                  </div>
                </div>
                <Separator className="mt-4" />
                {order.orderItem.map((item) => (
                  <AccordionContent className="mb-0 mt-2" key={item.id}>
                    <div className="grid grid-cols-12 items-center justify-between rounded-md  bg-base-100 py-2">
                      <span className="col-span-4 text-left font-medium text-zinc-500 ">
                        {item.productName}
                        {item.isLeaf && (
                          <h3 className="text-sm font-normal text-green-600">
                            (листок)
                          </h3>
                        )}
                      </span>
                      <div className="relative col-span-4  ml-2 h-16 w-[100px] rounded-md border shadow-md sm:h-24 sm:w-[200px]   ">
                        <Image
                          src={item.imageUrl}
                          className="rounded-md object-cover "
                          alt="img"
                          fill
                        />
                      </div>
                      <span className="col-span-2 text-center  text-muted-foreground">
                        {item.quantity}шт.
                      </span>
                      <span className="col-span-2 truncate text-center text-pink-500">
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
