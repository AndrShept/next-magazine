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
    <nav className="">
      <ul className=" mr-3 hidden items-center gap-2 md:flex">
        {navList.map((nav, idx) => (
          <Link
            className={cn(
              'border-b-2 border-transparent px-1 py-2 text-muted-foreground hover:border-pink-200  ',
              {
                'border-pink-500 text-primary duration-300 hover:border-pink-500  ':
                  pathname === nav.href,
              },
              className,
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
