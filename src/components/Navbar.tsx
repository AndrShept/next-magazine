import React from 'react';
import Link from 'next/link';
import { getCart } from '@/lib/db/cart';
import { ShoppingCartButton } from './ShoppingCartButton';
import { UserMenuButton } from './UserMenuButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Image from 'next/image';
import { Home, Wrench } from 'lucide-react';
import { SheetSidebar } from './SheetSidebar';
import { cn } from '@/lib/utils';
import { NavList } from './NavList';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { SearchForm } from './SearchForm';
import { Button } from './ui/button';

export const Navbar = async () => {
  const cart = await getCart();
  const session = await getServerSession(authOptions);
  return (
    <header className=' drop-shadow-sm border-b sticky top-0  z-50 '>
      <div className='navbar bg-base-100  container justify-between max-w-7xl mx-auto min-w-[300px]  '>
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

            <div className='flex flex-col text-base font-normal leading-5 ml-2'></div>
          </Link>
          <SheetSidebar />

          <Link
            className='p-2 hover:bg-secondary rounded-full cursor-pointer duration-150 md:hidden block tooltip tooltip-bottom'
            data-tip={'На головну'}
            href='/'
          >
            <Home
              size={22}
              strokeWidth={1.5}
              className='text-muted-foreground'
            />
          </Link>
        </div>
        <SearchForm />

        <div>
          <NavList />

          <ShoppingCartButton cart={cart} />

          <Button asChild variant={'ghost'} size={'icon'} className='rounded-full text-muted-foreground'>
            <Link
              className=''
              href='/dashboard'
            >
             <Wrench size={22} />
            </Link>
          </Button>

          {/* <UserMenuButton session={session!} /> */}
        </div>
      </div>
    </header>
  );
};
