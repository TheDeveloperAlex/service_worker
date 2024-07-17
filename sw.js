const staticCachekey = "static-cache-v1";
const dynamicCachekey = "dynamic-cache-v1";

const pages = ["index.html", "/pages/offline.html"];
const jsAssets = ["index.js", "/logic/productList.js"];
const cssAssets = [
  "/styles/index.css",
  "/styles/default.css",
  "/styles/productList.css",
];

const cacheKeysWhiteList = ["static-cache-v1", "dynamic-cache-v1"];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCachekey);
  await cache.addAll([...pages, ...cssAssets, ...jsAssets]);
});

self.addEventListener("activate", async (event) => {
  // TODO: remove old cache
  const cacheKeys = await caches.keys();
  await Promise.all(
    cacheKeys
      .filter((key) => !cacheKeysWhiteList.includees(key))
      .map((key) => caches.delete(key))
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (url.origin === location.origin) {
    console.log(url.href);
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached ?? (await fetch(request));
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCachekey);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (e) {
    const cached = cache.match(request);
    return cached ?? (await caches.match("/pages/offline.html"));
  }
}
