import type { Country } from './types/country'

const isProd = process.env.NODE_ENV === 'production'
const interval = 60 * 60 * 24 // 24 hours

async function getTop12CountryRoutes() {
	const fields = 'cca3,population'
	const res = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`)
	const countries: Country[] = await res.json()
	
	return countries
		.sort((a, b) => b.population - a.population)
		.slice(0, 12)
		.map(c => `/country/${c.cca3}`)
}

// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-ignore
export default defineNuxtConfig(async () => {
	const topCountryRoutes = await getTop12CountryRoutes()
	
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
			'~/assets/css/main.css',
		],
		future: {
			compatibilityVersion: 4
		},
		compatibilityDate: '2024-04-03',
		modules: [
			'@nuxtjs/tailwindcss',
		],
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
			'/country/**': {
				isr: interval
			},
			'/random': {
				cache: false,
				rerender: false
			}
		}
	}
})

