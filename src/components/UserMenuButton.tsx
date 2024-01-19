'use client';

import {
  ArrowLeftOnRectangleIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { Session } from 'next-auth';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useTransition } from 'react';
import { toast } from 'react-hot-toast';

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
      <div className="dropdown-end dropdown ">
        <label tabIndex={0} className="btn-ghost btn-circle avatar btn ">
          <div className="flex h-9 w-9 items-center justify-center rounded-full text-center ">
            {user ? (
              <Image
                src={user?.image || ''}
                alt="avatar image"
                height={50}
                width={50}
                className="rounded-full"
              />
            ) : (
              <UserCircleIcon className="h-9 w-9 text-gray-500" />
            )}

            {/* <img src='/images/stock/photo-1534528741775-53994a69daeb.jpg' /> */}
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box menu-sm z-[1] mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <Link href="/dashboard">
              <WrenchScrewdriverIcon className="h-5 w-5 text-gray-500" />{' '}
              Dashboard
            </Link>
          </li>
          <li>
            {user ? (
              <button onClick={handleSingOut}>
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-500" />{' '}
                Sign Out{' '}
                {isPending && (
                  <span className="loading loading-spinner loading-sm" />
                )}
              </button>
            ) : (
              <button onClick={handleSignIn}>
                Login{' '}
                {isPending && (
                  <span className="loading loading-spinner loading-sm" />
                )}
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};
