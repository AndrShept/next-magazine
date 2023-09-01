'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { AddToCartButton } from '@/components/AddToCartButton';
import { PriceTag } from '@/components/PriceTag';
import { incrementProductQuantity } from '@/app/products/[id]/actions';
import { Product } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { GallerySwiper } from './GallerySwiper';

export const ProductById = ({ product }: { product: Product }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [isMount, setIsMount] = useState(false);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  if (!isMount) return null;

  return (
    <>
      <div>
        <div className='relative   group md:max-w-[600px] md:h-[400px] max-w-[600px] h-[300px] shadow-lg'>
          <Image
            src={product.imageArrUrl[imgIndex]}
            alt={product.name}
            fill
            className=' object-cover '
            priority
          />

          <div
            onClick={() => setIsShow(true)}
            className='inset-0 bg-black/50 z-10  transition-all absolute   group-hover:flex hidden items-center justify-center cursor-pointer'
          >
            <div className='flex flex-col items-center justify-center'>
              <Search size={40} className='text-gray-300' />
              <p className='text-gray-300'>Click</p>
            </div>
          </div>
        </div>
        <div className='grid gap-1 my-4 grid-cols-3 md:max-w-[600px] border-2 border-transparent max-w-[600px] '>
          {product.imageArrUrl.map((itemImg, idx) => (
            <div
              onClick={() => setImgIndex(idx)}
              key={itemImg}
              className={cn(`relative max-w-60  h-[100px] cursor-pointer  `, {
                'border-2 border-pink-400  ': idx === imgIndex,
              })}
            >
              <Image
                className=' object-cover p-1'
                fill
                alt='img'
                src={itemImg}
              />
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col'>
        <div>
          <h1 className='sm:text-5xl text-4xl font-bold  text-black/80'>
            {product.name}{' '}
          </h1>
          <p className='py-6 text-gray-600 md:text-base text-sm'>{product.description}</p>
          <div className='flex justify-between items-center'>
            <PriceTag price={product.price} />
            <AddToCartButton
              incrementProductQuantity={incrementProductQuantity}
              productId={product.id}
            />
          </div>
        </div>
      </div>

      {/* Modal gallery */}
      {isShow && (
        <div
          onClick={() => setIsShow(false)}
          className='fixed p-4 animate-in fade-in-0  duration-500 z-50 inset-0 bg-black/50 flex justify-center mx-auto items-center'
        >
          <GallerySwiper imageArrUrl={product.imageArrUrl} />
        </div>
      )}
      {/* Modal gallery */}
    </>
  );
};
