import { AddToCartButton } from '@/components/AddToCartButton';
import { PriceTag } from '@/components/PriceTag';
import { prisma } from '@/lib/db/prisma';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React, { cache } from 'react';

export const getProduct = cache( async({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findUnique({where:{id: params.id}})
  return product
}) 


export const generateMetadata = async ({ params }: { params: { id: string } }):Promise<Metadata> => {

 const product =  await getProduct({params})
return {
  title : product?.name,
  description : product?.description,
  openGraph:{
    images:[{url: product?.imageUrl ?? ''}]
  }
}

};

const ProductPageById = async ({ params }: { params: { id: string } }) => {
  const product =  await getProduct({params})
  if (!product) notFound();
  return (
    <div className='flex flex-col lg:flex-row gap-4'>
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className='rounded-lg'
        priority
      />
      <div>
        <h1 className='text-5xl font-bold'>{product.name} </h1>
        <PriceTag price={product.price} />
        <p className='py-6'>{product.description}</p>
      </div>
      <AddToCartButton  productId={product.id}/>
    </div>
  );
};

export default ProductPageById;
