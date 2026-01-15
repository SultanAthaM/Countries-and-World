import type { Config } from 'tailwindcss'

export default <Config>{
	content: [
		'./components/**/*.{vue,js}',
		'./pages/**/*.{vue,js}',
	],
	theme: {
		extend: {
			keyframes: {
				slide: {
					'0%': {
						transform: 'translateX(0)'
					},
					'100%': {
						transform: 'translateX(-25%)'
					}
				}
			},
			animation: {
				slide: 'slide 90s linear infinite'
			}
		},
	},
	plugins: [],
}
