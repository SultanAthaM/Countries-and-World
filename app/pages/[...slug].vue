<script setup>
const route = useRoute()

const { data } = await useAsyncData(() =>
	queryCollection('content').path(route.path).first()
)

if (!data.value) {
	throw createError({ statusCode: 404, statusMessage: 'Content not found' })
}

useSeoMeta({
	title: data.value.title,
	description: data.value.description,
	ogTitle: data.value.title,
	ogDescription: data.value.description,
	ogType: 'article',
	twitterCard: 'summary'
})

const toc = computed(() => data.value?.body?.toc?.links ?? [])
</script>

<template>
  <div class="m-6">
    <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px] gap-10">
      <article class="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-24">
        <ContentRenderer :value="data" />
      </article>

      <aside class="hidden lg:block">
        <nav class="sticky top-24">
          <p class="mb-3 font-semibold text-gray-500 dark:text-gray-400">
            On this page
          </p>

          <ul class="space-y-2 text-sm">
            <li v-for="item in toc" :key="item.id">
              <a
	              :href="`#${item.id}`"
	              class="block text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  </div>
</template>
