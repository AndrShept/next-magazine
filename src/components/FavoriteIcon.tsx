'use client';
import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { ActionTooltip } from './ActionTooltip';
import { useFavorite } from '@/lib/store/favorite-store';

export const FavoriteIcon = () => {
  const [isMount, setIsMount] = useState(false);
  const { favoriteProducts } = useFavorite();

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) return null;
  return (
    <Popover>
      <PopoverTrigger>
        <ActionTooltip label='Favorite'>
          <Button
            className=' text-muted-foreground'
            variant={'ghost'}
            size={'icon'}
          >
            <Star />
          </Button>
        </ActionTooltip>
      </PopoverTrigger>
      <PopoverContent>
        {favoriteProducts.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
