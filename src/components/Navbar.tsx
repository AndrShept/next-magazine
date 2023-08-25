import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCart } from '@/lib/db/cart';
import { ShoppingCartButton } from './ShoppingCartButton';
import { UserMenuButton } from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import { Flower } from 'lucide-react';

export const searchProducts = async (formData: FormData) => {
  'use server';
  const searchQuery = formData.get('searchQuery')?.toString();
  if (searchQuery) {
    redirect(`/search?query=${searchQuery}`);
  }
  console.log(searchQuery);
};

export const Navbar = async () => {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  return (
    <div className='bg-base-100 drop-shadow-sm border-b fixed top-0 w-full z-50 '>
      <div className='navbar bg-base-100 p-4 container max-w-7xl mx-auto min-w-[300px]  '>
        <div className='flex-1'>
          <Link
            href='/'
            className=' text-4xl text-pink-600 items-center  hover:text-pink-700 duration-200 sm:flex hidden'
          >
            {/* <Image priority src={'/logo.png'} height={60} width={60} alt='logo'/> */}

            {/* <Flower size={50} strokeWidth={1.4} /> */}
            <Image
              className='h-11 w-11 '
              width={500}
              height={500}
              alt='logo'
              src={'https://cdn-icons-png.flaticon.com/128/8312/8312499.png'}
            />
            
            <div className='flex flex-col text-base font-normal leading-5 ml-2'>
              <span>Оскана</span>
              <span>Фіалки</span>
            </div>
          </Link>
        </div>
        <div className=' '>
          <form action={searchProducts}>
            <div className='form-control pr-2 md:pr-4 '>
              <input
                placeholder='search'
                name='searchQuery'
                type='text'
                className='input input-bordered w-full min-w-[50px]'
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session!} />
        </div>
        <div className='flex-none'></div>
      </div>
    </div>
  );
};
