import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

const isProd = process.env.NODE_ENV === 'production'

export default defineNuxtConfig({
	app: {
		head: {
			htmlAttrs: {
				lang: 'en'
			},
			title: 'Countries & World',
			titleTemplate: '%s | Countries & World'
		}
	},
	css: [
		'/css/main.css',
	],
	future: {
		compatibilityVersion: 4
	},
	compatibilityDate: '2024-04-03',
	modules: [
		'@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode',
		'@nuxtjs/sitemap',
		'@nuxt/image',
		'@nuxt/content'
	],
	components: {
		dirs: [
			{
				path: resolve('./components/content'),
				pathPrefix: false,
				prefix: '',
				global: true
			}
		]
	},
	colorMode: {
		classSuffix: '',
		preference: 'system',
		fallback: 'light',
	},
	site: {
		url: 'https://countries-and-world.vercel.app/'
	},
	sitemap: {
		urls: [
			'/about',
			'/download',
			'/privacy',
			'/terms',
		],
	},
	image: {
		format: [
			'avif',
			'webp'
		],
		provider: 'vercel'
	},
	content: {
		database: {
			type: 'sqlite',
			filename: ':memory:'
		},
		build: {
			markdown: {
				toc: {
					depth: 3,
					searchDepth: 3
				}
			}
		}
	},
	devtools: {
		enabled: !isProd
	},
	nitro: {
		preset: isProd ? 'vercel' : 'bun',
		prerender: {
			routes: ['/about', '/download', '/privacy', '/term']
		}
	},
	routeRules: {
		'/**/*': {
			prerender: true
		}
	}
})
