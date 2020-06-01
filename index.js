if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js', { scope: '/'})
        .then(function (reg) {
            console.log(`Service Worker Registered.\nscope: ${reg.scope}`);
        })
        .catch(function (error) {
            console.log(`Error: ${error}`);
        });
}