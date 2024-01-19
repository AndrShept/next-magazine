import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

import { Button } from './ui/button';

interface CategoriesProps {
  categories: Category[];
  categoryId: string;
}

export const Categories = ({ categories, categoryId }: CategoriesProps) => {
  return (
    <div className="mx-auto mb-8   flex flex-wrap  items-center justify-center gap-2  ">
      <Button
        asChild
        variant={'outline'}
        className={cn(
          ` rounded-full  capitalize text-black/70 drop-shadow-sm  `,
          {
            'hover:bg-bg-pink-400 bg-pink-400 text-white hover:text-white':
              !categoryId,
          },
        )}
      >
        <Link href={`/`} scroll={false}>
          Все
        </Link>
      </Button>
      {categories.map((category) => (
        <Button
          asChild
          variant={'outline'}
          key={category.id}
          className={cn(
            ` rounded-full  capitalize text-black/70 drop-shadow-sm    `,
            {
              'hover:bg-bg-pink-400 bg-pink-400 text-white hover:text-white':
                category.id === categoryId,
            },
          )}
        >
          <Link href={`/?categoryId=${category.id}`}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
};
