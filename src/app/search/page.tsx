import { ProductCard } from '@/components/ProductCard';
import { prisma } from '@/lib/db/prisma';
import React from 'react';

interface SearchPageProps {
  searchParams: { query: string };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
    where: {
      OR: [
        { name: { contains: searchParams.query , mode: 'insensitive'  } },
        { description: { contains: searchParams.query , mode: 'insensitive'  } },
       
      ],
      
      
    },
    

  });

  if (!products.length){
    return <h1 className='text-4xl font-medium text-center'>No product found</h1>
  }
  return (
    <>
      <div className=' grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 my-4 gap-6 md:max-w-full max-w-md mx-auto'>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default SearchPage;
