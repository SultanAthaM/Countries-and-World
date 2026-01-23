import type { Country } from './types/country'

const isProd = process.env.NODE_ENV === 'production'
const interval = 60 * 60 * 24 // 24 hours

async function getTopCountryRoutes() {
	const fields = 'cca3,population'
	const res = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`)
	const countries: Country[] = await res.json()
	
	return countries
		.sort((a, b) => b.population - a.population)
		.slice(0, 15)
		.map(c => `/country/${c.cca3}`)
}

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig(async () => {
	const topCountryRoutes = await getTopCountryRoutes()
	
	return {
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
			preset: isProd ? 'vercel' : 'bun'
		},
		routeRules: {
			'/': {
				prerender: true
			},
			'/country': {
				prerender: true
			},
			...Object.fromEntries(
				topCountryRoutes.map(route => [
					route,
					{
						prerender: true,
						revalidate: interval
					}
					])
			),
			'/country/*': {
				isr: interval
			}
		}
	}
})