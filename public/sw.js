// Meat Beast — minimal service worker
// This is intentionally simple: it satisfies PWA installability criteria
// (a registered service worker + manifest) without attempting a full
// offline-first caching strategy, which would need careful design around
// how often prices/stock change. A network-first approach is used so users
// never see stale prices or stock status while offline caching support can
// be expanded later once the real backend exists.

const CACHE_NAME = "meatbeast-shell-v1";
const PRECACHE_URLS = ["/", "/index.html", "/favicon.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Only handle same-origin GET requests. Third-party calls (Stripe.js,
  // Supabase, analytics) are left completely untouched — intercepting those
  // is a common source of hard-to-debug payment/auth bugs.
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;

  // Network-first: always try the real network so prices/stock/orders are
  // never served stale. Only fall back to the cached app shell if the
  // network is genuinely unavailable (e.g. no connection).
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
