import { AddToCartButton } from '@/components/AddToCartButton';
import { ProductById } from '@/components/ProductById';
import { prisma } from '@/lib/db/prisma';
import { useView } from '@/lib/store/view-store';
import { Metadata } from 'next';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import React from 'react';

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
  const setView = useView.getState().setView;
  const view = useView.getState().view;
  const findView = view.find((item) => item.productId === params.id);
  if (!findView) {
    await prisma.product.update({
      where: { id: params.id },
      data: { view: { increment: 1 } },
    });
    revalidatePath('/product/[id]');

    setView({ productId: params.id });
  }

  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });
  if (!product) notFound();

  return <ProductById product={product} />;
};

export default ProductPageById;
