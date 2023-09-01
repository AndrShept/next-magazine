import { Review } from '@prisma/client';
import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'timeago.js';

export const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className='flex flex-col gap-5 '>
      {reviews.map((review) => (
        <div
          key={review.id}
          className='flex gap-4 bg-base-100 p-4 rounded-md shadow-sm max-w-max border border-zinc-200 '
        >
          <Avatar>
            <AvatarImage
              src={review.userImage || null || undefined}
              alt='avatar'
            />
            <AvatarFallback className='font-semibold'>
              {review.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col'>
            <div className='flex gap-2 items-center'>
              <h3 className='font-semibold'>{review.name}</h3>
              <span className='text-zinc-400 text-sm'>
                {format(review.createdAt)}
              </span>
            </div>
            <p className='break-all mt-2 text-zinc-700'>{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
