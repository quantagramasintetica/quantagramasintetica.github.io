const CACHE_NAME = 'quanta-grama-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './assets/css/style.min.css?v=2.0.7',
  './assets/js/script.js',
  './assets/images/cropped-Imagem-do-WhatsApp-de-2024-08-26-as-13.20.29_8ec738d5-e1724902928833.webp',
  './assets/images/grama-mobile.webp',
  './assets/images/google-qskszi10s4g8ys6coqa37lzfgw2qw0goj0d6k7yqo0.webp'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event (Network First, fallback to cache)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache the response if it is a valid network request
        if (response && response.status === 200) {
          const responseCopy = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseCopy);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || caches.match('./index.html');
        });
      })
  );
});
