const CACHE_NAME = "bashsreng-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/depan.jpg",
  "/original.jpg",
  "/sedang.jpg",
  "/pedas.jpg",
  "/pedasbanget.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
