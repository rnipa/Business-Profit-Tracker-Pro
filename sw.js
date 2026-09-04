const CACHE='bpt-pro-pwa-v1';
const ASSETS=['./','./index.html','./manifest.json','./logo.svg','./favicon.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET') return;
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(res=>{
    const copy=res.clone(); caches.open(CACHE).then(c=>c.put(event.request,copy)); return res;
  }).catch(()=>caches.match('./index.html'))));
});
