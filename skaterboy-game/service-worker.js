/* global self, caches, URL, fetch, Response */
const precache = JSON.parse("{\"version\":\"ce332a0c47e1677b\",\"files\":[\"assets/basisTextureLoader-ftwg5oqH.js\",\"assets/color.fragment-BC6GXJyF.js\",\"assets/color.fragment-D1lrMI51.js\",\"assets/color.vertex-DIGS1iz1.js\",\"assets/color.vertex-DP74I_zM.js\",\"assets/cubemapToSphericalPolynomial-BQRgwG9-.js\",\"assets/dds.pure-D2ki7PII.js\",\"assets/ddsTextureLoader-CfdiycmK.js\",\"assets/envTextureLoader-CVQECgm1.js\",\"assets/exrTextureLoader-BImQigJy.js\",\"assets/halfFloat-CXxwV7oo.js\",\"assets/hdrTextureLoader-BQVwkxK1.js\",\"assets/iesTextureLoader-Dg-PyYMK.js\",\"assets/index-6st5XEhP.css\",\"assets/index-Cwm7tip0.js\",\"assets/ktxTextureLoader-DDQU2axI.js\",\"assets/logger-CuBYPcDK.js\",\"assets/mesh.vertexData.functions-CD4JOR2q.js\",\"assets/postprocess.vertex-Cp-N8mph.js\",\"assets/postprocess.vertex-CuZPg2fd.js\",\"assets/rgbdDecode.fragment-BIX9mQBx.js\",\"assets/rgbdDecode.fragment-BoMyWHb6.js\",\"assets/tgaTextureLoader-CqhhocF6.js\",\"icons/icon-192.png\",\"icons/icon-512.png\",\"index.html\",\"manifest.webmanifest\"]}");
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
