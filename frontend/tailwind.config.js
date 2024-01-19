import { join } from 'path'

import { skeleton } from '@skeletonlabs/tw-plugin'

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  darkMode: 'class',
  content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
  theme: {
    extend: {
      fontFamily: {
        chewy: ['Chewy', ...defaultTheme.fontFamily.sans]
    },
      colors: {
        'lavender': {
          'base': '#9C9ED3', // Base color
          '50': '#F0F1FA',   // Lightest shade
          '100': '#D6D8E5',
          '200': '#BCBFD7',
          '300': '#A2A5C9',
          '400': '#8285B4',
          '500': '#9B9DD1',  // Base color
          '600': '#686996',
          '700': '#4E5178',
          '800': '#34355A',
          '900': '#1F213C',  // Darkest shade
        },
        accent: '#fdefc7',
        advice: '#eaecfd'
      },
    },
  },
  plugins: [
    skeleton({
      themes: {
        preset: [
          {
            name: 'skeleton',
            enhancements: true,
          },
        ],
      },
    }),
  ],
  safelist: [
    'text-red-700',
    'border-red-700',
    'text-gray-700',
    'border-gray-700',
    'text-black',
    'border-black',
    'text-accent',
    'bg-accent'
  ],
};
