self.addEventListener('install', function () {
    self.skipWaiting();
    console.log('---------- SW installed! ----------');
});

self.addEventListener('activate', function (event) {
    event.waitUntil(self.clients.claim());
    console.log('---------- SW activated! ----------');
});

self.addEventListener('fetch', function (event) {
    const { request } = event;
    const url = new URL(request.url);

    // update webFlow min.css file
    if (url.href.includes('.webflow.') && url.href.includes('.min.css')) {
        console.log(`---------- SW handled .min.css -> ${url.href} ----------`);
        event.respondWith(
            fetch('/updatedHome.css')
        );
    } else {
        console.log(`---------- SW handled fetch -> ${url.href} ----------`);
        event.respondWith(
            fetch(event.request)
        );
    }
});