'use client';

import { useRatingStore } from '@/lib/store/rating-store';
import { Rating } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Rating as RatingComponent } from 'react-simple-star-rating';
import { v4 as uuidv4 } from 'uuid';

export function StarRating({ productId }: { productId: string }) {
  const { setRating, rating, setRatingByProductId } = useRatingStore();

  const router = useRouter();
  const initialValue = rating.find((item) => item.productId === productId);

  // Catch Rating value
  const handleRating = async (rate: number) => {
    setRating({ productId, rating: rate, userId: uuidv4() });
    const res = await setRatingByProductId(productId);
    if (res.rating) {
      router.refresh();
    }
    // const rating = useRating.getState().rating;
    // const findRating = rating.find((item) => item.productId === productId);

    // try {
    //   const res = await fetch(`/api/rating`, {
    //     method: 'POST',
    //     body: JSON.stringify(findRating),
    //   });
    //   if (res.ok) {
    //     router.refresh();

    //   }
    // } catch (error) {
    //   console.log('error', error);
    // }

    // other logic
  };
  // useEffect(() => {
  //   getProductById(productId);
  // }, [getProductById, productId]);
  // Optinal callback functions
  // const onPointerEnter = () => console.log('Enter');
  // const onPointerLeave = () => console.log('Leave');
  // const onPointerMove = (value: number, index: number) =>
  //   console.log(value, index);
  // if (isLoading) return <Loader className='animate-spin opacity-50 '/>;
  return (
    <>
      <RatingComponent
        // allowFraction
        readonly={initialValue?.productId === productId || false}
        initialValue={initialValue?.rating || 0}
        transition
        size={25}
        onClick={handleRating}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
        // onPointerMove={onPointerMove}
        /* Available Props */
      />
    </>
  );
}
