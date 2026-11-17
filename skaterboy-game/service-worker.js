/* global self, caches, URL, fetch, Response */
const precache = JSON.parse("{\"version\":\"1af56a7edb6aaea0\",\"files\":[\"assets/basisTextureLoader-B0-rHci2.js\",\"assets/color.fragment-BASK29KS.js\",\"assets/color.fragment-DTtXRYJR.js\",\"assets/color.vertex-D1dumDmP.js\",\"assets/color.vertex-K125KOPj.js\",\"assets/cubemapToSphericalPolynomial-CXLJ5h-q.js\",\"assets/dds.pure-va_C7n8U.js\",\"assets/ddsTextureLoader-DSaNNsLW.js\",\"assets/envTextureLoader-B0XLsXrn.js\",\"assets/exrTextureLoader-ClMLh42X.js\",\"assets/halfFloat-CXxwV7oo.js\",\"assets/hdrTextureLoader-BQVwkxK1.js\",\"assets/iesTextureLoader-DsMATjej.js\",\"assets/index-C5Uo3zM2.css\",\"assets/index-RYB5ejf2.js\",\"assets/ktxTextureLoader-BgHRqL_T.js\",\"assets/logger-CuBYPcDK.js\",\"assets/mesh.vertexData.functions-CD4JOR2q.js\",\"assets/postprocess.vertex-BhGf3UYd.js\",\"assets/postprocess.vertex-DznUJeaE.js\",\"assets/rgbdDecode.fragment-B5TxxB6N.js\",\"assets/rgbdDecode.fragment-DXt6QAwc.js\",\"assets/tgaTextureLoader-CqhhocF6.js\",\"icons/icon-192.png\",\"icons/icon-512.png\",\"index.html\",\"manifest.webmanifest\"]}");
const cachePrefix = `skaterboy-${encodeURIComponent(self.registration.scope)}-`;
const cacheName = `${cachePrefix}${precache.version}`;
const urls = precache.files.map(
  (file) => new URL(file, self.registration.scope).href,
);
const indexUrl = new URL("index.html", self.registration.scope).href;
const rootUrl = new URL("./", self.registration.scope).href;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith(cachePrefix) && key !== cacheName)
            .map((key) => caches.delete(key)),
        ),
      ),
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET") return;
  if (
    event.request.mode === "navigate" &&
    (url.href.split("?")[0] === rootUrl || url.href.split("?")[0] === indexUrl)
  ) {
    event.respondWith(
      fetch(event.request).catch(async () => {
        const cache = await caches.open(cacheName);
        return (await cache.match(indexUrl)) ?? Response.error();
      }),
    );
    return;
  }
  url.search = "";
  url.hash = "";
  if (!urls.includes(url.href)) return;
  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      return (await cache.match(url.href)) ?? fetch(event.request);
    }),
  );
});
