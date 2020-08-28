// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "App.tsx";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

// Respond to a server push with a user notification.
self.addEventListener('push', function (event) {
	if (Notification.permission === "granted") {
			const notificationText = event.data.text();
			const showNotification = self.registration.showNotification('Sample PWA', {
					body: notificationText,
					icon: '/logo512.png'
			});
			// Ensure the toast notification is displayed before exiting the function.
			event.waitUntil(showNotification);
	}
});

// Respond to the user selecting the toast notification.
self.addEventListener('notificationclick', function (event) {
	console.log('On notification click: ', event.notification.tag);
	event.notification.close();
	
	// This looks to see if the current notification is already open and focuses it.
	event.waitUntil(clients.matchAll({
			type: 'window'
	}).then(function (clientList) {
			for (var i = 0; i < clientList.length; i++) {
					var client = clientList[i];
					if (client.url == 'http://localhost:1337/' && 'focus' in client)
							return client.focus();
			}
			if (clients.openWindow)
					return clients.openWindow('/');
	}));
});
