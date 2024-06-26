// https://nuxt.com/docs/api/configuration/nuxt-config
import path from "path";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      mb_key: process.env.MB_KEY
    }
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  ssr: false,
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  modules: [
    "@nuxt/image",
    'nuxt-mapbox',
    '@vite-pwa/nuxt',
    '@nuxtjs/device'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  mapbox: {
    accessToken: process.env.MB_KEY
  },
  pwa: {
    strategies: 'generateSW',
    srcDir: undefined,
    filename: undefined,
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
    client: {
      installPrompt: true,
      // you don't need to include this: only for testing purposes
      // if enabling periodic sync for update use 1 hour or so (periodicSyncForUpdates: 3600)
      periodicSyncForUpdates: 3600,
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
