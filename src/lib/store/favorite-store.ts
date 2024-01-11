import { Product } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteDataProps extends Product {}

interface useFavoriteProps {
  favoriteProducts: FavoriteDataProps[];
  addFavoriteProduct: (product: FavoriteDataProps) => void;
  removeFavoriteProduct: (id: string) => void;
  clearAllFavoriteProduct: () => void;
}
export const useFavorite = create<useFavoriteProps>()(
  persist(
    (set) => ({
      favoriteProducts: [],
      addFavoriteProduct: (product) =>
        set((state) => ({
          favoriteProducts: [...state.favoriteProducts, product],
        })),
      removeFavoriteProduct: (id) =>
        set((state) => ({
          favoriteProducts: state.favoriteProducts.filter(
            (item) => item.id !== id
          ),
        })),
      clearAllFavoriteProduct: () => set({ favoriteProducts: [] }),
    }),
    { name: 'favorite-store' }
  )
);
