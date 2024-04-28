import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

declare let self: ServiceWorkerGlobalScope

// Setting up cache names
setCacheNameDetails({
    prefix: 'my-app',
    suffix: 'v1',
    precache: 'precache',
    runtime: 'runtime',
});

// Manually add items to precache
precacheAndRoute([
    ...self.__WB_MANIFEST,
    { url: '../content/places.json', revision: '12345' } // Add the path to your JSON file and a revision for cache busting
]);

// Navigation Route for HTML (Single Page App)
const navigationHandler = createHandlerBoundToURL('/')
registerRoute(new NavigationRoute(navigationHandler, {
    allowlist: [new RegExp('^/')],
}))

// Cache strategy for JSON files
registerRoute(
    ({ url }) => url.pathname.endsWith('.json'),
    new CacheFirst({
        cacheName: 'json-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 10, // Adjust depending on how many JSON files you have
                maxAgeSeconds: 24 * 60 * 60, // 1 day
            }),
        ],
    }),
);

// Claim clients and skip waiting
self.skipWaiting()
clientsClaim()
