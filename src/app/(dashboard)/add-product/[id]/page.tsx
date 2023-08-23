import { FormSubmitButton } from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { AddProductFrom } from '@/components/AddProductFrom';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Add Product',
  description: 'add your product',
};

const AddProductPage = async ({ params }: { params: { id: string } }) => {
  const categories = await prisma.category.findMany();
  const product = params.id === 'new'? null: await prisma.product.findUnique({
    where:{id: params.id},
    

  });

  const session = await getServerSession(authOptions);

  if (session?.user?.email !== 'lolokos1986@gmail.com') {
    redirect('/api/auth/signin?callbackUrl');
  }
  return <AddProductFrom categories={categories} product={product} />;
};

export default AddProductPage;
