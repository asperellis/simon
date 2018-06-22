// const CACHE_NAME = 'my-pwa-cache-v1';
// const urlsToCache = ['/', '/styles/in.css', '/script/webpack-bundle.js'];

self.addEventListener('install', function() {
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then(function(cache) {
  //     // Open a cache and cache our files
  //     return cache.addAll(urlsToCache);
  //   })
  // );
  console.log('Service Worker Installed');
});
