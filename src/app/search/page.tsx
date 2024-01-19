import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import React from 'react';

interface SearchPageProps {
  searchParams: { searchQuery: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    where: {
      OR: [
        { name: { contains: searchParams.searchQuery, mode: 'insensitive' } },
        // { description: { contains: searchParams.searchQuery , mode: 'insensitive'  } },
      ],
    },
  });

  if (!products.length) {
    return (
      <h1 className="text-center text-4xl font-medium">No product found</h1>
    );
  }
  return (
    <>
      <div className=" mx-auto my-4   grid max-w-md grid-cols-1 gap-6 md:max-w-full md:grid-cols-2 lg:grid-cols-3">
        <ProductCard products={products} />
      </div>
    </>
  );
};

export default SearchPage;
