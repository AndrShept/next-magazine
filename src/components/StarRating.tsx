'use client';
import { useRating } from '@/lib/store/rating-store';
import { Rating } from '@prisma/client';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Rating as RatingComponent } from 'react-simple-star-rating';
import { v4 as uuidv4 } from 'uuid';

export function StarRating({ productId }: { productId: string }) {
  const { setRating, getProductById, isLoading, data, rating } = useRating();
  // const { product } = data;

  const router = useRouter();
  const initialValue = rating.find((item) => item.productId === productId);

  // Catch Rating value
  const handleRating = async (rate: number) => {

    setRating({ productId, rating: rate, userId: uuidv4() });
    const rating = useRating.getState().rating;
    const findRating = rating.find((item) => item.productId === productId);

    try {
      const res = await fetch(`/api/rating`, {
        method: 'POST',
        body: JSON.stringify(findRating),
      });
      if (res.ok) {
        router.refresh();
        // getProductById(productId);
      }
    } catch (error) {
      console.log('error', error);
    }

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
        readonly={initialValue?.productId === productId}
        initialValue={initialValue?.rating}
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
