import { FormSubmitButton } from '@/components/FormSubmitButton';
import { prisma } from '@/lib/db/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Add Product',
  description: 'add your product',
};
const addProduct = async (formData: FormData) => {
  'use server';
  const name = formData.get('name')!.toString();
  const description = formData.get('description')!.toString();
  const imageUrl = formData.get('imageUrl')!.toString();
  const price = Number(formData.get('price') || 0);

  if (!name && !description && !imageUrl && !price) {
    throw Error('Missing required fields');
  }

  await prisma.product.create({
    data: { name, description, imageUrl, price },
  });

  redirect('http://localhost:3000/add-product');
};

const AddProductPage =  async () => {


  const session = await getServerSession(authOptions);
  console.log(session)

  if (session?.user?.email !== 'lolokos1986@gmail.com') {
    redirect('/api/auth/signin?callbackUrl');
  }
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
        <FormSubmitButton className='mt-4 w-full'>Add Product</FormSubmitButton>
      </form>
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
	<div className="relative py-3 sm:max-w-xl sm:mx-auto">
		<div
			className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
		</div>
		<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
			<div className="max-w-md mx-auto">
				<div>
					<h1 className="text-2xl font-semibold">Login Form with Floating Labels</h1>
				</div>
				<div className="divide-y divide-gray-200">
					<div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
						<div className="relative">
							<input autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
							<label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text">Email Address</label>
						</div>
						<div className="relative">
							<input autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
							<label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm cursor-text">Password</label>
						</div>
						<div className="relative">
							<button className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
    </div>
  );
};

export default AddProductPage;
