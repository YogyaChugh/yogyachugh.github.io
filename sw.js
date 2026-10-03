/* yogya.dev service worker.
   Online: pages and files always come fresh from the network.
   Offline: pages you've already read still open, and anything else gets /offline.html.
   To retire it one day, replace this file with one that calls self.registration.unregister(). */
const VERSION = 'v11';
const CORE = `core-${VERSION}`;
const PRECACHE = ['/offline.html', '/comic.css?v=11', '/comic.js?v=11', '/favicon.png', '/favicon.ico', '/assets/icons.svg', '/assets/icon-192.png'];

self.addEventListener('install', event => {
  event.waitUntil(Promise.all([
    caches.open(CORE).then(cache => cache.addAll(PRECACHE)),
    // every page of the comic, so the installed app works with no connection
    caches.open('pages').then(cache => Promise.all(['/', '/intro', '/resume/', '/writing', '/privacy',
      '/blogs/vardhman', '/blogs/whatwg_dom', '/blogs/summer_of_making', '/blogs/first_open_source']
      .map(u => cache.add(u).catch(() => {})))).catch(() => {})
  ]).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('core-') && k !== CORE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* keep a copy of good responses; opaque ones only for fonts, which can't be read anyway */
function keep(cacheName, request, response, allowOpaque) {
  if (response && (response.ok || (allowOpaque && response.type === 'opaque'))) {
    const copy = response.clone();
    caches.open(cacheName).then(cache => cache.put(request, copy));
  }
  return response;
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // video streams in pieces (range requests); leave those to the browser
  if (request.headers.has('range') || /\.(mp4|webm|vtt)$/.test(url.pathname)) return;

  // pages: network first, so nobody ever sees an old version
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => keep('pages', request, response))
        .catch(async () => (await caches.match(request, { ignoreSearch: true })) || caches.match('/offline.html'))
    );
    return;
  }

  // the lettering from Google Fonts: reuse the saved copy, so offline pages still look like a comic
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(caches.match(request).then(hit => hit || fetch(request).then(response => keep('fonts', request, response, true))));
    return;
  }

  // analytics, the GitHub numbers and Calendly go straight to the network
  if (url.origin !== self.location.origin) return;

  // styles, scripts and images: network first, saved copy when offline
  event.respondWith(
    fetch(request)
      .then(response => keep('assets', request, response))
      .catch(() => caches.match(request, { ignoreSearch: true }))
  );
});