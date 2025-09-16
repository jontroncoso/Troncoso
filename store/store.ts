import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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

const options = ['light', 'dark', false] as const;
type DarkModeOptions = (typeof options)[number];

export interface DarkModeState {
  darkMode: DarkModeOptions;
  finalDarkMode: 'dark' | 'light';
  systemDarkMode: 'dark' | 'light';
  setDarkMode: (value: DarkModeOptions) => void;
  setSystemDarkMode: (value: 'dark' | 'light') => void;
  toggleDarkMode: () => void;
}

export const useDarkMode = create<DarkModeState>()(
  persist(
    (set, get) => {
      return {
        /** The current dark mode setting (light/dark/system) */
        darkMode: false,

        /** The effective dark mode (light/dark) */
        finalDarkMode: 'light',

        /** Set dark mode (light/dark/system) */
        setDarkMode: (value) =>
          set({ finalDarkMode: value || get().systemDarkMode || 'light', darkMode: value }),

        /** Cycle dark mode through light/dark/system */
        toggleDarkMode: () =>
          set(() => {
            const index = options.indexOf(get().darkMode);
            const value = options[(index + 1) % options.length];
            return { finalDarkMode: value || get().systemDarkMode || 'light', darkMode: value };
          }),

        /** The system dark mode (light/dark) */
        systemDarkMode: 'light',
        setSystemDarkMode: (value) =>
          set({ systemDarkMode: value, finalDarkMode: get().darkMode || value }),
      };
    },
    {
      name: 'darkmode-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
