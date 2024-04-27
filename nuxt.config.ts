// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mb_key: process.env.MB_KEY
    }
  },
  ssr: false,
  devtools: { enabled: false },
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
  pwa: {
    manifest: {
      name: 'Squaretable',
      short_name: 'Squaretable',
      lang: 'is',
      display: 'standalone',
      background_color: '#f0f0f0',
      theme_color: '#333333'
    }
  }
})

