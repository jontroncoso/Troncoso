import { create } from 'zustand';

export interface ScrollYState {
  scrollY: number;
  setScrollY: (y: number) => void;
}

export const useScrollY = create<ScrollYState>((set) => ({
  scrollY: 0,
  setScrollY: (y) => set({ scrollY: y }),
}));

export interface ScrollXState {
  scrollX: number;
  setScrollX: (x: number) => void;
}

export const useScrollX = create<ScrollXState>((set) => ({
  scrollX: 0,
  setScrollX: (x) => set({ scrollX: x }),
}));
