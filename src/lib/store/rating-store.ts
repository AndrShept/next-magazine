import { Product } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IRating {
  userId: string;
  rating: number;
  productId: string;
}

interface useRatingProps {
  rating: IRating;
  setRating: (obj: IRating) => void;
}
export const useRating = create<useRatingProps>()(
  persist(
    (set) => ({
      rating: { userId: '', rating: 0, productId: '' },
      setRating: ({ productId, rating, userId }) =>
        set(() => ({ rating: { productId, rating, userId } })),
    }),
    { name: 'rating-store' }
  )
);
