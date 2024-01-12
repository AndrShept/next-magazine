import { Product } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoriteDataProps extends Product {}

interface useFavoriteProps {
  page: number;
  itemsPerPage: number;
  favoriteProducts: FavoriteDataProps[];
  addFavoriteProduct: (product: FavoriteDataProps) => void;
  removeFavoriteProduct: (id: string) => void;
  clearAllFavoriteProduct: () => void;
  incrementPage: () => void;
  decrementPage: () => void;
}
export const useFavorite = create<useFavoriteProps>()(
  persist(
    (set) => ({
      page: 1,
      itemsPerPage: 6,
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
      incrementPage: () => set((state) => ({ page: state.page + 1 })),
      decrementPage: () => set((state) => ({ page: state.page - 1 })),
    }),
    { name: 'favorite-store' }
  )
);
