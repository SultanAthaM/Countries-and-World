<script setup lang="ts">
import type { Country } from '~~/types/country'

useSeoMeta({
	title: 'Countries',
	description: 'Browse countries by region, population, and name. Explore detailed country data in one place.'
})

const fields = 'name,cca3,flags,population,region,capital'
const { data: countries, pending } = await useFetch<Country[]>(`https://restcountries.com/v3.1/all?fields=${fields}`)
const regions = [...new Set(
	(countries.value ?? [])
		.map(c => c.region)
		.filter(Boolean)
)]

const route = useRoute()
const search = ref('')

watch(
	() => route.query.search,
	(value) => {
		search.value = typeof value === 'string'
			? value
			: ''
	},
	{ immediate: true }
)

const selectedRegion = ref('')
const selectedSort = ref<'name' | 'population' | ''>('')
const selectedOrder = ref<'asc' | 'desc'>('desc')

const filteredCountries = computed(() => {
	if (!countries.value) return []

	let result = countries.value.filter(country => {
		const matchesSearch = country.name.common
			.toLowerCase()
			.includes(search.value.toLowerCase())

		const matchesRegion = selectedRegion.value
			? country.region === selectedRegion.value
			: true

		return matchesSearch && matchesRegion
	})

	if (selectedSort.value) {
		result = [...result].sort((a, b) => {
			let comparison = 0

			if (selectedSort.value === 'name') {
				comparison = a.name.common.localeCompare(b.name.common)
			}

			if (selectedSort.value === 'population') {
				comparison = a.population - b.population
			}

			return selectedOrder.value === 'asc'
				? comparison
				: -comparison
		})
	}

	return result
})
</script>

<template>
  <main class="p-6 max-w-8xl mx-auto">
	  <h1 class="text-5xl text-center md:text-left font-bold mb-8">
		  Countries
	  </h1>

    <div class="flex flex-col md:flex-row gap-4 mb-10 justify-between">
      <input
	      v-model="search"
	      type="text"
	      placeholder="Search for a country..."
	      class="p-3 shadow-md rounded-md dark:bg-gray-800 w-full md:max-w-md"
      />

	    <div class="flex flex-col md:flex-row gap-4 justify-between">
		    <select
			    v-model="selectedSort"
			    aria-label="Sort"
			    class="p-3 shadow-md rounded-md dark:bg-gray-800"
		    >
			    <option value="">Sort by</option>
			    <option value="population">Sort by Population</option>
			    <option value="name">Sort by Name</option>
		    </select>

		    <select
			    v-model="selectedOrder"
			    aria-label="Sort order"
			    class="p-3 shadow-md rounded-md dark:bg-gray-800"
		    >
			    <option value="desc">Descending</option>
			    <option value="asc">Ascending</option>
		    </select>

	      <select
		      v-model="selectedRegion"
		      aria-label="Filter by region"
		      class="p-3 shadow-md rounded-md dark:bg-gray-800"
	      >
	        <option value="">Filter by Region</option>
	        <option v-for="region in regions" :value="region" :key="region">{{ region }}</option>
	      </select>
	    </div>
    </div>

    <div v-if="pending">Loading countries...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
      <NuxtLink
        v-for="country in filteredCountries"
        :key="country.cca3"
        :to="`/country/${country.cca3}`"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
      >
        <img
	        :src="country.flags.svg"
	        :alt="country.flags.alt"
	        loading="lazy"
	        fetchpriority="low"
	        class="w-full h-48 object-cover border-b dark:border-gray-700"
        />

        <div class="p-6">
          <h2 class="text-xl font-bold mb-4">{{ country.name.common }}</h2>
          <p class="text-sm"><strong>Population:</strong> {{ country.population.toLocaleString() }}</p>
          <p class="text-sm"><strong>Region:</strong> {{ country.region }}</p>
          <p class="text-sm"><strong>Capital:</strong> {{ country.capital?.[0] || 'N/A' }}</p>
        </div>
      </NuxtLink>
    </div>
  </main>
</template>