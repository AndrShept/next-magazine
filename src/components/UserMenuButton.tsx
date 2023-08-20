'use client';
import { Session } from 'next-auth';
import React, { useState, useTransition } from 'react';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { signIn, signOut, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import {
  ArrowLeftOnRectangleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface UserMenuButtonProps {
  session: Session;
}

export const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  const user = session?.user;
  const [isPending, startTransition] = useTransition();
  const handleSignIn = () => {
    startTransition(async () => {
      await signIn('google');
      toast.success('Login Success');
    });
  };

  const handleSingOut = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: '/' });
    });
  };

  return (
    <div>
      <div className='dropdown dropdown-end '>
        <label tabIndex={0} className='btn btn-ghost btn-circle avatar '>
          <div className='w-9 h-9 rounded-full text-center flex items-center justify-center '>
            {user ? (
              <Image
                src={user?.image || ''}
                alt='avatar image'
                height={50}
                width={50}
                className='rounded-full'
              />
            ) : (
              <UserCircleIcon className='h-9 w-9 text-gray-500' />
            )}

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
            <Link href='/add-product'>
              <WrenchScrewdriverIcon className='h-5 w-5 text-gray-500' />{' '}
              Settings
            </Link>
          </li>
          <li>
            {user ? (
              <button onClick={handleSingOut}>
                <ArrowLeftOnRectangleIcon className='h-5 w-5 text-gray-500' />{' '}
                Sign Out{' '}
                {isPending && (
                  <span className='loading loading-spinner loading-sm' />
                )}
              </button>
            ) : (
              <button onClick={handleSignIn}>
                Login{' '}
                {isPending && (
                  <span className='loading loading-spinner loading-sm' />
                )}
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
