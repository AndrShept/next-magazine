'use client';
import { Product } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { PriceTag } from './PriceTag';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { AddToCartButton } from './AddToCartButton';
import { incrementProductQuantity } from '@/app/products/[id]/actions';
import { useRouter } from 'next/navigation';
import { FavoriteIconButton } from './FavoriteIconButton';

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
          className='static overflow-hidden group'
          key={product.id}
          onClick={() =>
            router.push(`/products/${product.id}`, {
              scroll: true,
            })
          }
        >
          <div className='rounded-xl group    cursor-pointer grid grid-rows-4 hover:shadow-md transition md:h-[300px] md:w-[240px] sm:h-[260px] sm:w-[200px] h-[230px] w-[160px] border  '>
            <div className='relative w-full h-full row-span-2 overflow-hidden rounded-t-xl'>
              <Image
                className='object-cover transition duration-300 scale-100 border group-hover:scale-105 rounded-t-xl'
                alt='img'
                fill
                src={product.imageUrl}
              />
              <FavoriteIconButton product={product} />
            </div>
            <div className='flex flex-col justify-between p-2 '>
              <div className='flex items-start justify-between '>
                <h2 className='text-sm font-semibold md:text-lg '>
                  {product.name}
                  {product.isLeaf && (
                    <h3 className='text-sm font-normal text-green-600'>
                      (листок)
                    </h3>
                  )}
                </h2>
                {/* {Date.now() - new Date(product.createdAt).getTime() <
                    1000 * 60 * 60 * 24 * 7 && (
                    <div className='font-semibold text-muted'>NEW!</div>
                  )} */}
                {product.isLeaf && (
                  <div className='relative flex items-center justify-center p-1 border rounded-full sm:h-10 sm:w-10 sm:p-2 w-7 h-7'>
                    <Image
                      alt='img'
                      width={1000}
                      height={1000}
                      src={'/leaf.png'}
                    />
                  </div>
                )}
              </div>

              {/* <p className='text-muted-foreground '>{product.description}</p> */}
            </div>
            <div className='flex items-end justify-between p-2 '>
              <PriceTag price={product.price} />
              <AddToCartButton
                classname='md:h-10 md:w-10 md:p-[10px]     h-8 w-8 p-[6px]'
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
