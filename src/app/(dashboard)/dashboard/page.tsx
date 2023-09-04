import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Button } from '@/components/ui/button';
import {
  BadgeAlert,
  CircleDollarSign,
  LayoutList,
  Plus,
  ReplyAll,
} from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async() => {

  // const session = await getServerSession(authOptions);
  // if (session?.user?.email !== 'lolokos1986@gmail.com') {
  //   redirect('/api/auth/signin?callbackUrl');
  // }
  return (
    <div className='flex justify-center items-center  '>
      <div className='flex flex-col gap-4  mt-[100px] '>
        <Button asChild>
          <Link href='/add-product/new'>
            <Plus className='mr-2 w-6 h-6 ' /> Добавити продукт
          </Link>
        </Button>
        <Button asChild>
          <Link href='/product-list'>
            <LayoutList className='mr-2 w-6 h-6 ' />
            Список продуктів
          </Link>
        </Button>
        <Button asChild>
          <Link href='/order-list'>
            <CircleDollarSign className='mr-2' /> Замолення
          </Link>
        </Button>
        <Button variant={'outline'} asChild>
          <Link href='/'>
            <ReplyAll className='mr-2' /> На головну
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
