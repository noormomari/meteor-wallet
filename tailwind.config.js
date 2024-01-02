/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './ui/**/*.{js,jsx,ts,tsx}',
    './client/**/*.{js,jsx,ts,tsx}',
    './client/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-white',
    'duration-100',
    'duration-300',
    'ease-in',
    'ease-out',
    'fixed',
    'flex',
    'flex-1',
    'flex-col',
    'flex-shrink-0',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-indigo-500',
    'focus:ring-offset-2',
    'font-medium',
    'h-5',
    'h-6',
    'hover:text-gray-500',
    'hover:text-indigo-500',
    'inline-flex',
    'inset-0',
    'items-center',
    'items-end',
    'items-start',
    'max-w-sm',
    'ml-3',
    'ml-4',
    'mt-1',
    'mt-3',
    'opacity-0',
    'opacity-100',
    'overflow-hidden',
    'p-4',
    'pointer-events-auto',
    'pointer-events-none',
    'pt-0.5',
    'px-4',
    'py-6',
    'ring-1',
    'ring-black',
    'ring-opacity-5',
    'rounded-lg',
    'rounded-md',
    'shadow-lg',
    'sm:items-end',
    'sm:items-start',
    'sm:p-6',
    'sm:translate-x-0',
    'sm:translate-x-2',
    'sm:translate-y-0',
    'space-x-7',
    'space-y-4',
    'sr-only',
    'text-gray-400',
    'text-gray-500',
    'text-gray-700',
    'text-gray-900',
    'text-green-500',
    'text-indigo-600',
    'text-red-500',
    'text-sm',
    'transform',
    'transition',
    'translate-y-0',
    'translate-y-2',
    'w-0',
    'w-5',
    'w-6',
    'w-full',
    'z-10',
  ],
};
