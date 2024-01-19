import { Product, Rating } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProductWithRating extends Product {
  rating: Rating[];
}

interface RatingType {
  userId: string;
  rating: number;
  productId: string;
}

interface DataType {
  product?: ProductWithRating;
  // rating?: IRating;
}

interface useRatingState {
  data: DataType;
  rating: RatingType[];
  isLoading: Boolean;
  setRating: (rating: RatingType) => void;
  setProduct: (product: ProductWithRating) => void;

  getProductById: (id: string) => Promise<void>;
  setRatingByProductId: (id: string) => Promise<Rating>;
}
export const useRatingStore = create<useRatingState>()(
  persist(
    (set, get) => ({
      rating: [],
      data: {},
      isLoading: false,
      setRating: (rating: RatingType) =>
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
      setRatingByProductId: async (id) => {
        const rating = get().rating;
        const findRating = rating.find((item) => item.productId === id);
        try {
          const res = await fetch(`/api/rating`, {
            method: 'POST',
            body: JSON.stringify(findRating),
          });
          return res.json();
          // if (res.ok) {
          //   router.refresh();
          // }
        } catch (error) {
          console.log('error', error);
        }
      },
    }),
    { name: 'rating-store' }
  )
);
