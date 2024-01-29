import { SearchParamsProps } from '@/app/page';
import { prisma } from '@/lib/db/prisma';
import React from 'react';

import { ProductCard } from '../ProductCard';

export const ProductList = async ({ searchParams }: SearchParamsProps) => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  const products = await prisma.product.findMany({
    where: {
      categoryId:
        searchParams.categoryId === 'all' ? undefined : searchParams.categoryId,
      status: 'active',
      isLeaf: searchParams.isFilteredLeaf === 'true' ? true : undefined,
      OR: searchParams.searchValue
        ? [
            {
              name: { contains: searchParams.searchValue, mode: 'insensitive' },
            },
          ]
        : undefined,
    },
    //@ts-ignore
    orderBy:
      searchParams.filter === 'price'
        ? { price: searchParams.sortDirection }
        : { ratingValue: searchParams.sortDirection },
    // skip: (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItem),
    // take: pageSize + (currentPage === 1 ? heroItem : 0),
  });

  return (
    <>
      {products.length ? (
        <div className="mx-auto my-4 grid max-w-md grid-cols-2 gap-6 md:max-w-full md:grid-cols-3 md:gap-6 lg:grid-cols-4 xl:grid-cols-4">
          <ProductCard products={products} />
        </div>
      ) : (
        <h1 className="mt-20 text-center text-3xl text-gray-400">
          Нічого не знайдено
        </h1>
      )}
    </>
  );
};
