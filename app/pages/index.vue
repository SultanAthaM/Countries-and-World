<script setup lang="ts">
import type { Country } from '~~/types/country'

const fields = 'name,cca3,flags,population,region,capital'
const { data: countries, pending } = await useFetch<Country[]>(`https://restcountries.com/v3.1/all?fields=${fields}`)

const search = ref('')
const selectedRegion = ref('')

const filteredCountries = computed(() => {
  if (!countries.value) return []
  return countries.value.filter(country => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.value.toLowerCase())
    const matchesRegion = selectedRegion.value ? country.region === selectedRegion.value : true
    return matchesSearch && matchesRegion
  })
})
</script>

<template>
  <main class="p-6 max-w-7xl mx-auto">
    <div class="flex flex-col md:flex-row gap-4 mb-10 justify-between">
      <input
          v-model="search"
          type="text"
          placeholder="Search for a country..."
          class="p-3 shadow-md rounded-md dark:bg-gray-800 w-full md:max-w-md"
      />

      <select v-model="selectedRegion" class="p-3 shadow-md rounded-md dark:bg-gray-800">
        <option value="">Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>

    <div v-if="pending">Loading countries...</div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <NuxtLink 
        v-for="country in filteredCountries" 
        :key="country.cca3" 
        :to="`/country/${country.cca3}`"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
      >
        <img :src="country.flags.svg" :alt="country.flags.alt" class="w-full h-48 object-cover border-b dark:border-gray-700" />
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