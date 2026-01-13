<script setup lang="ts">
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

</script>

<template>
	<section aria-labelledby="hero-title" class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<div class="home-hero-bg" aria-hidden="true"></div>

		<div id="hero-title" class="max-w-3xl mx-6">
			<h1 class="text-4xl text-center md:text-6xl font-bold tracking-tight mb-6">
				{{ pageTitle }}
			</h1>

			<p class="text-lg text-center md:text-xl text-gray-400 mb-8">
				{{ pageDescription }}
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<NuxtLink
					to="/country"
					class="text-center px-6 py-3 rounded-lg font-semibold bg-black hover:bg-gray-800 text-white"
				>
					Browse All Countries
				</NuxtLink>
			</div>
		</div>
	</section>
</template>