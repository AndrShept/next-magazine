import { Product } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { PriceTag } from './PriceTag';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      href={'/products/' + product.id}
      className='card   w-full bg-base-100 hover:shadow-xl transition-shadow group duration-200 static'
    >
      <figure className='flex items-center justify-center  '>
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
        {isNew && <div className='badge badge-secondary'>NEW</div>}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
};
