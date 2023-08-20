import { FormSubmitButton } from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { AddProductFrom } from '@/components/AddProductFrom';

export const metadata = {
  title: 'Add Product',
  description: 'add your product',
};

const AddProductPage = async () => {
  const categories = await prisma.category.findMany();

  const session = await getServerSession(authOptions);

  if (session?.user?.email !== 'lolokos1986@gmail.com') {
    redirect('/api/auth/signin?callbackUrl');
  }
  return <AddProductFrom categories={categories} />;
};

export default AddProductPage;
