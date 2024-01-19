'use client';
import React, { useEffect, useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import { Button } from './ui/button';
import { ActionTooltip } from './ActionTooltip';
import { useFavoriteStore } from '@/lib/store/favorite-store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/lib/format';
import { Indicator } from './Indicator';
import { cn } from '@/lib/utils';

export const FavoriteModal = () => {
  const [isMount, setIsMount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const {
    favoriteProducts,
    clearAllFavoriteProduct,
    removeFavoriteProduct,
    page,
    itemsPerPage,
    decrementPage,
    incrementPage,
  } = useFavoriteStore();
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPage = Math.ceil(favoriteProducts.length / itemsPerPage);
  useEffect(() => {
    if (favoriteProducts.length % itemsPerPage === 0 && page !== 1) {
      decrementPage();
    }
  }, [decrementPage, favoriteProducts.length, itemsPerPage, page]);
  useEffect(() => {
    setIsMount(true);
  }, []);
  if (!isMount) return null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <ActionTooltip label='Favorite'>
          <Button
            className=' text-muted-foreground relative'
            variant={'ghost'}
            size={'icon'}
          >
            <Star />
            {favoriteProducts.length > 0 && (
              <Indicator number={favoriteProducts.length} />
            )}
          </Button>
        </ActionTooltip>
      </PopoverTrigger>
      <PopoverContent
        className={cn('sm:w-[500px]  min-h-[200px]  ', {
          ' w-min': favoriteProducts.length > 0,
        })}
      >
        {!!favoriteProducts.length && (
          <ul className='flex flex-col gap-1  '>
            {favoriteProducts.slice(startIndex, endIndex).map((product) => (
              <li
                className='flex items-center hover:bg-zinc-50  p-2'
                key={product.id}
              >
                <div className='flex flex-1 items-center '>
                  <div className='relative cursor-pointer rounded-md sm:h-20 sm:w-32 h-16 w-28  shadow'>
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
                    className='ml-2 flex-1  text-muted-foreground hover:underline cursor-pointer'
                  >
                    {product.name}
                  </span>
                </div>
                <span className='px-2 font-semibold sm:mr-4 '>
                  {formatPrice(product.price)}
                </span>

                <Button
                  onClick={() => removeFavoriteProduct(product.id)}
                  className='text-muted-foreground rounded-full sm:h-10 sm:w-10 h-8 w-8 '
                  variant={'ghost'}
                  size={'icon'}
                >
                  <X size={20} />
                </Button>
              </li>
            ))}
            {favoriteProducts.length > itemsPerPage && (
              <div className='flex items-center gap-x-2 mx-auto'>
                <Button
                  onClick={decrementPage}
                  disabled={page === 1}
                  variant={'ghost'}
                  size={'icon'}
                  className='rounded-full h-8 w-8 p-1'
                >
                  <ChevronLeft />
                </Button>
                <span className='text-muted-foreground'>{page}</span>
                <Button
                  disabled={totalPage === page}
                  onClick={totalPage === page ? () => {} : incrementPage}
                  variant={'ghost'}
                  size={'icon'}
                  className='rounded-full h-8 w-8 p-1'
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
            <Button className='mt-4 ' onClick={clearAllFavoriteProduct}>
              Очистити список улюблених
            </Button>
          </ul>
        )}

        {favoriteProducts.length === 0 && (
          <p className='text-center font-semibold text-muted-foreground mt-14 '>
            Добавте щось в улюблені
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
};
