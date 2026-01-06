const IS_PROD = process.env.NODE_ENV === 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: [
      '@nuxtjs/tailwindcss'
  ],
  compatibilityDate: '2024-04-03',
  devtools: {
    enabled: !IS_PROD
  },
  nitro: {
    preset: IS_PROD ? 'vercel' : 'bun',
    prerender: {
      crawlLinks: false
    }
  },
  routeRules: {
    '/': {
      prerender: true
    },
    '/country/**': {
      static: true
    },
  }
})
