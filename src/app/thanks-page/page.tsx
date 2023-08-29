import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <div className='mx-auto w-full h-screen'>
      <div className='flex flex-col items-center justify-center'>

      <h1 className='text-3xl font-bold'>Дякую за замолення </h1>
      <p>Your submission has been received.</p>
      <p>We will be in touch and contact you soon.</p>
      
      <Link className='btn btn-secondary rounded-full text-white mt-4' href={'/'}>На головну сторінку</Link>

      </div>
    </div>
  );
};

export default page;
