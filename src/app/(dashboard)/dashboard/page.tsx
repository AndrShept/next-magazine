import { Button } from '@/components/ui/button';
import { BadgeAlert, LayoutList, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className='flex justify-center items-center  '>
      <div className='flex flex-col gap-4  mt-[100px] '>
        <Button asChild>
          <Link href='/add-product'>
            <Plus className='mr-2 w-6 h-6 ' /> ADD Product
          </Link>
        </Button>
        <Button asChild>
          <Link href='/product-list'>
            <LayoutList className='mr-2 w-6 h-6 ' />
            Product List
          </Link>
        </Button>
        <Button asChild>
          <Link href='/order'>
            <BadgeAlert className='mr-2  ' /> Order
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
