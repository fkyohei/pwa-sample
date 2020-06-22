// 参考URL: https://qiita.com/OMOIKANESAN/items/13a3dde525e33eb608ae

// キャッシュを識別する名前
const CACHE_NAME = 'pwa_test_cache_v1';

// 有効キャッシュ一覧
const CACHE_KEYS = [
    CACHE_NAME
];

// キャッシュ対象を指定する
const TARGET_URL = [
    "index.html",
    "index.js",
    "index.css",
    "second.html"
];

self.addEventListener('install', function(event) {
    console.log('[ServiceWorker] Install');

    // キャッシュ処理
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(TARGET_URL);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activate');

    event.waitUntil(
        // 過去バージョンのキャッシュ削除
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => {
                    return !CACHE_KEYS.includes(key);
                }).map(key => {
                    // 有効なキー以外は削除
                    return caches.delete(key);
                })
            )
        })
    );
});

// 中身がなくてもこの記述は必要
// ないと、"Page does not work offline"となり、Add to homescreenができない
// 参考: https://pawafuru.com/0407
self.addEventListener('fetch', function(event) {
    // 状態取得
    const online = navigator.onLine;

    if (online) {
        // オンライン時
        event.respondWith(
            caches.match(event.request).then(function (response) {
                // キャッシュが見つかった場合、キャッシュをそのままレスポンスとして返す
                if (response) {
                    return response;
                }
                return fetch(event.request).then(function (response) {
                    // 表示用のレスポンスを返す前に、キャッシュに保存をする
                    if (response) {
                        if (response.status === 200) {
                            caches.open(CACHE_NAME).then(function (cache) {
                                cache.put(event.request, response);
                            });
                        }
                        return response;
                    }
                }).catch(function (error) {
                    //デバッグ用
                    return console.log(error);
                });
            })
        );
    } else {
        // オフライン時
        event.respondWith(
            caches.match(event.request).then(function (response) {
                // キャッシュがあったのでそのレスポンスを返す
                if (response) {
                    return response;
                }
            })
        );
    }
});