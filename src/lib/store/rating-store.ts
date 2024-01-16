import { Product, Rating } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductWithRating extends Product {
  rating: Rating[];
}

interface IRating {
  userId: string;
  rating: number;
  productId: string;
}

interface IData {
  product?: ProductWithRating;
  // rating?: IRating;
}

interface useRatingProps {
  data: IData;
  rating: IRating[];
  isLoading: Boolean;
  setRating: (rating: IRating) => void;
  setProduct: (product: ProductWithRating) => void;
  
  getProductById: (id: string) => Promise<void>;
}
export const useRating = create<useRatingProps>()(
  persist(
    (set) => ({
      rating: [],
      data: {},
      isLoading: false,
      setRating: (rating: IRating) =>
        set((state) => ({ rating: [...state.rating, rating] })),
      setProduct: (product) => set({ data: { product } }),
      getProductById: async (productId) => {
        set({ isLoading: true });
        try {
          const res = await fetch(`/api/product/${productId}`);
          set({ data: { product: await res.json() } });
        } catch (error) {
          console.log(error);
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: 'rating-store' }
  )
);
