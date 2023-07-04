import { prisma } from '@/lib/db/prisma';
import React from 'react';

const ProductPageById = async({ params }: { params: { id: string } }) => {

  const data = await prisma.product.findFirst({where:{id: params.id}})
  console.log(data)
  return <div>{data?.imageUrl}</div>;
};

export default ProductPageById;
