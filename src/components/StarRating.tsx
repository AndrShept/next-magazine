'use client';
import { useRating } from '@/lib/store/rating-store';
import { Rating } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Rating as RatingComponent } from 'react-simple-star-rating';
import { v4 as uuidv4 } from 'uuid';

export function StarRating({
  productId,
  ratingArr,
}: {
  productId: string;
  ratingArr: Rating[];
}) {
  const { setRating, rating } = useRating();
  const router = useRouter();
  const initialValue = ratingArr.find(
    (item) =>
      item.userId === rating.userId && item.productId === rating.productId
  );

  // Catch Rating value
  const handleRating = async (rate: number) => {
    setRating({ productId, rating: rate, userId: uuidv4() });
    try {
      const res = await fetch(`/api/rating`, {
        method: 'POST',
        body: JSON.stringify(rating),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.log('error', error);
    }

    // other logic
  };
  // Optinal callback functions
  const onPointerEnter = () => console.log('Enter');
  const onPointerLeave = () => console.log('Leave');
  const onPointerMove = (value: number, index: number) =>
    console.log(value, index);
  return (
    <>
      <RatingComponent
        // allowFraction
        initialValue={initialValue?.rating}
        transition
        size={25}
        onClick={handleRating}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerMove={onPointerMove}
        /* Available Props */
      />
    </>
  );
}
