import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import { ShoppingCartButton } from './ShoppingCartButton';

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
  return (
    <div className='bg-base-100 drop-shadow-sm border-b '>
      <div className='navbar bg-base-100 p-4 container max-w-7xl mx-auto min-w-[300px] '>
        <div className='flex-1'>
          <Link
            href='/'
            className='normal-case text-xl font-bold hover:text-secondary duration-200'
          >
            MAGAZINE
          </Link>
        </div>
        <div className='flex-none gap-2'>
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
        </div>
        <div className='flex-none'>

          <div className='dropdown dropdown-end '>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar '>
              <div className='w-10 rounded-full  '>
                <UserCircleIcon className='h-10 w-10 text-gray-500' />
                {/* <img src='/images/stock/photo-1534528741775-53994a69daeb.jpg' /> */}
              </div>
            </label>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <a className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
