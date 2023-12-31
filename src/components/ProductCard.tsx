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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          // exit={{ opacity: 0 }}
          className=' overflow-hidden  group static '
          key={product.id}
          onClick={() =>
            router.push(`/products/${product.id}`, { scroll: true })
          }
        >
          <div className='rounded-xl group   cursor-pointer grid grid-rows-4 hover:shadow-md transition md:h-[300px] md:w-[240px] sm:h-[260px] sm:w-[200px] h-[230px] w-[160px] border  '>
            <div className='overflow-hidden  rounded-t-xl  relative row-span-2 h-full w-full'>
              <Image
                className='group-hover:scale-105 scale-100 rounded-t-xl border transition    object-cover'
                alt='img'
                fill
                src={product.imageUrl}
              />
            </div>
            <div className='flex flex-col justify-between p-2 '>
           
                <div className='flex justify-between items-start '>
                  <h2 className='md:text-lg text-sm font-semibold '>
                    {product.name}
                    {product.isLeaf && (
                      <h3 className='text-green-600 text-sm font-normal'>
                        (листок)
                      </h3>
                    )}
                  </h2>
                  {/* {Date.now() - new Date(product.createdAt).getTime() <
                    1000 * 60 * 60 * 24 * 7 && (
                    <div className='font-semibold text-muted'>NEW!</div>
                  )} */}
                  {product.isLeaf && (
                    <div className='relative flex items-center justify-center sm:h-10 sm:w-10 sm:p-2 w-7 h-7 p-1 border rounded-full'>
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
            <div className=' flex justify-between items-end p-2 '>
                <PriceTag price={product.price} />
                <AddToCartButton
                  classname='sm:h-10 sm:w-10 sm:p-[10px] h-8 w-8 p-[6px]'
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
