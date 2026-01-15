import type { Config } from 'tailwindcss'

export default <Config>{
	content: [
		'./components/**/*.{vue,js}',
		'./app/**/*.{vue,js,svg}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'world-map': "url('../svg/world_map.svg')",
			},
			keyframes: {
				heroSlide: {
					'0%': { backgroundPosition: '0 0' },
					'100%': { backgroundPosition: '-100% 0' },
				},
			},
			animation: {
				'hero-slide': 'heroSlide 180s linear infinite',
			},
		},
	},
	plugins: [],
}
