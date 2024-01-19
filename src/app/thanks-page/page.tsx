import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const metadata = {
  title: 'Дякую за покупку',
};

const page = () => {
  return (
    <div className="mx-auto h-screen max-w-4xl">
      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-base-100 p-5 text-center">
        {/* <div className='relative  h-24 w-24 mb-8 '>
          <Image
            alt='img'
            fill
            src={'https://cdn-icons-png.flaticon.com/128/5610/5610944.png'}
          />
        </div> */}
        <CheckSquare className="text-muted-foreground" size={80} />
        <h1 className="text-3xl font-bold text-black/80">
          Дякую за замолення{' '}
        </h1>
        <p className="text-muted-foreground">Ваше замовлення отримано</p>
        <p className="text-muted-foreground">
          Ми зв&apos;яжемося з вами найближчим часом.
        </p>

        <Button className="mt-4 rounded-full" asChild>
          <Link href={'/'}>Перейти на головну</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
