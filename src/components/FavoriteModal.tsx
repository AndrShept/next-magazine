'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatPrice } from '@/lib/format';
import { useFavoriteStore } from '@/lib/store/favorite-store';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { ActionTooltip } from './ActionTooltip';
import { Indicator } from './Indicator';
import { Button } from './ui/button';

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
        <ActionTooltip label="Favorite">
          <Button
            className=" relative text-muted-foreground"
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
        className={cn('min-h-[200px]  sm:w-[500px]  ', {
          ' w-min': favoriteProducts.length > 0,
        })}
      >
        {!!favoriteProducts.length && (
          <ul className="flex flex-col gap-1  ">
            {favoriteProducts.slice(startIndex, endIndex).map((product) => (
              <li
                className="flex items-center p-2  hover:bg-zinc-50"
                key={product.id}
              >
                <div className="flex flex-1 items-center ">
                  <div className="relative h-16 w-28 cursor-pointer rounded-md shadow sm:h-20  sm:w-32">
                    <Image
                      onClick={() => {
                        router.push(`/products/${product.id}`);
                        setIsOpen(false);
                      }}
                      className="rounded-md border object-cover  "
                      fill
                      src={product.imageUrl}
                      alt="image"
                    />
                  </div>
                  <span
                    onClick={() => {
                      router.push(`/products/${product.id}`);
                      setIsOpen(false);
                    }}
                    className="ml-2 flex-1  cursor-pointer text-muted-foreground hover:underline"
                  >
                    {product.name}
                  </span>
                </div>
                <span className="px-2 font-semibold sm:mr-4 ">
                  {formatPrice(product.price)}
                </span>

                <Button
                  onClick={() => removeFavoriteProduct(product.id)}
                  className="h-8 w-8 rounded-full text-muted-foreground sm:h-10 sm:w-10 "
                  variant={'ghost'}
                  size={'icon'}
                >
                  <X size={20} />
                </Button>
              </li>
            ))}
            {favoriteProducts.length > itemsPerPage && (
              <div className="mx-auto flex items-center gap-x-2">
                <Button
                  onClick={decrementPage}
                  disabled={page === 1}
                  variant={'ghost'}
                  size={'icon'}
                  className="h-8 w-8 rounded-full p-1"
                >
                  <ChevronLeft />
                </Button>
                <span className="text-muted-foreground">{page}</span>
                <Button
                  disabled={totalPage === page}
                  onClick={totalPage === page ? () => {} : incrementPage}
                  variant={'ghost'}
                  size={'icon'}
                  className="h-8 w-8 rounded-full p-1"
                >
                  <ChevronRight />
                </Button>
              </div>
            )}
            <Button className="mt-4 " onClick={clearAllFavoriteProduct}>
              Очистити список улюблених
            </Button>
          </ul>
        )}

        {favoriteProducts.length === 0 && (
          <p className="mt-14 text-center font-semibold text-muted-foreground ">
            Добавте щось в улюблені
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
};
