import { prisma } from '@/lib/db/prisma';
import React from 'react';

import { ReviewForm } from './ReviewForm';
import { ReviewsList } from './ReviewsList';

export const metadata = {
  title: 'Залишайте свої відгуки',
};

const page = async () => {
  const reviews = await prisma.review.findMany({
    orderBy: { id: 'desc' },
  });
  return (
    <div className="space-2  mx-auto min-h-screen max-w-3xl ">
      {/* <ReviewForm /> */}
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default page;
