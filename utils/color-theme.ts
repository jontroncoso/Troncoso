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
    '--color-devops': '#b45309', // amber-700
    '--color-devops-light': '#ffedd5', // orange-100
    '--color-language': '#047857', // emerald-700
    '--color-language-light': '#d1fae5', // emerald-100
    '--color-framework': '#7c3aed', // violet-700
    '--color-framework-light': '#ede9fe', // violet-100
    '--color-strength': '#b91c1c', // red-700
    '--color-strength-light': '#fee2e2', // red-100
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
    '--color-devops': '#fed7aa', // amber-200
    '--color-devops-light': '#78350f', // amber-600
    '--color-language': '#6ee7b7', // emerald-200
    '--color-language-light': '#065f46', // emerald-600
    '--color-framework': '#c4b5fd', // violet-200
    '--color-framework-light': '#6b21a8', // violet-600
    '--color-strength': '#fecaca', // red-200
    '--color-strength-light': '#991b1b', // red-600
  }),
};
