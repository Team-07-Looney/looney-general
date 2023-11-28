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
			}
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
};
