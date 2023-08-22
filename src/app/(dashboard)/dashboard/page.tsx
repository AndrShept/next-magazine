import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className='flex justify-center items-center  '>
      <div className='flex flex-col gap-4  mt-[100px] '>
        <Button asChild>
          <Link href='/add-product'>
            <Plus className='mr-2 ' /> ADD Product
          </Link>
        </Button>
        <Button asChild>
          <Link href='/product-list'>Product List</Link>
        </Button>
        <Button asChild>
          <Link href='/order'>Order</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
