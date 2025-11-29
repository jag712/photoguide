// Cache version: 2025-07-07T00:00:00Z
const CACHE_VERSION = 'v1.1.0';
const CACHE_NAME = `photoguide-cache-${CACHE_VERSION}`;
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/main.js',
  '/photographyData.js',
  '/scoring.js',
  '/notime.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
      self.skipWaiting()
    ])
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
