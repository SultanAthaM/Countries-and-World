<script setup lang="ts">
import type { MenuItem } from "../config/menus"

defineProps<{
	items: MenuItem[]
}>()
</script>

<template>
	<ul>
		<li
			v-for="item in items"
			:key="item.key"
		>
			<NuxtLink
				v-if="'to' in item"
				:to="item.to"
				class="hover:brightness-90"
			>
				{{ item.label }}
			</NuxtLink>

			<a
				v-else-if="'href' in item"
				:href="item.href"
				:target="item.target"
				:rel="item.rel"
				class="underline hover:brightness-90"
			>
				{{ item.label }}
			</a>

			<span v-else>
	      {{ item.label }}
	    </span>
		</li>
	</ul>
</template>