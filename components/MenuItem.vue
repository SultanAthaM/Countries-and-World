<script setup lang="ts">
import type { MenuItem } from "../config/menus"

defineProps<{
	items: MenuItem[]
	menuClass?: string | string[]
	itemClass?: string
	childrenClass?: string
}>()
</script>

<template>
	<ul :class="menuClass">
		<li
			v-for="item in items"
			:key="item.key"
		>
			<NuxtLink
				v-if="'to' in item"
				:to="item.to"
				:class="itemClass"
			>
				{{ item.label }}
			</NuxtLink>

			<a
				v-else-if="'href' in item"
				:href="item.href"
				:target="item.target"
				:rel="item.rel"
				:class="['underline', itemClass]"
			>
				{{ item.label }}
			</a>

			<span v-else class="font-medium">
	      {{ item.label }}
	    </span>

			<MenuItem
				v-if="item.children?.length"
				:items="item.children"
				:menu-class="menuClass"
				:item-class="childrenClass"
				:children-class="childrenClass"
			/>
		</li>
	</ul>
</template>