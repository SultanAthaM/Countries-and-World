<template>
	<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
		<div class="home-hero-bg" aria-hidden="true"></div>

		<div class="max-w-3xl mx-6 z-10">
			<h1 class="text-4xl text-center md:text-6xl font-bold tracking-tight mb-6">
				Explore Countries of the World
			</h1>

			<p class="text-lg text-center md:text-xl text-gray-400 mb-8">
				Reliable demographic, geographic, and cultural data structured
				for clarity and accuracy.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<NuxtLink
					to="/country"
					class="text-center px-6 py-3 rounded-lg font-semibold bg-black text-white"
				>
					Browse All Countries
				</NuxtLink>
			</div>
		</div>
	</section>
</template>