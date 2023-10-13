'use client';
import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { navList } from './NavList';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const SheetSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className='p-2 hover:bg-secondary rounded-full cursor-pointer duration-150 md:hidden block'>
          <Menu size={22} strokeWidth={1.5} className='text-muted-foreground' />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className='w-[270px] '>
        <SheetHeader className='flex items-center justify-around h-screen'>
          {/* <SheetTitle>Мої контакти</SheetTitle> */}
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
          <nav>
            <AnimatePresence  >
              <ul className=' gap-2 flex-col flex w-max  text-center'>
                {navList.map((nav, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0}}
                    onClick={() => {
                      router.push(nav.href);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'py-2 px-1 border-b-2 border-transparent hover:border-pink-200 text-base  ',
                      {
                        'border-pink-500 duration-300 hover:border-pink-500 font-semibold ':
                          pathname === nav.href,
                      }
                    )}
                    key={idx}
                  >
                    {nav.name}
                  </motion.button>
                ))}
              </ul>
            </AnimatePresence>
          </nav>
          <div className='flex flex-col gap-2 mt-4 text-center '>
            <h3 className='text-zinc-400 text-base '>Follow Use:</h3>
            <div className='flex gap-2'>
              <a
                className='relative w-10 h-10 hover:opacity-90'
                target='_blank'
                href='#'
              >
                <Image
                  src={'https://cdn-icons-png.flaticon.com/128/733/733547.png'}
                  alt='img'
                  fill
                  sizes='100vw'
                />
              </a>
              <a
                className='relative w-10 h-10 hover:opacity-90'
                target='_blank'
                href='#'
              >
                <Image
                  src={
                    'https://cdn-icons-png.flaticon.com/128/2111/2111463.png'
                  }
                  alt='img'
                  fill
                  sizes='100vw'
                />
              </a>
              <a
                className='relative w-10 h-10 hover:opacity-90'
                target='_blank'
                href='#'
              >
                <Image
                  src={
                    'https://cdn-icons-png.flaticon.com/128/3938/3938039.png'
                  }
                  alt='img'
                  fill
                  sizes='100vw'
                />
              </a>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
