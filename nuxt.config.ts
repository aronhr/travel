// https://nuxt.com/docs/api/configuration/nuxt-config
const sw = process.env.SW === 'true'

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
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      name: 'Squaretable',
      short_name: 'Squaretable',
      lang: 'is',
      display: 'standalone',
      background_color: '#161D2C',
      theme_color: '#161D2C',
      icons: [
        {
          "src": "icons/manifest-icon-144.maskable.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/manifest-icon-192.maskable.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "icons/manifest-icon-512.maskable.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "icons/manifest-icon-512.maskable.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 20,
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallback: '/',
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    }
  }
})

