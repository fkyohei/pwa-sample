self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});

// 中身がなくてもこの記述は必要
// ないと、"Page does not work offline"となり、Add to homescreenができない
// 参考: https://pawafuru.com/0407
self.addEventListener('fetch', function(event) {});