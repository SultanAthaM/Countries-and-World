// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxtjs/tailwindcss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  nitro: {
    preset: 'vercel',
    prerender: {
      crawlLinks: false
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/country/**': { static: true },
  }
})
