import { vars } from 'nativewind';

export const themes = {
  light: vars({
    '--color-link': '#1e40af', // blue-800
    '--color-50': '#f9fafb', //--color-gray-50
    '--color-100': '#f3f4f6', //--color-gray-100
    '--color-200': '#e5e7eb', //--color-gray-200
    '--color-300': '#d1d5db', //--color-gray-300
    '--color-400': '#9ca3af', //--color-gray-400
    '--color-500': '#6b7280', //--color-gray-500
    '--color-600': '#4b5563', //--color-gray-600
    '--color-700': '#374151', //--color-gray-700
    '--color-800': '#1F2937', //--color-gray-800
    '--color-900': '#111827', //--color-gray-900
    '--color-semitransparent': 'rgba(255, 255, 255, 0.2)',
    '--color-amber': '#b45309', // amber-700
  }),
  dark: vars({
    '--color-link': '#2563eb', // blue-600
    '--color-50': '#09090b', //--color-zinc-950
    '--color-100': '#1f2937', //--color-gray-800
    '--color-200': '#374151', //--color-gray-700
    '--color-300': '#4b5563', //--color-gray-600
    '--color-400': '#9ca3af', //--color-gray-400
    '--color-500': '#6b7280', //--color-gray-500
    '--color-600': '#9ca3af', //--color-gray-400
    '--color-700': '#d1d5db', //--color-gray-300
    '--color-800': '#e5e7eb', //--color-gray-200
    '--color-900': '#f3f4f6', //--color-gray-100
    '--color-semitransparent': 'rgba(0, 0, 0, 0.2)',
    '--color-amber': '#fbbf24', // amber-300
  }),
};
