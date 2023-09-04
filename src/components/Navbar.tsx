import React from 'react';
import Link from 'next/link';
import { getCart } from '@/lib/db/cart';
import { ShoppingCartButton } from './ShoppingCartButton';
import { UserMenuButton } from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import { Home } from 'lucide-react';
import { SheetSidebar } from './SheetSidebar';
import { cn } from '@/lib/utils';
import { NavList } from './NavList';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { SearchForm } from './SearchForm';

export const Navbar = async () => {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  return (
    <div className='bg-base-100 drop-shadow-sm border-b fixed top-0 w-full z-50 '>
      <div className='navbar bg-base-100 p-4 container justify-between max-w-7xl mx-auto min-w-[300px]  '>
        <div className=''>
          <Link
            href='/'
            className=' text-4xl text-pink-600 items-center  hover:text-pink-700 duration-200 md:flex hidden'
          >
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
          <SheetSidebar />

          <Link
            className='p-2 hover:bg-gray-200 rounded-md cursor-pointer duration-150 md:hidden block tooltip tooltip-bottom'
            data-tip={'На головну'}
            href='/'
          >
            <Home size={26} strokeWidth={1.5} className='text-gray-700' />
          </Link>
        </div>
        <SearchForm />

        <div>
          <NavList />

          <ShoppingCartButton cart={cart} />

          <Link
            className='p-3 rounded-full hover:bg-gray-200'
            href='/dashboard'
          >
            <WrenchScrewdriverIcon className='h-5 w-5 text-gray-500' />{' '}
          </Link>

          {/* <UserMenuButton session={session!} /> */}
        </div>
      </div>
    </div>
  );
};
