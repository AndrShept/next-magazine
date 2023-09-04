'use client';
import { Product } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { PriceTag } from './PriceTag';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
  products: Product[];
}

export const ProductCard = ({ products }: ProductCardProps) => {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => setIsMount(true), []);
  if (!isMount) return null;
  return (
    <>
      <AnimatePresence >
        {products.map((product, i) => (
          <motion.div
            initial={{ opacity: 0,  }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            exit={{ opacity: 0 }}
            className='card  group max-w-sm bg-base-100 hover:shadow-xl transition-shadow  duration-200 static border border-zinc-200'
            key={product.id}
          >
            <Link href={'/products/' + product.id} className='   '>
              <figure className='flex items-center justify-center  rounded-t-xl '>
                <Image
                  blurDataURL={product.imageUrl}
                  placeholder='blur'
                  src={product.imageUrl}
                  alt={product.imageUrl}
                  className=' object-cover h-48 group-hover:scale-105 duration-300'
                  width={800}
                  height={400}
                />
              </figure>

              <div className='card-body'>
                <h2 className='card-title'>{product.name}</h2>
                {Date.now() - new Date(product.createdAt).getTime() <
                  1000 * 60 * 60 * 24 * 7 && (
                  <div className='badge badge-secondary'>NEW</div>
                )}
                <p>{product.description}</p>
                <PriceTag price={product.price} />
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};
