'use client'
import { Review } from '@prisma/client';
import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'timeago.js';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ReviewForm } from './ReviewForm';
import { MessageCircle, MessageSquare } from 'lucide-react';

export const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  const [isMount, setIsMount] = useState(false);
  const [isOpen , setIsOpen] = useState(false)

  useEffect(() => setIsMount(true), []);
  if (!isMount) return null;
  return (
    <div className='flex flex-col gap-5 '>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={'outline'} className='rounded-full mx-auto md:max-w-md w-full'>
            Залишити відгук <MessageCircle className='ml-2' />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ReviewForm setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>

      {reviews.map((review) => (
        <div
          key={review.id}
          className='flex gap-4 bg-base-100 px-5 py-5 rounded-2xl shadow-sm max-w-max border border-zinc-200 '
        >
          <Avatar>
            <AvatarImage
              src={review.userImage || null || undefined}
              alt='avatar'
            />
            <AvatarFallback className=' text-white capitalize '>
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
