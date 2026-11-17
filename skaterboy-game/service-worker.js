/* global self, caches, URL, fetch, Response */
const precache = JSON.parse("{\"version\":\"85fe55509b5d1574\",\"files\":[\"assets/basisTextureLoader-BbuzoU3N.js\",\"assets/color.fragment-D7kfboNM.js\",\"assets/color.fragment-QBiTowCo.js\",\"assets/color.vertex-CBah5deq.js\",\"assets/color.vertex-Cmg1zv0y.js\",\"assets/cubemapToSphericalPolynomial-DvwuLQkl.js\",\"assets/dds.pure-BksX-hQb.js\",\"assets/ddsTextureLoader-zHx1NBxF.js\",\"assets/envTextureLoader-D9jtK8mu.js\",\"assets/exrTextureLoader-Cu4itXcv.js\",\"assets/halfFloat-CXxwV7oo.js\",\"assets/hdrTextureLoader-BQVwkxK1.js\",\"assets/iesTextureLoader-CTrN2_9Y.js\",\"assets/index-BbioxPqu.js\",\"assets/index-G3ANKveG.css\",\"assets/ktxTextureLoader-BTSVuGWZ.js\",\"assets/logger-CuBYPcDK.js\",\"assets/mesh.vertexData.functions-CD4JOR2q.js\",\"assets/postprocess.vertex-Ca7ev3jH.js\",\"assets/postprocess.vertex-uVf30wiB.js\",\"assets/rgbdDecode.fragment-BWKZVHr5.js\",\"assets/rgbdDecode.fragment-_xwhTB3o.js\",\"assets/tgaTextureLoader-CqhhocF6.js\",\"icons/icon-192.png\",\"icons/icon-512.png\",\"index.html\",\"manifest.webmanifest\"]}");
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
