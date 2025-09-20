const CACHE_NAME = "bash-sreng-v1";
const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./depan.jpg",
  "./original.jpg",
  "./sedang.jpg",
  "./pedas.jpg",
  "./pedasbanget.jpg",
  "./manifest.json"
];

// Install service worker & simpan file ke cache
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktifkan service worker & hapus cache lama jika ada
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch dari cache dulu, kalau gagal ambil dari internet
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});