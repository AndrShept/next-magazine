import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getCart } from '@/lib/db/cart';
import { cn } from '@/lib/utils';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { Home, Settings, Wrench } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { ActionTooltip } from './ActionTooltip';
import { FavoriteModal } from './FavoriteModal';
import { NavList } from './NavList';
import { SearchForm } from './SearchForm';
import { SheetSidebar } from './SheetSidebar';
import { ShoppingCartButton } from './ShoppingCartButton';
import { UserMenuButton } from './UserMenuButton';
import { Button } from './ui/button';

export const Navbar = async () => {
  const cart = await getCart();

  return (
    <header className="  mx-auto flex  h-[65px] min-w-[300px]  max-w-7xl items-center  justify-between   md:px-2  ">
      <section className=" flex items-center">
        <Link
          href="/"
          className=" hidden items-center text-4xl  text-pink-600 duration-200 hover:text-pink-700 md:flex"
        >
          <Image
            className="h-11 w-11 "
            width={500}
            height={500}
            alt="logo"
            src={'https://cdn-icons-png.flaticon.com/128/8312/8312499.png'}
          />

          <div className="ml-2 flex flex-col text-base font-normal leading-5"></div>
        </Link>
        <SheetSidebar />
        <ActionTooltip label="На головну">
          <Link
            className="block cursor-pointer rounded-full p-2 duration-150 hover:bg-secondary md:hidden"
            href="/"
          >
            <Home
              size={22}
              strokeWidth={1.5}
              className="text-muted-foreground"
            />
          </Link>
        </ActionTooltip>
      </section>

      <SearchForm />

      <section className="flex items-center">
        <NavList />

        <FavoriteModal />

        <ShoppingCartButton cart={cart} />

        <ActionTooltip label="Settings">
          <Button
            asChild
            variant={'ghost'}
            size={'icon'}
            className=" text-muted-foreground"
          >
            <Link className="" href="/dashboard">
              <Settings />
            </Link>
          </Button>
        </ActionTooltip>

        <UserMenuButton />
      </section>
    </header>
  );
};
