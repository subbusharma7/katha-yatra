const C='ky-v3';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','data.js','manifest.json','icons/icon-192.png'])))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{if(r.ok&&!r.redirected&&r.type==='basic'){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('push',e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={body:e.data&&e.data.text()}}
 e.waitUntil(self.registration.showNotification(d.title||'🌸 आज की नई कहानी खुल गई है',{body:d.body||'कथा यात्रा में आज की कहानी आपका इंतज़ार कर रही है।',icon:'icons/icon-192.png',badge:'icons/icon-192.png',tag:'daily',renotify:true,data:{url:d.url||'./'}}))});
self.addEventListener('notificationclick',e=>{e.notification.close();const u=new URL((e.notification.data&&e.notification.data.url)||'./',self.registration.scope).href;
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(ws=>{for(const w of ws){if(w.url.startsWith(self.registration.scope)&&'focus' in w)return w.focus()}return clients.openWindow(u)}))});
