'use client';

import { useFavoriteStore } from '@/lib/store/favorite-store';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';
import { HeartIcon, Star } from 'lucide-react';
import React from 'react';

import { Button } from './ui/button';

interface FavoriteIconButton {
  product: Product;
}

export const FavoriteIconButton = ({ product }: FavoriteIconButton) => {
  const { addFavoriteProduct, favoriteProducts, removeFavoriteProduct } =
  useFavoriteStore();

  const isFavoriteExist = favoriteProducts.some(
    (favorite) => favorite.id === product.id,
  );
  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    // const isFavoriteExist = favoriteProducts.some(
    //   (favorite) => favorite.id === product.id
    // );
    if (!isFavoriteExist) {
      addFavoriteProduct(product);
    } else {
      removeFavoriteProduct(product.id);
    }
  };
  return (
    <Button
      onClick={onClick}
      className={cn(
        'absolute right-2 top-2 h-8 w-8 rounded-full text-rose-500   md:h-9 md:w-9',
        {
          'bg-rose-500 hover:bg-rose-400 hover:text-red-400': isFavoriteExist,
        },
      )}
      variant={'secondary'}
      size={'icon'}
    >
      <HeartIcon
        className={cn('h-[18px] w-[18px] md:h-[22px] md:w-[22px] ', {
          'fill-white ': isFavoriteExist,
        })}
        strokeWidth={isFavoriteExist ? 1.4 : 2.1}
      />
    </Button>
  );
};
