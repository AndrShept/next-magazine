import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';

interface CategoriesProps {
  categories: Category[];
  categoryId: string;
}

export const Categories = ({ categories, categoryId }: CategoriesProps) => {
  return (
    <div className='mx-auto flex   gap-2 mb-8  justify-center items-center flex-wrap  '>
      <Button
        asChild
        variant={'outline'}
        className={cn(` capitalize  rounded-full text-black/70 drop-shadow-sm  `, {
          'bg-pink-400 text-white hover:bg-bg-pink-400 hover:text-white':
            !categoryId,
        })}
      >
        <Link href={`/`} scroll={false}>Все</Link>
      </Button>
      {categories.map((category) => (
        <Button
          asChild
          variant={'outline'}
          key={category.id}
          className={cn(` capitalize  rounded-full text-black/70 drop-shadow-sm    `, {
            'bg-pink-400 text-white hover:bg-bg-pink-400 hover:text-white':
              category.id === categoryId,
          })}
        >
          <Link href={`/?categoryId=${category.id}`}>{category.name}</Link>
        </Button>
      ))}
    </div>
  );
};
