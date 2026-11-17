/* global self, caches, URL, fetch, Response */
const precache = JSON.parse("{\"version\":\"591a58e3336635d1\",\"files\":[\"assets/basisTextureLoader-DtD_xEXH.js\",\"assets/color.fragment-CZvDqXMp.js\",\"assets/color.fragment-qHUHCKI0.js\",\"assets/color.vertex-ChmqrXCJ.js\",\"assets/color.vertex-l0ME0Yp0.js\",\"assets/cubemapToSphericalPolynomial-uo86xJAG.js\",\"assets/dds.pure-C-ETeVRL.js\",\"assets/ddsTextureLoader-Cm8sX_5K.js\",\"assets/envTextureLoader-CVdAE4td.js\",\"assets/exrTextureLoader-CN32del5.js\",\"assets/halfFloat-CXxwV7oo.js\",\"assets/hdrTextureLoader-BQVwkxK1.js\",\"assets/iesTextureLoader-BON4tyTe.js\",\"assets/index--mv4kvgb.css\",\"assets/index-BkXAZoVj.js\",\"assets/ktxTextureLoader-IrOa53XY.js\",\"assets/logger-CuBYPcDK.js\",\"assets/mesh.vertexData.functions-CD4JOR2q.js\",\"assets/postprocess.vertex-BgiaWO4q.js\",\"assets/postprocess.vertex-OV2NVBCM.js\",\"assets/rgbdDecode.fragment-ByMzh-x8.js\",\"assets/rgbdDecode.fragment-CU7oDI-7.js\",\"assets/tgaTextureLoader-CqhhocF6.js\",\"icons/icon-192.png\",\"icons/icon-512.png\",\"index.html\",\"manifest.webmanifest\"]}");
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
