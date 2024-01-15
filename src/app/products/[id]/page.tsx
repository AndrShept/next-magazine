import { AddToCartButton } from '@/components/AddToCartButton';

import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/db/prisma';
import { formatPrice } from '@/lib/format';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';
import { ProductById } from '@/components/ProductById';

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
  await prisma.product.update({
    where: { id: params.id },
    data: { view: { increment: 1 } },
  });
  const rating = await prisma.rating.findMany()

  return <ProductById product={product} ratingArr={rating} />;
};

export default ProductPageById;
