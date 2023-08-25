import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Contacts } from './Contacts';

export const SheetSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className='p-2 hover:bg-gray-200 rounded-md cursor-pointer duration-150 sm:hidden block'>
          <Menu size={26} strokeWidth={1.5} className='text-gray-700' />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className='w-[300px] '>
        <SheetHeader>
          {/* <SheetTitle>Мої контакти</SheetTitle> */}
          {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription> */}
          <Contacts />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
