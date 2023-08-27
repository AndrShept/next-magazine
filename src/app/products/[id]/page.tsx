import { ProductById } from '@/components/ProductById';
import { prisma } from '@/lib/db/prisma';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

// export const getProduct = cache(
//   async ({ params }: { params: { id: string } }) => {
//     const product = await prisma.product.findUnique({
//       where: { id: params.id },
//     });
//     return product;
//   }
// );

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });
  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      images: [{ url: product?.imageUrl ?? '' }],
    },
  };
};

const ProductPageById = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });
  if (!product) notFound();
  return (
    <div className='gap-4 grid lg:grid-cols-2 grid-cols-1 bg-base-100 md:p-8 p-4 rounded-lg'>
      <ProductById product={product} />
    </div>
  );
};

export default ProductPageById;
