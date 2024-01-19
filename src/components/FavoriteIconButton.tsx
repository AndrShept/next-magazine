'use client';

import { useFavorite } from '@/lib/store/favorite-store';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';
import { Star } from 'lucide-react';
import React from 'react';

import { Button } from './ui/button';

interface FavoriteIconButton {
  product: Product;
}

export const FavoriteIconButton = ({ product }: FavoriteIconButton) => {
  const { addFavoriteProduct, favoriteProducts, removeFavoriteProduct } =
    useFavorite();

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
        'absolute right-2 top-2 h-8 w-8 rounded-full text-yellow-500   md:h-10 md:w-10',
        {
          'bg-yellow-500 hover:bg-yellow-400': isFavoriteExist,
        },
      )}
      variant={'secondary'}
      size={'icon'}
    >
      <Star
        className={cn('h-5 w-6 md:h-[22px] md:w-[22px] ', {
          'fill-white text-white ': isFavoriteExist,
        })}
        strokeWidth={isFavoriteExist ? 1.4 : 2}
      />
    </Button>
  );
};
