<script setup lang="ts">
import type {Country} from "~~/types/country";
import WorldMap from "~~/components/WorldMap.vue";

const pageTitle = 'Explore Countries of the World'
const pageDescription = 'Reliable demographic, geographic, and cultural data structured for clarity and accuracy.'

useSeoMeta({
	title: 'Homepage',
	description: pageDescription,
	ogTitle: pageTitle,
	ogDescription: pageDescription,
	ogType: 'website',
	twitterCard: 'summary_large_image'
})

const search = ref('')

const onSearch = () => {
	if (!search.value.trim()) return

	navigateTo({
		path: '/country',
		query: {
			search: search.value.trim()
		}
	})
}

const fields = 'name,cca3,flags,population,region'
const { data: countries } = await useFetch<Country[]>(`https://restcountries.com/v3.1/all?fields=${fields}`)
const totalCountries = computed(() =>
	countries.value?.length ?? 0
)

const totalPopulation = computed(() =>
	(countries.value ?? []).reduce(
		(sum, c) => sum + (c.population ?? 0),
		0
	)
)

const countriesByRegion = computed(() => {
	const map: Record<string, number> = {}

	for (const c of countries.value ?? []) {
		if (!c.region) continue
		map[c.region] = (map[c.region] ?? 0) + 1
	}

	return map
})

const topPopulatedCountries = computed(() =>
	[...(countries.value ?? [])]
		.filter(c => typeof c.population === 'number')
		.sort((a, b) => b.population - a.population)
		.slice(0, 4)
)
</script>

<template>
	<section aria-labelledby="hero-title" class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<WorldMap
			class="absolute inset-0 left-0 top-0 w-auto h-full animate-slide fill-gray-200 dark:fill-gray-950"
		/>

		<div class="max-w-3xl mx-6 z-10">
			<h1 id="hero-title" class="text-4xl text-center md:text-6xl font-bold tracking-tight mb-6 border-b-6 border-gray-700 pb-3">
				{{ pageTitle }}
			</h1>

			<p class="text-lg text-center md:text-xl dark:text-gray-300 mb-8">
				{{ pageDescription }}
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<NuxtLink
					to="/country"
					class="text-center px-6 py-3 rounded-lg font-semibold bg-black hover:bg-gray-800 text-white transition-transform hover:scale-105"
				>
					Browse All Countries
				</NuxtLink>
			</div>
		</div>
	</section>

	<section class="relative flex items-center justify-center gap-8 px-6 md:px-24 lg:px-48">
		<NuxtImg
			src="/webp/clay-banks-b5S4FrJb7yQ-unsplash.webp"
			alt=""
			aria-hidden="true"
			loading="lazy"
			fetchpriority="low"
			class="hidden md:block max-h-[50vh] w-auto rounded-2xl opacity-90 shadow-xl"
		/>

		<div class="relative min-h-[50vh] w-full max-w-2xl flex flex-col gap-12 items-center justify-center rounded-2xl border-8 border-gray-700/60 shadow-lg px-8 py-10 overflow-hidden">
			<NuxtImg
				src="/jpg/clay-banks-b5S4FrJb7yQ-unsplash.jpg"
				placeholder
				aria-hidden="true"
				loading="lazy"
				fetchpriority="low"
				class="absolute block md:hidden w-full h-auto opacity-60 dark:opacity-90"
			/>

			<div class="absolute flex flex-col w-full h-full gap-6 z-10 items-center justify-center backdrop-blur-md p-10">
				<h2 class="text-5xl md:text-6xl font-bold tracking-tight text-center border-b-4 border-gray-700 pb-3 px-1">
					Explore Now
				</h2>

				<p class="text-2xl text-center font-medium md:text-xl dark:text-gray-300 mb-8">
					Search the country that you want to learn more of
				</p>

				<form
					@submit.prevent="onSearch"
					class="flex flex-col sm:flex-row gap-3 w-full max-w-md"
				>
					<input
						v-model="search"
						type="search"
						placeholder="Search for a country..."
						aria-label="Search for a country"
						class="flex-1 p-3 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-black/60"
					/>

					<button
						type="submit"
						class="px-6 py-3 rounded-md font-semibold bg-black text-white hover:bg-gray-800 transition-transform hover:scale-105"
					>
						Search
					</button>
				</form>
			</div>
		</div>
	</section>

	<section class="flex flex-col items-center justify-center px-6 py-8 mt-4">
		<h2 class="text-4xl md:text-6xl font-bold border-b-4 border-gray-700 pb-3 mb-12 mx-8 text-center">
			World at a Glance
		</h2>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-12 mx-2">
			<div>
				<p class="text-3xl md:text-4xl dark:text-gray-300">Countries</p>
				<p class="text-5xl md:text-6xl font-bold">{{ totalCountries }}</p>
			</div>

			<div>
				<p class="text-3xl md:text-4xl dark:text-gray-300">World Population</p>
				<p class="text-5xl md:text-6xl font-bold">
					{{ totalPopulation.toLocaleString() }}
				</p>
			</div>

			<div>
				<p class="text-2xl dark:text-gray-300 mb-3">
					Countries By Regions
				</p>

				<ul class="space-y-1">
					<li
						v-for="(count, region) in countriesByRegion"
						:key="region"
						class="flex justify-between text-xl"
					>
						<span class="font-medium">
							{{ region }}
						</span>
						<span class="dark:text-gray-300">
							{{ count }}
						</span>
					</li>
				</ul>
			</div>

			<div>
				<p class="text-2xl dark:text-gray-300 mb-2">
					Population Extremes
				</p>

				<ul class="space-y-1">
					<li
						v-for="(country, index) in topPopulatedCountries"
						:key="country.cca3"
						class="flex justify-between text-xl"
					>
						<span class="font-medium">
							{{ index + 1 }}. {{ country.name.common }}
						</span>
						<span class="dark:text-gray-300">
							{{ country.population.toLocaleString() }}
						</span>
					</li>
					<li class="text-xl">
						<span class="font-medium">
							. . .
						</span>
					</li>
				</ul>
			</div>
		</div>
	</section>
</template>