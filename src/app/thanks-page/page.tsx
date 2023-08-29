import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className='mx-auto max-w-4xl h-screen'>
      <div className='flex flex-col items-center justify-center bg-base-100 p-5 rounded-2xl gap-2'>
        <div className='relative  h-24 w-24 mb-8 '>
          <Image
            alt='img'
            fill
            src={'https://cdn-icons-png.flaticon.com/128/5610/5610944.png'}
          />
        </div>
        <h1 className='text-3xl font-bold text-black/80'>Дякую за замолення </h1>
        <p className='text-gray-400'>Your submission has been received.</p>
        <p className='text-gray-400'>
          We will be in touch and contact you soon.
        </p>

        <Link
          className='btn btn-secondary rounded-full text-white mt-4'
          href={'/'}
        >
          Перейти на головну
        </Link>
      </div>
    </div>
  );
};

export default page;
