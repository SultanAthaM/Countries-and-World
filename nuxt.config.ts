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
    preset: IS_PROD ? 'vercel' : 'bun'
  },
  routeRules: {
    '/': {
      prerender: true
    },
    '/country/**': {
      isr: 60 * 60 * 24
    },
  }
})
