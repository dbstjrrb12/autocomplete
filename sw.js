// const request = require('./src/utils/request.js');
const dynamicCacheKey = 'AutoCompleteRequest_dynamic';

self.addEventListener('install', (e) => {
  console.log('service worker is installed');
});

self.addEventListener('activate', (e) => {
  console.log('ServiceWorker is activated');

  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== dynamicCacheKey) {
            return caches.delete(key);
          }
        })
      );
    })
  );

  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) {
        console.log('cache is working');
        return res;
      } else {
        return fetch(event.request)
          .then((res) => {
            return caches.open(dynamicCacheKey).then((cache) => {
              cache.put(event.request.url, res.clone());
              return res;
            });
          })
          .catch((err) => {
            console.error(err);
          });
      }
    })
  );
});
