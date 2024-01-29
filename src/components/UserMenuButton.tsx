'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ArrowLeftOnRectangleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { UserCircle2Icon, UserIcon } from 'lucide-react';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { toast } from 'react-hot-toast';

import { Skeleton } from './ui/skeleton';

export const UserMenuButton = () => {
  const { data: session, status } = useSession();
  const isPending = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const handleSignIn = async () => {
    await signIn('google').then(() => toast.success('Login Success'));
  };

  const handleSingOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <div className=" relative flex h-7 w-7  items-center justify-center rounded-full text-muted-foreground  sm:h-9 sm:w-9 ">
            {isAuthenticated && !isPending && (
              <Image
                src={session?.user.image || ''}
                alt="avatar image"
                fill
                className="rounded-full"
              />
            )}

            {!isAuthenticated && !isPending && (
              <UserIcon className="hover:text-primary" />
            )}

            {isPending && (
              <Skeleton className="h-7 w-7 rounded-full bg-zinc-400 sm:h-9 sm:w-9" />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-1">
          <section className=" flex cursor-pointer flex-col text-gray-500">
            <li className="flex p-2 hover:bg-zinc-100">
              <WrenchScrewdriverIcon className="mr-2 h-5 w-5 text-muted-foreground" />{' '}
              <Link href="/dashboard">Dashboard</Link>
            </li>
            {isAuthenticated && (
              <button
                disabled={isPending}
                onClick={handleSingOut}
                className="flex p-2 hover:bg-zinc-100"
              >
                <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 " />{' '}
                <span>
                  Sign Out{' '}
                  {isPending && (
                    <span className="loading loading-spinner loading-sm" />
                  )}
                </span>
              </button>
            )}
            {!isAuthenticated && (
              <button
                disabled={isPending}
                onClick={handleSignIn}
                className="flex p-2 hover:bg-zinc-100"
              >
                <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 " />{' '}
                <span>
                  login
                  {isPending && (
                    <span className="loading loading-spinner loading-sm" />
                  )}
                </span>
              </button>
            )}
          </section>
        </PopoverContent>
      </Popover>
    </>
  );
};
