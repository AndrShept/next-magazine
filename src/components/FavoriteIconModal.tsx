'use client';
import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Star, X } from 'lucide-react';
import { Button } from './ui/button';
import { ActionTooltip } from './ActionTooltip';
import { useFavorite } from '@/lib/store/favorite-store';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { format } from 'util';
import { formatPrice } from '@/lib/format';

export const FavoriteIconModal = () => {
  const [isMount, setIsMount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { favoriteProducts, clearAllFavoriteProduct, removeFavoriteProduct } =
    useFavorite();

  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) return null;
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <ActionTooltip label='Favorite'>
          <Button
            className=' text-muted-foreground'
            variant={'ghost'}
            size={'icon'}
          >
            <Star /> {favoriteProducts.length}
          </Button>
        </ActionTooltip>
      </PopoverTrigger>
      <PopoverContent className='w-[500px]'>
        <ScrollArea className='h-full'>
          {favoriteProducts.length > 0 && (
            <ul className='flex flex-col gap-1 overflow-x-auto '>
              {favoriteProducts.map((product) => (
                <div
                  className='flex items-center hover:bg-zinc-50  p-2'
                  key={product.id}
                >
                  <div className='flex flex-1 items-center '>
                    <div className='relative cursor-pointer rounded-md h-20 w-32 shadow'>
                      <Image
                        onClick={() => {
                          router.push(`/products/${product.id}`);
                          setIsOpen(false);
                        }}
                        className='object-cover rounded-md border  '
                        fill
                        src={product.imageUrl}
                        alt='image'
                      />
                    </div>
                    <span
                      onClick={() => {
                        router.push(`/products/${product.id}`);
                        setIsOpen(false);
                      }}
                      className='ml-2 text-muted-foreground hover:underline cursor-pointer'
                    >
                      {product.name}
                    </span>
                  </div>
                  <span className='mr-2 font-semibold'>
                    {formatPrice(product.price)}
                  </span>

                  <Button
                    onClick={() => removeFavoriteProduct(product.id)}
                    className='text-muted-foreground rounded-full'
                    variant={'ghost'}
                    size={'icon'}
                  >
                    <X />
                  </Button>
                </div>
              ))}
              <Button className='mt-6' onClick={clearAllFavoriteProduct}>
                Очистити список улюблених
              </Button>
            </ul>
          )}
          {favoriteProducts.length === 0 && (
            <p className='text-center font-semibold'>Добавте щось в улюблені</p>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
