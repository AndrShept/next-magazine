import { AllProductListDashboard } from '@/components/AllProductListDashboard';
import { prisma } from '@/lib/db/prisma';
import { Product } from '@prisma/client';
import React from 'react';

const page = async () => {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return (
    <div className="space-2  mx-auto h-full max-w-3xl ">
      <AllProductListDashboard products={products} />
    </div>
  );
};

export default page;
