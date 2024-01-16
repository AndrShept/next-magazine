'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AddToCartButton } from '@/components/AddToCartButton';
import { incrementProductQuantity } from '@/app/products/[id]/actions';
import { Product, Rating } from '@prisma/client';
import { formatPrice } from '@/lib/format';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { StarRating } from './StarRating';
import { Eye, Star, StarHalf } from 'lucide-react';
import { ActionTooltip } from './ActionTooltip';

export const ProductById = ({
  product,
  ratingArr,
}: {
  product: Product;
  ratingArr: Rating[];
}) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isMount, setIsMount] = useState(false);
  useEffect(() => {
    setIsMount(true);

    window.scroll(0, 0);
  }, []);

  if (!isMount) return null;

  return (
    <section className=' py-8 border-y-[1px] mx-auto max-w-3xl rounded-md  flex justify-center   sm:gap-8 gap-4   mt-14'>
      <div className=' flex flex-col '>
        <div className='relative rounded-md sm:h-[300px] border sm:w-[300px] h-[200px] w-[200px] aspect-square '>
          <Image
            className='aspect-square object-cover rounded-md '
            alt='img'
            fill
            src={product.imageArrUrl[imgIndex]}
          />
        </div>
        <div className='grid grid-cols-3 mt-2 cursor-pointer'>
          {product.imageArrUrl.map((image: string, idx: number) => (
            <div
              onClick={() => setImgIndex(idx)}
              key={idx}
              className={cn(
                'relative border transition   rounded-md sm:h-[100px]  sm:w-[100px] h-[65px] w-[65px] aspect-square ',
                {
                  'border-2 border-black': idx === imgIndex,
                }
              )}
            >
              <Image
                className='aspect-square object-cover rounded-md p-1'
                alt='img'
                fill
                src={image}
              />
            </div>
          ))}
        </div>
      </div>
      <div className=''>
        <div className='text-left pb-2 space-y-2'>
          <h1 className='sm:text-4xl text-xl font-bold'>{product.name}</h1>
          <p className='sm:text-base mt-1 font-semibold'>
            {formatPrice(product.price)}
          </p>
          <div className='flex '>
            <StarRating productId={product.id} />
          </div>
          <div className='flex gap-x-1'>
            <ActionTooltip label='Рейтинг' sideOffset={3}>
              <div className='flex w-max items-center p-2  hover:cursor-default hover:bg-zinc-100 rounded-full'>
                <Star
                  size={20}
                  className='text-muted-foreground text-amber-500 '
                />
                <span className='ml-1'>{product.ratingValue}</span>
              </div>
            </ActionTooltip>
            <ActionTooltip label='Перегляди' sideOffset={3}>
              <div className='flex w-max items-center p-2  hover:cursor-default hover:bg-zinc-100 rounded-full'>
                <Eye size={20} className='text-muted-foreground  ' />
                <span className='ml-1'>{product.view}</span>
              </div>
            </ActionTooltip>
          </div>
        </div>

        <Separator />
        <p className='text-left break-words text-muted-foreground py-2'>
          {product.description}
        </p>
        <AddToCartButton
          classname='sm:scale-100 scale-90'
          productId={product.id}
          incrementProductQuantity={incrementProductQuantity}
        />
      </div>
    </section>
  );
};
