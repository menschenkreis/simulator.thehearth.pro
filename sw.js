const CACHE = 'hearth-v3';
const SHELL = [
  '/simulator.html',
  '/index.html',
  '/assets/css/style.css',
  '/assets/css/foundation.css',
  '/assets/css/book-reader.css'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(
      ks.filter(k => k !== CACHE).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Network-first for ALL requests — cache is only offline fallback
  e.respondWith(
    fetch(e.request).then(r => {
      const clone = r.clone();
      const url = new URL(e.request.url);
      if (r.ok && (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/images/') || url.pathname.startsWith('/simulator') || url.pathname.startsWith('/sw') || url.pathname.includes('fonts.googleapis.com') || url.pathname.includes('fonts.gstatic.com'))) {
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return r;
    }).catch(() => caches.match(e.request))
  );
});
