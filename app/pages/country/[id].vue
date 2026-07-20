<script setup lang="ts">
import type { Country } from '~~/types/country'
import countriesJson from '~~/public/countriesV4.json'

const route = useRoute()

const countries = countriesJson as Country[]
const country = computed(() =>
	countries.find(c => c.cca3 === route.params.id)
)

if (country.value) {
	useSeoMeta({
		title: country.value.name.common,
		description: `Learn about ${country.value.name.common}, its population, capital, and region.`
	})
}
</script>

<template>
  <div
	  v-if="country"
	  class="page-container-7xl p-8 min-h-[50vh]"
  >
    <button
	    @click="$router.back()"
	    class="btn-secondary mb-10"
    >
      ← Back
    </button>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <NuxtImg
	      :src="country.flag.svg"
	      :alt="country.flag.alt"
	      fetchpriority="high"
	      class="w-full rounded-lg shadow-md"
      />

      <section>
        <h1 class="text-4xl font-bold mb-8">{{ country.name.common }}</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <ul class="space-y-2">
            <li><strong>Official Name:</strong> {{ country.name.official }}</li>
            <li><strong>Population:</strong> {{ country.population.toLocaleString() }}</li>
            <li><strong>Region:</strong> {{ country.region }}</li>
            <li><strong>Sub Region:</strong> {{ country.subregion }}</li>
            <li><strong>Capital:</strong> {{ country.capital?.join(', ') }}</li>
          </ul>
          <ul class="space-y-2">
            <li><strong>Top Level Domain:</strong> {{ country.tld?.join(', ') }}</li>
            <li><strong>Currencies:</strong> {{ country.currencies?.map(c => c.name).join(', ') }}</li>
            <li><strong>Languages:</strong> {{ country.languages?.map(l => l.name).join(', ') }}</li>
          </ul>
        </div>

        <div
	        v-if="country.borders?.length"
	        class="flex flex-wrap items-center gap-3"
        >
          <span class="font-bold">Border Countries:</span>
          <NuxtLink
	          v-for="border in country.borders"
	          :key="border"
	          :to="`/country/${border}`"
	          class="pill-link"
          >
            {{ border }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>
