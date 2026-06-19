const CACHE = 'hearth-v2';
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
  const url = new URL(e.request.url);
  const isHTML = e.request.headers.get('accept')?.includes('text/html');

  if (isHTML) {
    // Network-first for HTML
    e.respondWith(
      fetch(e.request).then(r => {
        const clone = r.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return r;
      }).catch(() => caches.match(e.request))
    );
  } else {
    // Cache-first for static assets
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(r => {
          if (r.ok && (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/images/') || url.pathname.includes('fonts.googleapis.com') || url.pathname.includes('fonts.gstatic.com'))) {
            const clone = r.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return r;
        });
      })
    );
  }
});
