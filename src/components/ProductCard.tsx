'use client';

import { incrementProductQuantity } from '@/app/products/[id]/actions';
import { Product } from '@prisma/client';
import { motion } from 'framer-motion';
import { Eye, Star, StarHalf } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { ActionTooltip } from './ActionTooltip';
import { AddToCartButton } from './AddToCartButton';
import { FavoriteIconButton } from './FavoriteIconButton';
import { PriceTag } from './PriceTag';

interface ProductCardProps {
  products: Product[];
}

export const ProductCard = ({ products }: ProductCardProps) => {
  const [isMount, setIsMount] = useState(false);

  const router = useRouter();
  useEffect(() => setIsMount(true), []);
  if (!isMount) return null;

  return (
    <>
      {products.map((product, i) => (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1 * i,
          }}
          // exit={{ opacity: 0 }}
          className="group static overflow-hidden"
          key={product.id}
          onClick={() =>
            router.push(`/products/${product.id}`, {
              scroll: true,
            })
          }
        >
          <div className="group grid    h-[230px] w-[160px] cursor-pointer grid-rows-4 rounded-xl border transition hover:shadow-md sm:h-[260px] sm:w-[200px] md:h-[300px] md:w-[240px]  ">
            <div className="relative row-span-2 h-full w-full overflow-hidden rounded-t-xl">
              <Image
                className="scale-100 rounded-t-xl border object-cover transition duration-300 group-hover:scale-105"
                alt="img"
                fill
                src={product.imageUrl}
              />
              <FavoriteIconButton product={product} />
              <ActionTooltip label="Рейтинг" sideOffset={2}>
                <div className="absolute left-2 top-2 flex h-[26px] w-[41px] items-center justify-center rounded-full   bg-white p-1 hover:cursor-default  hover:bg-zinc-100 sm:h-[34px] sm:w-[41px]">
                  <Star
                    size={20}
                    strokeWidth={0}
                    className=" fill-amber-400   "
                  />
                  <span className="ml-[2px] text-[12px]">
                    {product.ratingValue}
                  </span>
                </div>
              </ActionTooltip>
            </div>
            <div className="flex flex-col justify-between p-2 ">
              <div className="flex items-start justify-between ">
                <h2 className="text-sm font-semibold md:text-lg ">
                  {product.name}
                  {product.isLeaf && (
                    <h3 className="text-sm font-normal text-green-600">
                      (листок)
                    </h3>
                  )}
                </h2>
                {/* {Date.now() - new Date(product.createdAt).getTime() <
                    1000 * 60 * 60 * 24 * 7 && (
                    <div className='font-semibold text-muted'>NEW!</div>
                  )} */}
                {product.isLeaf && (
                  <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full  p-1 sm:h-10 sm:w-10 sm:p-2">
                    <Image
                      alt="img"
                      width={1000}
                      height={1000}
                      src={'/leaf.png'}
                    />
                  </div>
                )}
              </div>

              {/* <p className='text-muted-foreground '>{product.description}</p> */}
            </div>
            <div className="flex items-end justify-between p-2 ">
              <PriceTag price={product.price} />

              <AddToCartButton
                classname="md:h-10 md:w-10 md:p-[10px]     h-8 w-8 p-[6px]"
                isShowText={false}
                productId={product.id}
                incrementProductQuantity={incrementProductQuantity}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};
