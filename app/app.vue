<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import MenuItem from "~~/components/MenuItem.vue";
import {navigationMenu, resourceMenu, legalMenu, contactMenu} from "~~/config/menus.ts";

const route = useRoute()
const atTop = ref(true)
const open = ref(false)
const colorMode = useColorMode()

const isDark = computed(() => colorMode.value === 'dark')
const isHome = computed(() => route.path === '/')
const isMain = computed(() => route.path === '/country')

const toggle = () => {
	colorMode.preference = isDark.value ? 'light' : 'dark'
}
const hideHeader = computed(() => {
	return isHome.value && atTop.value
})

const onScroll = () => {
	atTop.value = window.scrollY === 0
}

onMounted(() => {
	if (!isHome.value) return

	window.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', onScroll)
})
</script>

<template>
	<div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
		<header
			v-show="!hideHeader"
			class="shrink-0 sticky top-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300"
		>
			<div class="max-w-8xl mx-auto flex justify-between items-center px-6 py-4">
				<NuxtLink
					to="/"
					class="text-2xl font-semibold tracking-tight hover:text-blue-600 dark:hover:text-blue-400 transition"
				>
					Countries<span class="text-blue-600 dark:text-blue-400"> &</span> World
				</NuxtLink>

				<div class="flex flex-row items-center gap-4">
					<nav class="hidden md:block">
						<MenuItem
							:items="navigationMenu"
							class="flex items-center gap-8 group relative font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
						/>
					</nav>

					<button
						type="button"
						@click="toggle"
						class="inline-flex items-center justify-center px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:focus-visible:ring-gray-600"
						aria-label="Toggle dark mode"
					>
				    <span v-if="isDark" aria-hidden="true">🌙</span>
				    <span v-else aria-hidden="true">☀️</span>
				  </button>

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
			</div>

			<nav
				v-if="open"
				class="fixed top-full left-0 right-0 z-50 bg-white/90 dark:bg-gray-800/90 backdrop-blur shadow-sm border-b border-gray-200 dark:border-gray-700 md:hidden"
			>
				<MenuItem
					:items="navigationMenu"
					class="flex flex-col justify-center items-center gap-4 px-6 py-4 font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 text-center"
				/>
			</nav>
		</header>

		<main class="flex-1">
			<NuxtPage />
		</main>

		<footer class="shrink-0 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-4 transition-all duration-300">
			<div
				v-show="!isMain"
				class="relative min-h-[40vh] flex items-center justify-center overflow-hidden"
			>
				<NuxtImg
					src="/jpg/nasa-Q1p7bh3SHj8-unsplash.jpg"
					placeholder
					aria-hidden="true"
					loading="lazy"
					fetchpriority="low"
					class="absolute inset-0 left-0 top-0 w-full h-full object-cover opacity-80"
				/>

				<div class="max-w-2xl mx-6 z-10 bg-gray-100 bg-opacity-50 dark:bg-transparent dark:backdrop-blur-sm rounded-2xl px-8 py-6 text-center">
					<h2 class="text-4xl font-bold tracking-tight mb-3">
						Countries<span class="text-blue-600"> &</span> World
					</h2>

					<p class="mt-3 text-xl text-gray-800 dark:text-gray-300 mb-8">
						Exploring countries and global data, clearly and responsibly.
					</p>

					<NuxtLink
						to="/country"
						class="text-center px-6 py-3 rounded-lg font-semibold bg-black hover:bg-gray-800 text-white transition-transform hover:scale-105"
					>
						Browse All Countries
					</NuxtLink>
				</div>
			</div>

			<div class="grid grid-cols-1 px-6 pt-12 md:px-12 md:grid-cols-4 gap-8">
				<div class="md:col-span-1">
					<h3 class="font-medium mb-3">Contact Person</h3>

					<MenuItem
						:items="contactMenu"
						class="space-y-2 text-sm"
					/>
				</div>

				<div>
					<h3 class="font-medium mb-3">Navigation</h3>

					<nav aria-label="Footer navigation">
						<MenuItem
							:items="navigationMenu"
							class="space-y-2 text-sm"
						/>
					</nav>
				</div>

				<div>
					<h3 class="font-medium mb-3">Resources</h3>

					<MenuItem
						:items="resourceMenu"
						class="space-y-2 text-sm"
					/>
				</div>

				<div>
					<h3 class="font-medium mb-3">Legal</h3>

					<nav aria-label="Footer navigation">
						<MenuItem
							:items="legalMenu"
							class="space-y-2 text-sm"
						/>
					</nav>
				</div>
			</div>

			<div class="mt-12 py-6 mx-12 border-t border-gray-200 dark:border-gray-700 flex flex-col items-center justify-between text-sm text-gray-500">
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
		</footer>
	</div>
</template>
