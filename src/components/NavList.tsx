'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const navList = [
  { name: 'Контакти', href: '/contacts', id: Date.now() },
  { name: 'Про магазин', href: '/about', id: Date.now() },
  { name: 'Відгуки', href: '/reviews', id: Date.now() },
];

export const NavList = ({ className = '' }) => {
  const pathname = usePathname();
  return (
    <nav className=''>
      <ul className=' gap-2 md:flex items-center hidden mr-3'>
        {navList.map((nav, idx) => (
          <Link
            className={cn(
              'py-2 px-1 border-b-2 border-transparent hover:border-pink-200 text-muted-foreground  ',
              {
                'border-pink-500 duration-300 hover:border-pink-500 text-primary  ':
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
