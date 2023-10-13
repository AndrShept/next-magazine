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
          onClick={() => router.push(`/products/${product.id}`,{scroll: false})}
          
        >
          <div className='rounded-xl  cursor-pointer flex flex-col hover:shadow-md transition md:h-[300px] h-[280px] md:w-[240px] max-w-sm border  '>
            <div className='overflow-hidden  rounded-t-xl   relative h-[50%] w-full'>
              <Image
                className='hover:scale-105 scale-100 rounded-t-xl border transition    object-cover'
                alt='img'
                fill
                src={product.imageUrl}
              />
            </div>
            <div className='xs:p-3 p-2 '>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold truncate'>
                  {product.name}
                </h2>
                {Date.now() - new Date(product.createdAt).getTime() <
                  1000 * 60 * 60 * 24 * 7 && (
                  <div className='font-semibold text-muted'>NEW!</div>
                )}
              </div>

              <p className='text-muted-foreground mt-2'>
                {product.description}
              </p>
            </div>
            <div className='xs:p-3 p-2 mt-auto flex justify-between items-center '>
              <PriceTag price={product.price} />
              <AddToCartButton
                classname='h-10 w-10 p-[10px]'
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
