const CACHE_NAME = 'lista-compras-v1';
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    '/icon.png',
    '/icon.png'
];

// Evento de instalação do Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(URLS_TO_CACHE);
    })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
    caches.keys().then(keys => {
        return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        );
    })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
    caches.match(event.request)
        .then(response => {
        return response || fetch(event.request);
        })
    );
});
