import { Product, Rating } from '@prisma/client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IView {
  productId: string;
}

interface useViewProps {
  view: IView[];
  setView: (view: IView) => void;
}

export const useView = create<useViewProps>()(
  persist(
    (set) => ({
      view: [],
      setView: (view) => set((state) => ({ view: [...state.view, view] })),
    }),
    { name: 'view-store' }
  )
);
