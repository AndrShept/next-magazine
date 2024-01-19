'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';

import { navList } from './NavList';

export const SheetSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="block cursor-pointer rounded-full p-2 duration-150 hover:bg-secondary md:hidden">
          <Menu size={22} strokeWidth={1.5} className="text-muted-foreground" />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className="w-[270px] ">
        <SheetHeader className="flex h-screen items-center justify-around">
          {/* <SheetTitle>Мої контакти</SheetTitle> */}
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
          <nav>
            <AnimatePresence>
              <ul className=" flex w-max flex-col gap-2  text-center">
                {navList.map((nav, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0 }}
                    onClick={() => {
                      router.push(nav.href);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'border-b-2 border-transparent px-1 py-2 text-base hover:border-pink-200  ',
                      {
                        'border-pink-500 font-semibold duration-300 hover:border-pink-500 ':
                          pathname === nav.href,
                      },
                    )}
                    key={idx}
                  >
                    {nav.name}
                  </motion.button>
                ))}
              </ul>
            </AnimatePresence>
          </nav>
          <div className="mt-4 flex flex-col gap-2 text-center ">
            <h3 className="text-base text-zinc-400 ">Follow Use:</h3>
            <div className="flex gap-2">
              <a
                className="relative h-10 w-10 hover:opacity-90"
                target="_blank"
                href="#"
              >
                <Image
                  src={'https://cdn-icons-png.flaticon.com/128/733/733547.png'}
                  alt="img"
                  fill
                  sizes="100vw"
                />
              </a>
              <a
                className="relative h-10 w-10 hover:opacity-90"
                target="_blank"
                href="#"
              >
                <Image
                  src={
                    'https://cdn-icons-png.flaticon.com/128/2111/2111463.png'
                  }
                  alt="img"
                  fill
                  sizes="100vw"
                />
              </a>
              <a
                className="relative h-10 w-10 hover:opacity-90"
                target="_blank"
                href="#"
              >
                <Image
                  src={
                    'https://cdn-icons-png.flaticon.com/128/3938/3938039.png'
                  }
                  alt="img"
                  fill
                  sizes="100vw"
                />
              </a>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
