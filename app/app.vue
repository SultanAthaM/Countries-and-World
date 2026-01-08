<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
	<div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
		<header class="shrink-0 sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm border-b border-gray-200 dark:border-gray-700">
			<div class="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
				<NuxtLink
					to="/"
					class="text-2xl font-semibold tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition"
				>
					Countries<span class="text-blue-600 dark:text-blue-400"> &</span> World
				</NuxtLink>

				<nav class="hidden md:block">
					<ul class="flex items-center gap-8">
						<li>
							<NuxtLink
								to="/"
								class="group relative font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
								active-class="text-blue-600 dark:text-blue-400"
							>
								Home
								<span class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"/>
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/api/random"
								class="group relative font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
								active-class="text-blue-600 dark:text-blue-400"
							>
								Random
								<span class="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"/>
							</NuxtLink>
						</li>
					</ul>
				</nav>

				<button
					class="md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
					@click="open = !open"
					:aria-expanded="open"
					aria-label="Toggle menu"
				>
					<span v-if="!open">☰</span>
					<span v-else>✕</span>
				</button>
			</div>

			<nav
				v-if="open"
				class="fixed top-full left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm border-b border-gray-200 dark:border-gray-700 md:hidden"
			>
				<ul class="flex justify-center items-center gap-4 px-6 py-4">
					<li>
						<NuxtLink
							to="/"
							class="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 text-center"
							@click="open = false"
						>
							Home
						</NuxtLink>
					</li>
				</ul>
			</nav>
		</header>

		<main class="flex-1">
			<NuxtPage />
		</main>

		<footer class="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
			<div class="max-w-7xl mx-auto px-6 py-12">
				<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div class="md:col-span-1">
						<h3 class="text-lg font-semibold">
							Countries<span class="text-blue-600"> &</span> World
						</h3>

						<p class="mt-3 text-sm text-gray-600 dark:text-gray-500">
							Exploring countries and global data, clearly and responsibly.
						</p>
					</div>

					<div>
						<h4 class="font-medium mb-3">Navigation</h4>
						<nav aria-label="Footer navigation">
							<ul class="space-y-2 text-sm">
								<li>
									<NuxtLink
										to="/"
										class="hover:text-blue-600"
									>
										Home
									</NuxtLink>
								</li>
							</ul>
						</nav>
					</div>

					<div>
						<h4 class="font-medium mb-3">Resources</h4>
						<ul class="space-y-2 text-sm">
							<li>
								<a
									href="https://github.com/SultanAthaM/Countries-and-World.git"
									target="_blank"
									rel="noopener noreferrer"
									class="underline hover:text-blue-600"
								>
									Github
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h4 class="font-medium mb-3">Legal</h4>
						<ul class="space-y-2 text-sm">
							<li>
								<a
									href="#"
									class="hover:text-blue-600"
								>
									Privacy
								</a>
							</li>
							<li>
								<a
									href="#"
									class="hover:text-blue-600"
								>
									Terms
								</a>
							</li>
						</ul>
					</div>

				</div>

				<div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center justify-between text-sm text-gray-500">
					<span>© {{ new Date().getFullYear() }} Countries & World</span>
					<p>
						Data provided by
						<a
							href="https://restcountries.com"
							target="_blank"
							rel="noopener noreferrer"
							class="underline hover:text-blue-600"
						>
							REST Countries API
						</a>.
					</p>
					<span>Built with Nuxt</span>
				</div>
			</div>
		</footer>
	</div>
</template>
