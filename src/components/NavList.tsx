'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const navList = [
  { name: 'Contacts', href: '/contacts', id: Date.now() },
  { name: 'About', href: '/about', id: Date.now() },
  { name: 'Reviews', href: '/reviews', id: Date.now() },
];

export const NavList = ({ className = '' }) => {
  const pathname = usePathname();
  return (
    <nav className='mr-4'>
      <ul className=' gap-2 md:flex hidden'>
        {navList.map((nav, idx) => (
          <Link
            className={cn(
              'py-2 px-1 border-b-2 border-transparent hover:border-pink-200 text-base  ',
              {
                'border-pink-500 duration-300 hover:border-pink-500 ':
                  pathname === nav.href,
              },
              className
            )}
            key={idx}
            href={nav.href}
          >
            {nav.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
};
