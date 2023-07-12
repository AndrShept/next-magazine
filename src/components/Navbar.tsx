import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import { ShoppingCartButton } from './ShoppingCartButton';
import { UserMenuButton } from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const searchProducts = async (formData: FormData) => {
  'use server';
  const searchQuery = formData.get('searchQuery')?.toString();
  if(searchQuery){
    redirect(`/search?query=${searchQuery}`)
  }
  console.log(searchQuery);
};

export const Navbar = async () => {
  const cart = await getCart()
  const product = await prisma.cartItem.findMany();
  const session = await getServerSession(authOptions)
  return (
    <div className='bg-base-100 drop-shadow-sm border-b  '>
      <div className='navbar bg-base-100 p-4 container max-w-7xl mx-auto min-w-[300px] '>
        <div className='flex-1'>
          <Link
            href='/'
            className='normal-case text-xl font-bold hover:text-secondary duration-200'
          >
            MAGAZINE
          </Link>
        </div>
        <div className='  '>
          <form action={searchProducts}>
            <div className='form-control mr-0 md:mr-4'>
              <input
                placeholder='search'
                name='searchQuery'
                type='text'
                className='input input-bordered w-full min-w-[50px]'
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart}/>
          <UserMenuButton session={session!}/>
        </div>
        <div className='flex-none'>


        </div>
      </div>
    </div>
  );
};
