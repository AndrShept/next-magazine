'use client';

import { incrementProductQuantity } from '@/app/products/[id]/actions';
import { AddToCartButton } from '@/components/AddToCartButton';
import { formatPrice } from '@/lib/format';
import { cn } from '@/lib/utils';
import { Product, Rating } from '@prisma/client';
import { Eye, Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { ActionTooltip } from './ActionTooltip';
import { StarRating } from './StarRating';
import { Separator } from './ui/separator';

export const ProductById = ({ product }: { product: Product }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);

    window.scroll(0, 0);
  }, []);

  if (!isMount) return null;

  return (
    <section className=" mx-auto mt-14 flex max-w-3xl justify-center  gap-4 rounded-md   border-y-[1px] py-8   sm:gap-8">
      <div className=" flex flex-col ">
        <div className="relative aspect-square h-[200px] w-[200px] rounded-md border sm:h-[300px] sm:w-[300px] ">
          <Image
            className="aspect-square rounded-md object-cover "
            alt="img"
            fill
            src={product.imageArrUrl[imgIndex]}
          />
        </div>
        <div className="mt-2 grid cursor-pointer grid-cols-3">
          {product.imageArrUrl.map((image: string, idx: number) => (
            <div
              onClick={() => setImgIndex(idx)}
              key={idx}
              className={cn(
                'relative aspect-square h-[65px]   w-[65px] rounded-md  border transition sm:h-[100px] sm:w-[100px] ',
                {
                  'border-2 border-black': idx === imgIndex,
                },
              )}
            >
              <Image
                className="aspect-square rounded-md object-cover p-1"
                alt="img"
                fill
                src={image}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="space-y-2 pb-2 text-left">
          <h1 className="text-xl font-bold sm:text-4xl">{product.name}</h1>
          <p className="mt-1 font-semibold sm:text-base">
            {formatPrice(product.price)}
          </p>
          <div className="flex ">
            <StarRating productId={product.id} />
          </div>
          <div className="flex gap-x-1">
            <ActionTooltip label="Рейтинг" sideOffset={3}>
              <div className="flex w-max items-center rounded-full  p-2 hover:cursor-default hover:bg-zinc-100">
                <Star
                  size={20}
                  className="text-amber-500 text-muted-foreground "
                />
                <span className="ml-1">{product.ratingValue}</span>
              </div>
            </ActionTooltip>
            <ActionTooltip label="Перегляди" sideOffset={3}>
              <div className="flex w-max items-center rounded-full  p-2 hover:cursor-default hover:bg-zinc-100">
                <Eye size={20} className="text-muted-foreground  " />
                <span className="ml-1">{product.view}</span>
              </div>
            </ActionTooltip>
          </div>
        </div>

        <Separator />
        <p className="break-words py-2 text-left text-muted-foreground">
          {product.description}
        </p>
        <AddToCartButton
          classname="sm:scale-100 scale-90"
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </section>
  );
};
