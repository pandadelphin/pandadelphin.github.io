/* global self, caches, URL, fetch, Response */
const precache = JSON.parse("{\"version\":\"4d051f44ace6909e\",\"files\":[\"assets/basisTextureLoader-1iHUEeXd.js\",\"assets/color.fragment-CQYRJpdF.js\",\"assets/color.fragment-xLSmsDXz.js\",\"assets/color.vertex-5e8YLJI_.js\",\"assets/color.vertex-DIp-Nm6t.js\",\"assets/cubemapToSphericalPolynomial-D28IFaGS.js\",\"assets/dds.pure-CnU_NlJe.js\",\"assets/ddsTextureLoader-WY9TsPWt.js\",\"assets/envTextureLoader-4WAIhTIc.js\",\"assets/exrTextureLoader-C3ytwtYs.js\",\"assets/halfFloat-CXxwV7oo.js\",\"assets/hdrTextureLoader-BQVwkxK1.js\",\"assets/iesTextureLoader-BQ7OMMeU.js\",\"assets/index-B0S_Jd7O.js\",\"assets/index-m0Zj9ad3.css\",\"assets/ktxTextureLoader-B6GHQS9Q.js\",\"assets/logger-CuBYPcDK.js\",\"assets/mesh.vertexData.functions-CD4JOR2q.js\",\"assets/postprocess.vertex-DUizVs7a.js\",\"assets/postprocess.vertex-I0MOxKif.js\",\"assets/rgbdDecode.fragment-2Y8o82Hl.js\",\"assets/rgbdDecode.fragment-Cl20c-YP.js\",\"assets/tgaTextureLoader-CqhhocF6.js\",\"icons/icon-192.png\",\"icons/icon-512.png\",\"index.html\",\"manifest.webmanifest\"]}");
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
