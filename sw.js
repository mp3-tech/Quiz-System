// ============================================================
// 智慧複習系統 - Service Worker (PWA 離線快取)
// ============================================================
const CACHE_NAME = 'quiz-app-v4';

// 需要預先快取的資源（本地檔案）
const PRECACHE_URLS = [
    './',
    './index.html',
    './app.js',
    './style.css',
    './manifest.json',
    './icon-192.png',
    './icon-512.png'
];

// ── 安裝：預快取所有本地資源 ──────────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(PRECACHE_URLS);
        }).then(() => self.skipWaiting())
    );
});

// ── 啟動：清除舊版快取 ────────────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// ── 攔截請求：Cache First（本地優先），CDN 資源 Network First ──
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // CDN 外部資源（Tailwind、confetti）→ 嘗試網路，失敗才用快取
    const isCDN = url.hostname.includes('cdn.tailwindcss.com') ||
                  url.hostname.includes('cdn.jsdelivr.net');

    if (isCDN) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
        return;
    }

    // 本地資源 → Cache First
    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;
            return fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                }
                return response;
            });
        })
    );
});
