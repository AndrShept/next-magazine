import React from 'react';
import { ReviewForm } from './ReviewForm';
import { prisma } from '@/lib/db/prisma';
import { ReviewsList } from './ReviewsList';

export const metadata = {
  title: 'Залишайте свої відгуки',
};

const page = async () => {
  const reviews = await prisma.review.findMany({
    orderBy: { id: 'desc' },
  });
  return (
    <div className='min-h-screen  space-2 max-w-3xl mx-auto '>
      {/* <ReviewForm /> */}
      <ReviewsList reviews={reviews}/>
    </div>
  );
};

export default page;
