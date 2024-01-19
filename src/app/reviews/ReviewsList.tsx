'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Review } from '@prisma/client';
import { MessageCircle, MessageSquare } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';

import { ReviewForm } from './ReviewForm';

export const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  const [isMount, setIsMount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsMount(true), []);
  if (!isMount) return null;
  return (
    <div className="flex flex-col gap-5 ">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant={'outline'}
            className="mx-auto w-full rounded-full md:max-w-md"
          >
            Залишити відгук <MessageCircle className="ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <ReviewForm setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex max-w-max gap-4 rounded-2xl border border-zinc-200 bg-base-100 px-5 py-5 shadow-sm "
        >
          <Avatar>
            <AvatarImage
              src={review.userImage || null || undefined}
              alt="avatar"
            />
            <AvatarFallback className=" capitalize text-white ">
              {review.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{review.name}</h3>
              <span className="text-sm text-zinc-400">
                {format(review.createdAt)}
              </span>
            </div>
            <p className="mt-2 break-all text-zinc-700">{review.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
