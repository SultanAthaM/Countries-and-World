<script setup lang="ts">
import { useRoute } from "nuxt/app";
import { computed } from "vue";

const props = withDefaults(defineProps<{
	file?: string
	url?: string
	label?: string
}>(), {
	file: '',
	url: '',
	label: 'Download'
})

const route = useRoute()
const filePath = computed(() => props.file || route.path)

function handleDownload() {
	const downloadUrl = props.url || `/api/content${filePath.value}`
	const fileName = props.url
		? props.url.split('/').filter(Boolean).pop() || 'file'
		: `${filePath.value.split('/').filter(Boolean).pop() || 'document'}.md`

	const a = document.createElement('a')
	a.href = downloadUrl
	a.download = fileName
	a.click()
}
</script>

<template>
	<button
		class="download-btn"
		@click="handleDownload"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
			<polyline points="7 10 12 15 17 10" />
			<line x1="12" y1="15" x2="12" y2="3" />
		</svg>
		<slot>{{ label }}</slot>
	</button>
</template>

<style scoped>
.download-btn {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	padding: 0.5rem 1rem;
	font-size: 0.875rem;
	font-weight: 500;
	color: white;
	background-color: #2563eb;
	border: none;
	border-radius: 0.5rem;
	cursor: pointer;
	transition: background-color 0.2s;
}

.download-btn:hover {
	background-color: #1d4ed8;
}

.download-btn:active {
	background-color: #1e40af;
}
</style>
