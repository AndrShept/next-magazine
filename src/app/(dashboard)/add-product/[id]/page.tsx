import { FormSubmitButton } from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import React from 'react';
import { AddProductFrom } from '@/components/AddProductFrom';

export const metadata = {
  title: 'Add Product',
  description: 'add your product',
};

const AddProductPage = async ({ params }: { params: { id: string } }) => {
  const categories = await prisma.category.findMany();
  const product = params.id === 'new'? null: await prisma.product.findUnique({
    where:{id: params.id},
    

  });

  return <AddProductFrom categories={categories} product={product} />;
};

export default AddProductPage;
