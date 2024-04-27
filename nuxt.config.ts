// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mb_key: process.env.MB_KEY
    }
  },
  ssr: false,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
      'nuxt-primevue',
      "@nuxt/image",
      'nuxt-mapbox',
      '@vite-pwa/nuxt'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  plugins: [
    { src: '~/plugins/primevue.js', mode: 'client' }
  ],
  primevue: {
    options: {
      unstyled: true
    }
  },
  mapbox: {
    accessToken: process.env.MB_KEY
  },
  // @ts-ignore
  pwa: {
    /* PWA options */
  }

})
