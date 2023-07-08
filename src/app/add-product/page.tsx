import { FormSubmitButton } from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import React from 'react';

export const metadata = {
  title: 'Add Product',
  description: 'add your product',
};
const addProduct = async (formData: FormData) => {
  'use server';

  const name = formData.get('name')?.toString();
  const description = formData.get('description')?.toString();
  const imageUrl = formData.get('imageUrl')?.toString();
  const price = Number(formData.get('price') || 0);

  if (!name || !description || !imageUrl || !price) {
    throw Error('Missing required fields');
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });
  redirect('http://localhost:3000/add-product')
  


 
   
  
};

const AddProductPage = () => {


  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-xl font-bold mb-4'>Add Product</h1>
      <form action={addProduct} className='max-w-2xl '>
        <input
          required
          name='name'
          type='text'
          placeholder='Name'
          className='input input-bordered w-full mt-4 '
        />
        <textarea
          required
          name='description'
          placeholder='description'
          className='textarea-bordered textarea w-full mt-4 '
        />
        <input
          required
          name='imageUrl'
          type='url'
          placeholder='image Url'
          className='input input-bordered w-full mt-4 '
        />
        <input
          required
          name='price'
          type='number'
          placeholder='Price'
          className='input input-bordered w-full mt-4 '
        />
        <FormSubmitButton  className='mt-4 w-full'>
          Add Product
        </FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;
